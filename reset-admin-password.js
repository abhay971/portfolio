// Script to reset admin password with fresh hash
import { config } from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '.env.local') });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

async function resetPassword() {
  try {
    console.log('Generating fresh password hash...\n');

    // Generate a fresh hash for 'admin123'
    const password = 'admin123';
    const hash = await bcrypt.hash(password, 10);

    console.log('New hash generated:', hash);
    console.log('\nUpdating admin user...\n');

    // Update admin user with new hash
    const result = await pool.query(`
      UPDATE admin_users
      SET password_hash = $1
      WHERE username = 'admin'
      RETURNING id, username, email;
    `, [hash]);

    if (result.rows.length === 0) {
      console.log('❌ Admin user not found. Creating new one...\n');

      const createResult = await pool.query(`
        INSERT INTO admin_users (username, password_hash, email)
        VALUES ('admin', $1, 'abhayrana3169@gmail.com')
        RETURNING id, username, email;
      `, [hash]);

      console.log('✅ Admin user created successfully!');
      console.log('-----------------------------------');
      console.log('Username:', createResult.rows[0].username);
      console.log('Email:', createResult.rows[0].email);
      console.log('Password: admin123');
      console.log('-----------------------------------');
    } else {
      console.log('✅ Admin password reset successfully!');
      console.log('-----------------------------------');
      console.log('Username:', result.rows[0].username);
      console.log('Email:', result.rows[0].email);
      console.log('Password: admin123');
      console.log('-----------------------------------');
    }

    // Test the hash
    console.log('\n🔍 Testing password hash...');
    const isValid = await bcrypt.compare(password, hash);
    console.log('Hash validation:', isValid ? '✅ VALID' : '❌ INVALID');

    await pool.end();
  } catch (error) {
    console.error('❌ Error resetting password:', error);
    await pool.end();
    process.exit(1);
  }
}

resetPassword();
