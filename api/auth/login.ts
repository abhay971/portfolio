import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { loginSchema } from '../_lib/validation.ts';
import { getAdminByUsername, updateAdminLastLogin } from '../_lib/db.ts';
import { comparePassword, generateToken } from '../_lib/auth.ts';

/**
 * Admin login endpoint
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body
    let validatedData;
    try {
      validatedData = loginSchema.parse(req.body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.issues.map((err: z.ZodIssue) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      throw error;
    }

    // Get admin user by username
    const admin = await getAdminByUsername(validatedData.username);

    if (!admin) {
      // User not found - use generic error message for security
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Username or password is incorrect',
      });
    }

    // Verify password
    const isPasswordValid = await comparePassword(
      validatedData.password,
      admin.passwordHash
    );

    if (!isPasswordValid) {
      // Password incorrect
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Username or password is incorrect',
      });
    }

    // Generate JWT token
    const token = generateToken(admin.id, admin.username);

    // Update last login timestamp
    await updateAdminLastLogin(admin.id);

    // Return success with token
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Login failed. Please try again later.',
    });
  }
}
