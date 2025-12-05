import type { VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { authMiddleware, type AuthRequest } from '../_lib/auth.ts';
import { getContactSubmissionById, updateContactSubmission } from '../_lib/db.ts';
import { updateSubmissionSchema } from '../_lib/validation.ts';

/**
 * Get or update a specific contact submission - Admin only
 */
async function handler(
  req: AuthRequest,
  res: VercelResponse
): Promise<void> {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
    return;
  }

  // Extract ID from URL
  const id = parseInt(req.query.id as string);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid submission ID' });
    return;
  }

  try {
    // Handle GET request
    if (req.method === 'GET') {
      const submission = await getContactSubmissionById(id);

      if (!submission) {
        res.status(404).json({
          error: 'Not found',
          message: 'Submission not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        submission,
      });
      return;
    }

    // Handle PATCH request
    if (req.method === 'PATCH') {
      // Validate request body
      let validatedData;
      try {
        validatedData = updateSubmissionSchema.parse(req.body);
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({
            error: 'Validation failed',
            details: error.issues.map((err: z.ZodIssue) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          });
          return;
        }
        throw error;
      }

      // Update submission
      const updatedSubmission = await updateContactSubmission(id, validatedData);

      if (!updatedSubmission) {
        res.status(404).json({
          error: 'Not found',
          message: 'Submission not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        submission: updatedSubmission,
      });
      return;
    }

    // Method not allowed
    res.status(405).json({ error: 'Method not allowed' });
    return;

  } catch (error) {
    console.error('Submission operation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process submission',
    });
  }
}

// Export with auth middleware
export default authMiddleware(handler);
