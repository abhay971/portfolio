import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    return res.status(200).json({
      success: true,
      message: 'API is working!',
      env: {
        hasPostgres: !!process.env.POSTGRES_URL,
        hasResend: !!process.env.RESEND_API_KEY,
        hasJWT: !!process.env.JWT_SECRET,
        hasAdminEmail: !!process.env.ADMIN_EMAIL,
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
