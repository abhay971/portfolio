import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendContactNotification } from './_lib/email.js';

/**
 * Test endpoint to check if email sending works
 */
export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    console.log('Testing email with Resend...');
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('Admin Email:', process.env.ADMIN_EMAIL);
    console.log('From Email:', process.env.FROM_EMAIL || 'onboarding@resend.dev');

    await sendContactNotification({
      submissionId: 999,
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test email from the API test endpoint.',
      submittedAt: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully! Check your inbox.',
      config: {
        hasApiKey: !!process.env.RESEND_API_KEY,
        toEmail: process.env.ADMIN_EMAIL,
        fromEmail: process.env.FROM_EMAIL || 'onboarding@resend.dev'
      }
    });
  } catch (error) {
    console.error('Email test failed:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
