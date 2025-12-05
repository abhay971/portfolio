# Backend Setup Guide for Portfolio Contact Form

This guide will help you set up the backend for your portfolio contact form with Vercel Postgres, Resend email notifications, and an admin panel.

## 🚀 Features

- ✅ Contact form submission with validation
- ✅ PostgreSQL database storage (Vercel Postgres)
- ✅ Email notifications via Resend
- ✅ Rate limiting (3 submissions per IP per hour)
- ✅ Admin panel to view and manage submissions
- ✅ JWT-based authentication
- ✅ TypeScript for type safety

## 📋 Prerequisites

- Vercel account
- Node.js 18+ installed
- Git repository connected to Vercel

## 🛠️ Setup Steps

### Step 1: Set Up Vercel Postgres Database

1. Go to your Vercel dashboard
2. Navigate to your project → **Storage** → **Create Database**
3. Select **Postgres** and create a new database
4. Copy the connection strings (you'll need these for `.env.local`)

### Step 2: Set Up Resend for Email Notifications

1. Go to [https://resend.com/](https://resend.com/)
2. Sign up for a free account
3. Navigate to **API Keys** and create a new API key
4. (Optional) Verify your domain for better deliverability
5. Copy the API key (you'll need this for `.env.local`)

### Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and fill in your actual values:
   ```bash
   # Vercel Postgres (from Step 1)
   POSTGRES_URL="your-postgres-url"
   POSTGRES_PRISMA_URL="your-postgres-prisma-url"
   POSTGRES_URL_NON_POOLING="your-postgres-non-pooling-url"

   # Resend (from Step 2)
   RESEND_API_KEY="re_your_api_key"
   ADMIN_EMAIL="your.email@example.com"
   FROM_EMAIL="Portfolio Contact <noreply@yourdomain.com>"

   # JWT Secret (generate a new one)
   JWT_SECRET="$(openssl rand -base64 32)"

   # Rate Limiting
   RATE_LIMIT_MAX_REQUESTS="3"
   RATE_LIMIT_WINDOW_MS="3600000"
   ```

3. Generate a secure JWT secret:
   ```bash
   openssl rand -base64 32
   ```

### Step 4: Set Up the Database

1. Connect to your Vercel Postgres database:
   ```bash
   psql "$POSTGRES_URL"
   ```

2. Run the schema file to create tables:
   ```bash
   psql "$POSTGRES_URL" -f db/schema.sql
   ```

3. (Optional) Generate a custom password hash for the admin user:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10));"
   ```

4. Update `db/seed.sql` with your custom password hash (if generated)

5. Seed the database with the initial admin user:
   ```bash
   psql "$POSTGRES_URL" -f db/seed.sql
   ```

### Step 5: Test Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Test the contact form:
   - Navigate to `http://localhost:5173#contact`
   - Fill out and submit the form
   - Check your admin email for the notification

3. Test the admin panel:
   - Navigate to `http://localhost:5173/admin/login`
   - Login with:
     - **Username**: `admin`
     - **Password**: `admin123` (or your custom password)
   - View the submissions

### Step 6: Add Admin Routes to Your App

Add the admin routes to your `App.jsx` or `main.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/admin/AdminPanel';
import AdminLogin from './components/admin/AdminLogin';

// In your routing setup:
<BrowserRouter>
  <Routes>
    <Route path="/" element={<YourMainApp />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminPanel />} />
  </Routes>
</BrowserRouter>
```

### Step 7: Deploy to Vercel

1. Set environment variables in Vercel Dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add all variables from `.env.local`
   - Make sure to set them for all environments (Production, Preview, Development)

2. Push your code to Git:
   ```bash
   git add .
   git commit -m "Add backend for contact form"
   git push
   ```

3. Vercel will automatically deploy your site

4. Verify the deployment:
   - Test the contact form on your live site
   - Check that email notifications are being sent
   - Log in to the admin panel and verify submissions are showing

## 🔒 Security Best Practices

### Change Default Password
After initial setup, **immediately change the default admin password**:
1. Log in to the admin panel
2. Go to your database and update the password hash:
   ```sql
   UPDATE admin_users
   SET password_hash = '$2a$10$YOUR_NEW_HASH_HERE'
   WHERE username = 'admin';
   ```

### Protect Production
For production, update `vercel.json` to restrict CORS:
```json
{
  "headers": [{
    "source": "/api/:path*",
    "headers": [{
      "key": "Access-Control-Allow-Origin",
      "value": "https://yourdomain.com"
    }]
  }]
}
```

### Rate Limiting
The current implementation uses in-memory rate limiting, which works for single instances. For production at scale, consider:
- Upstash Redis for distributed rate limiting
- Vercel Edge Config
- Database-based rate limiting with TTL

## 📊 Database Schema

### contact_submissions
| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| name | varchar(255) | Submitter name |
| email | varchar(320) | Submitter email |
| message | text | Contact message |
| submitted_at | timestamp | Submission time |
| is_read | boolean | Read status |
| is_archived | boolean | Archive status |
| ip_address | varchar(45) | Client IP (for rate limiting) |
| user_agent | text | Browser info |

### admin_users
| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| username | varchar(100) | Login username |
| password_hash | varchar(255) | bcrypt password hash |
| email | varchar(320) | Admin email |
| last_login | timestamp | Last login time |

## 🧪 Testing

### Test Contact Form Submission
```bash
curl -X POST http://localhost:5173/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Test Admin Login
```bash
curl -X POST http://localhost:5173/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### Test Get Submissions (with token)
```bash
curl http://localhost:5173/api/submissions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🐛 Troubleshooting

### Database Connection Error
- Verify your `POSTGRES_URL` is correct
- Check that your IP is whitelisted in Vercel (Vercel Postgres whitelists automatically)
- Ensure you're using the pooled connection string

### Email Not Sending
- Verify your `RESEND_API_KEY` is correct
- Check that your domain is verified in Resend
- Look at Vercel logs for error messages
- Test with a simple email first

### Admin Login Failing
- Verify the admin user exists in the database:
  ```sql
  SELECT * FROM admin_users;
  ```
- Make sure you're using the correct password
- Check browser console for errors

### Rate Limiting Too Strict
- Adjust `RATE_LIMIT_MAX_REQUESTS` and `RATE_LIMIT_WINDOW_MS` in `.env.local`
- Clear rate limit by restarting the dev server

## 📝 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/contact` | Submit contact form | No |
| POST | `/api/auth/login` | Admin login | No |
| GET | `/api/auth/verify` | Verify JWT token | Yes |
| GET | `/api/submissions` | List submissions | Yes |
| GET | `/api/submissions/:id` | Get submission by ID | Yes |
| PATCH | `/api/submissions/:id` | Update submission | Yes |

## 🎨 Customization

### Change Email Template
Edit `api/_lib/email.ts` to customize the email design sent to admins.

### Add More Fields to Contact Form
1. Update `db/schema.sql` to add new columns
2. Update `api/_lib/validation.ts` to add validation
3. Update `api/contact.ts` to handle new fields
4. Update frontend `Contact.jsx` to collect new data

### Add Multiple Admin Users
```sql
INSERT INTO admin_users (username, password_hash, email)
VALUES (
  'your_username',
  '$2a$10$YOUR_PASSWORD_HASH',
  'your_email@example.com'
);
```

## 📚 Additional Resources

- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Resend Documentation](https://resend.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [JWT Best Practices](https://jwt.io/introduction)

## 🚨 Important Notes

- **Never commit** `.env.local` to Git (it's in `.gitignore`)
- **Change the default admin password** immediately after setup
- **Rotate your JWT secret** periodically for security
- **Monitor** your Vercel Postgres usage to stay within limits
- **Set up alerts** in Vercel for function errors

## ✅ Post-Deployment Checklist

- [ ] Database tables created successfully
- [ ] Admin user seeded with custom password
- [ ] All environment variables set in Vercel
- [ ] Contact form submits successfully
- [ ] Email notifications are received
- [ ] Admin panel loads and displays submissions
- [ ] JWT authentication works
- [ ] Rate limiting is functional
- [ ] CORS is properly configured for production domain
- [ ] Default admin password has been changed

## 🎉 You're All Set!

Your portfolio now has a fully functional backend with:
- Contact form with database storage
- Email notifications
- Admin panel for managing submissions
- Secure authentication
- Rate limiting

For questions or issues, refer to the troubleshooting section above or check the Vercel logs for detailed error messages.
