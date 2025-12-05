// Simple test script to debug the contact API locally
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '.env.local') });

console.log('Environment check:');
console.log('- POSTGRES_URL:', !!process.env.POSTGRES_URL);
console.log('- RESEND_API_KEY:', !!process.env.RESEND_API_KEY);
console.log('- ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
console.log('- JWT_SECRET:', !!process.env.JWT_SECRET);
console.log('');

// Mock request and response objects
const mockReq = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'user-agent': 'Test Script',
  },
  body: {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message from local testing.',
  },
  socket: {
    remoteAddress: '127.0.0.1',
  },
};

const mockRes = {
  statusCode: 200,
  headers: {},
  body: null,

  setHeader(key, value) {
    this.headers[key] = value;
    return this;
  },

  status(code) {
    this.statusCode = code;
    return this;
  },

  json(data) {
    this.body = data;
    console.log(`\nResponse [${this.statusCode}]:`, JSON.stringify(data, null, 2));
    return this;
  },

  end() {
    console.log('\nResponse ended');
    return this;
  },
};

async function testContactEndpoint() {
  try {
    console.log('Testing contact endpoint...\n');

    // Import the handler
    const { default: handler } = await import('./api/contact.ts');

    // Call the handler
    await handler(mockReq, mockRes);

    console.log('\n✅ Test completed successfully!');
  } catch (error) {
    console.error('\n❌ Test failed with error:');
    console.error(error);

    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
  }
}

testContactEndpoint();
