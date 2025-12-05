import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { authMiddleware, type AuthRequest } from '../_lib/auth';
import { getContactSubmissionById, updateContactSubmission } from '../_lib/db';
import { updateSubmissionSchema } from '../_lib/validation';

/**
 * Get or update a specific contact submission - Admin only
 */
async function handler(
  req: AuthRequest,
  res: VercelResponse
) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  // Extract ID from URL
  const id = parseInt(req.query.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid submission ID' });
  }

  try {
    // Handle GET request
    if (req.method === 'GET') {
      const submission = await getContactSubmissionById(id);

      if (!submission) {
        return res.status(404).json({
          error: 'Not found',
          message: 'Submission not found',
        });
      }

      return res.status(200).json({
        success: true,
        submission,
      });
    }

    // Handle PATCH request
    if (req.method === 'PATCH') {
      // Validate request body
      let validatedData;
      try {
        validatedData = updateSubmissionSchema.parse(req.body);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({
            error: 'Validation failed',
            details: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          });
        }
        throw error;
      }

      // Update submission
      const updatedSubmission = await updateContactSubmission(id, validatedData);

      if (!updatedSubmission) {
        return res.status(404).json({
          error: 'Not found',
          message: 'Submission not found',
        });
      }

      return res.status(200).json({
        success: true,
        submission: updatedSubmission,
      });
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Submission operation error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process submission',
    });
  }
}

// Export with auth middleware
export default authMiddleware(handler);
