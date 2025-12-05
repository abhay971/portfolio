import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { contactSchema } from './_lib/validation.js';
import { createContactSubmission } from './_lib/db.js';
import { sendContactNotification } from './_lib/email.js';
import { getClientIp } from './_lib/auth.js';

// Simple in-memory rate limiting (works for single instance, use Redis for production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '3');
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000'); // 1 hour

/**
 * Check if client has exceeded rate limit
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // No record or window expired, create new
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false; // Rate limit exceeded
  }

  // Increment count
  record.count++;
  return true;
}

/**
 * Contact form submission endpoint
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
    // Get client IP for rate limiting
    const clientIp = getClientIp(req);

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        error: 'Too many requests',
        message: 'You have exceeded the maximum number of submissions. Please try again later.',
      });
    }

    // Validate request body
    let validatedData;
    try {
      validatedData = contactSchema.parse(req.body);
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

    // Insert into database
    const userAgent = req.headers['user-agent'] || undefined;
    const submissionId = await createContactSubmission(
      validatedData.name,
      validatedData.email,
      validatedData.message,
      clientIp,
      userAgent
    );

    // Send email notification (async, don't wait)
    sendContactNotification({
      submissionId,
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      submittedAt: new Date(),
    }).catch(error => {
      console.error('Email notification failed:', error);
    });

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      submissionId,
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error,
    });
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to submit your message. Please try again later.',
      debug: process.env.NODE_ENV === 'development' ? {
        error: error instanceof Error ? error.message : String(error),
      } : undefined,
    });
  }
}
