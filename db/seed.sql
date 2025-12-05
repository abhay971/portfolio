-- Create initial admin user
-- Default Password: 'admin123' (CHANGE THIS IN PRODUCTION!)
-- Hash generated with bcrypt, rounds=10
-- To generate a new hash, run in Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = bcrypt.hashSync('your_password', 10);
-- console.log(hash);

INSERT INTO admin_users (username, password_hash, email)
VALUES (
  'admin',
  '$2a$10$YpNw8fWqTnzS5GvYlDjVxO6EAE4lN5qKHJfKYqH9JXvZnPQxG7QFe',
  'admin@example.com'
)
ON CONFLICT (username) DO NOTHING;

-- Note: This is the bcrypt hash for 'admin123'
-- Make sure to change the password after first login!
