import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactNotificationData {
  submissionId: number;
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
}

/**
 * Send email notification to admin when a contact form is submitted
 */
export async function sendContactNotification(data: ContactNotificationData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  // Use Resend's onboarding email for development/testing
  // For production, set FROM_EMAIL to your verified domain email
  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

  try {
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #a3e635 0%, #84cc16 100%);
                color: #0a1510;
                padding: 30px;
                border-radius: 8px 8px 0 0;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #ffffff;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
              .field {
                margin-bottom: 20px;
              }
              .field-label {
                font-weight: 600;
                color: #374151;
                margin-bottom: 5px;
              }
              .field-value {
                color: #1f2937;
                padding: 10px;
                background: #f9fafb;
                border-radius: 4px;
                word-wrap: break-word;
              }
              .message-box {
                background: #f9fafb;
                border-left: 4px solid #a3e635;
                padding: 15px;
                margin: 20px 0;
                white-space: pre-wrap;
              }
              .footer {
                background: #f3f4f6;
                padding: 20px;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
                border-radius: 0 0 8px 8px;
              }
              .metadata {
                font-size: 12px;
                color: #9ca3af;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📬 New Contact Form Submission</h1>
            </div>

            <div class="content">
              <div class="field">
                <div class="field-label">Name:</div>
                <div class="field-value">${escapeHtml(data.name)}</div>
              </div>

              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">
                  <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>
                </div>
              </div>

              <div class="field">
                <div class="field-label">Message:</div>
                <div class="message-box">${escapeHtml(data.message)}</div>
              </div>

              <div class="metadata">
                Submission ID: #${data.submissionId}<br>
                Submitted at: ${data.submittedAt.toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'long',
                })}
              </div>
            </div>

            <div class="footer">
              <p>This is an automated notification from your portfolio contact form.</p>
              <p>Reply directly to ${escapeHtml(data.email)} to respond to this inquiry.</p>
            </div>
          </body>
        </html>
      `,
      replyTo: data.email,
    });

    console.log('Email notification sent successfully for submission #' + data.submissionId);
  } catch (error) {
    console.error('Failed to send email notification:', error);
    // Don't throw error - we still want to save the submission even if email fails
  }
}

/**
 * Escape HTML to prevent XSS in emails
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
