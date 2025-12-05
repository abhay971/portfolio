import { z } from 'zod';

// Contact form submission schema
export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .max(320, 'Email must be less than 320 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
});

// Admin login schema
export const loginSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(100, 'Username must be less than 100 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters'),
});

// Update submission schema
export const updateSubmissionSchema = z.object({
  isRead: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  notes: z.string().max(1000).optional(),
});

// Type exports
export type ContactFormData = z.infer<typeof contactSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type UpdateSubmissionData = z.infer<typeof updateSubmissionSchema>;
