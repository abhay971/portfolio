import { createClient } from '@vercel/postgres';

// Use createClient for Prisma Postgres connection strings
const client = createClient({
  connectionString: process.env.POSTGRES_URL,
});

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  ipAddress: string | null;
  userAgent: string | null;
  submittedAt: Date;
  isRead: boolean;
  isArchived: boolean;
  readAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
  createdAt: Date;
  lastLogin: Date | null;
}

/**
 * Insert a new contact submission
 */
export async function createContactSubmission(
  name: string,
  email: string,
  message: string,
  ipAddress?: string,
  userAgent?: string
): Promise<number> {
  const result = await client.sql`
    INSERT INTO contact_submissions (name, email, message, ip_address, user_agent)
    VALUES (${name}, ${email}, ${message}, ${ipAddress || null}, ${userAgent || null})
    RETURNING id
  `;

  return result.rows[0].id;
}

/**
 * Get admin user by username
 */
export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  const result = await client.sql<AdminUser>`
    SELECT id, username, password_hash as "passwordHash", email, created_at as "createdAt", last_login as "lastLogin"
    FROM admin_users
    WHERE username = ${username}
  `;

  return result.rows[0] || null;
}

/**
 * Update admin last login timestamp
 */
export async function updateAdminLastLogin(userId: number): Promise<void> {
  await client.sql`
    UPDATE admin_users
    SET last_login = CURRENT_TIMESTAMP
    WHERE id = ${userId}
  `;
}

/**
 * Get all contact submissions with pagination and filters
 */
export async function getContactSubmissions(options: {
  page?: number;
  limit?: number;
  isRead?: boolean;
  isArchived?: boolean;
  search?: string;
}): Promise<{ submissions: ContactSubmission[]; total: number }> {
  const page = options.page || 1;
  const limit = Math.min(options.limit || 20, 100); // Max 100 per page
  const offset = (page - 1) * limit;

  let whereConditions: string[] = [];
  let params: any[] = [];
  let paramIndex = 1;

  // Build WHERE clause
  if (options.isRead !== undefined) {
    whereConditions.push(`is_read = $${paramIndex}`);
    params.push(options.isRead);
    paramIndex++;
  }

  if (options.isArchived !== undefined) {
    whereConditions.push(`is_archived = $${paramIndex}`);
    params.push(options.isArchived);
    paramIndex++;
  }

  if (options.search) {
    whereConditions.push(`(name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR message ILIKE $${paramIndex})`);
    params.push(`%${options.search}%`);
    paramIndex++;
  }

  const whereClause = whereConditions.length > 0
    ? `WHERE ${whereConditions.join(' AND ')}`
    : '';

  // Get total count
  const countQuery = `SELECT COUNT(*) as count FROM contact_submissions ${whereClause}`;
  const countResult = await client.query(countQuery, params);
  const total = parseInt(countResult.rows[0].count);

  // Get submissions
  params.push(limit, offset);
  const query = `
    SELECT
      id,
      name,
      email,
      message,
      ip_address as "ipAddress",
      user_agent as "userAgent",
      submitted_at as "submittedAt",
      is_read as "isRead",
      is_archived as "isArchived",
      read_at as "readAt",
      notes,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM contact_submissions
    ${whereClause}
    ORDER BY submitted_at DESC
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `;

  const result = await client.query(query, params);

  return {
    submissions: result.rows as ContactSubmission[],
    total,
  };
}

/**
 * Get a single contact submission by ID
 */
export async function getContactSubmissionById(id: number): Promise<ContactSubmission | null> {
  const result = await client.sql<ContactSubmission>`
    SELECT
      id,
      name,
      email,
      message,
      ip_address as "ipAddress",
      user_agent as "userAgent",
      submitted_at as "submittedAt",
      is_read as "isRead",
      is_archived as "isArchived",
      read_at as "readAt",
      notes,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM contact_submissions
    WHERE id = ${id}
  `;

  return result.rows[0] || null;
}

/**
 * Update a contact submission
 */
export async function updateContactSubmission(
  id: number,
  updates: {
    isRead?: boolean;
    isArchived?: boolean;
    notes?: string;
  }
): Promise<ContactSubmission | null> {
  const setClauses: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (updates.isRead !== undefined) {
    setClauses.push(`is_read = $${paramIndex}`);
    params.push(updates.isRead);
    paramIndex++;

    if (updates.isRead) {
      setClauses.push(`read_at = CURRENT_TIMESTAMP`);
    }
  }

  if (updates.isArchived !== undefined) {
    setClauses.push(`is_archived = $${paramIndex}`);
    params.push(updates.isArchived);
    paramIndex++;
  }

  if (updates.notes !== undefined) {
    setClauses.push(`notes = $${paramIndex}`);
    params.push(updates.notes);
    paramIndex++;
  }

  if (setClauses.length === 0) {
    return getContactSubmissionById(id);
  }

  params.push(id);
  const query = `
    UPDATE contact_submissions
    SET ${setClauses.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING
      id,
      name,
      email,
      message,
      ip_address as "ipAddress",
      user_agent as "userAgent",
      submitted_at as "submittedAt",
      is_read as "isRead",
      is_archived as "isArchived",
      read_at as "readAt",
      notes,
      created_at as "createdAt",
      updated_at as "updatedAt"
  `;

  const result = await client.query(query, params);
  return result.rows[0] || null;
}
