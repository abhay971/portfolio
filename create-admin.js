// Script to create admin user
import { config } from 'dotenv';
import { Pool } from 'pg';
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

async function createAdmin() {
  try {
    console.log('Creating admin user...\n');

    // Insert admin user (password: admin123)
    const result = await pool.query(`
      INSERT INTO admin_users (username, password_hash, email)
      VALUES (
        'admin',
        '$2a$10$YpNw8fWqTnzS5GvYlDjVxO6EAE4lN5qKHJfKYqH9JXvZnPQxG7QFe',
        'abhayrana3169@gmail.com'
      )
      ON CONFLICT (username) DO UPDATE
      SET email = EXCLUDED.email
      RETURNING id, username, email;
    `);

    console.log('✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log('Username:', result.rows[0].username);
    console.log('Email:', result.rows[0].email);
    console.log('Password: admin123');
    console.log('-----------------------------------');
    console.log('\n🔐 IMPORTANT: Change the password after first login!\n');
    console.log('Access admin panel at: https://your-site.vercel.app/admin/login\n');

    await pool.end();
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    await pool.end();
    process.exit(1);
  }
}

createAdmin();
