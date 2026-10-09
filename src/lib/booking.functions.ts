import { createServerFn } from '@tanstack/react-start';
import { bookingSchema } from './booking-schema';

export const submitBooking = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const date = new Date(`${data.preferred_date}T12:00:00Z`);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    if (!Number.isFinite(date.getTime()) || date <= today || date.getTime() > today.getTime() + 90 * 86400000) {
      return { success: false, error: 'Please choose a future date within the next 90 days.' };
    }
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { website: _website, ...request } = data;
    const { error } = await supabaseAdmin.from('booking_requests').insert(request);
    if (error) return { success: false, error: error.message.includes('Too many') ? 'You’ve sent several requests. Please try again in an hour.' : 'Your request could not be saved. Please try again.' };
    return { success: true, error: null };
  });