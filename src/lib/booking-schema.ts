import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address.').max(255),
  topic: z.enum(['Career Crossroads', 'Executive Burnout', 'Identity & Confidence Shift', 'Something else']),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferred_time: z.enum(['09:00', '12:00', '15:00', '18:00']),
  timezone: z.literal('Europe/London'),
  message: z.string().trim().max(2000),
  website: z.string().max(0, 'Unable to submit this request.'),
});