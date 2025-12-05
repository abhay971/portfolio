import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authMiddleware, type AuthRequest } from '../_lib/auth';
import { getContactSubmissions } from '../_lib/db';

/**
 * Get all contact submissions (paginated) - Admin only
 */
async function handler(
  req: AuthRequest,
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
    // Parse query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string | undefined;

    // Parse boolean filters
    let isRead: boolean | undefined;
    if (req.query.isRead === 'true') isRead = true;
    if (req.query.isRead === 'false') isRead = false;

    let isArchived: boolean | undefined;
    if (req.query.isArchived === 'true') isArchived = true;
    if (req.query.isArchived === 'false') isArchived = false;

    // Get submissions from database
    const { submissions, total } = await getContactSubmissions({
      page,
      limit,
      isRead,
      isArchived,
      search,
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });

  } catch (error) {
    console.error('Get submissions error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch submissions',
    });
  }
}

// Export with auth middleware
export default authMiddleware(handler);
