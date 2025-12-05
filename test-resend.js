// Test Resend API directly
import { config } from 'dotenv';
import { Resend } from 'resend';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '.env.local') });

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  try {
    console.log('Testing Resend API...\n');
    console.log('API Key:', process.env.RESEND_API_KEY ? '✅ Set' : '❌ Missing');
    console.log('Admin Email:', process.env.ADMIN_EMAIL);
    console.log('From Email:', process.env.FROM_EMAIL || 'onboarding@resend.dev');
    console.log('\nSending test email...\n');

    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL || 'abhayrana3169@gmail.com',
      subject: 'Test Email from Portfolio Contact Form',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify Resend is working correctly.</p>
        <p>If you received this, your email notifications are working!</p>
      `,
    });

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', result.data?.id);
    console.log('\nCheck your inbox:', process.env.ADMIN_EMAIL);
    console.log('\n⚠️  Note: Check spam folder if you don\'t see it in inbox!');
  } catch (error) {
    console.error('❌ Email failed:');
    console.error('Error:', error.message);
    console.error('\nFull error:', error);

    if (error.message.includes('API key')) {
      console.log('\n💡 Solution: Check your RESEND_API_KEY in Vercel environment variables');
    }
    if (error.message.includes('validation')) {
      console.log('\n💡 Solution: Check the FROM_EMAIL format - it should be "Name <email@domain>"');
    }
  }
}

testEmail();
