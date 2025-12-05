import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyToken } from '../_lib/auth';
import { getAdminByUsername } from '../_lib/db';

/**
 * Verify JWT token endpoint
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        valid: false,
        error: 'No token provided',
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const payload = verifyToken(token);

    if (!payload) {
      return res.status(401).json({
        valid: false,
        error: 'Invalid or expired token',
      });
    }

    // Optionally verify user still exists in database
    const admin = await getAdminByUsername(payload.username);
    if (!admin) {
      return res.status(401).json({
        valid: false,
        error: 'User not found',
      });
    }

    // Return user data
    return res.status(200).json({
      valid: true,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).json({
      valid: false,
      error: 'Internal server error',
    });
  }
}
