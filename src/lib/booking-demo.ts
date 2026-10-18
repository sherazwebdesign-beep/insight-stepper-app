// Demo-only data for the Wix-style booking flow. Nothing here talks to a server: the real
// booking, availability and payments will be provided by Wix Bookings on the live site.

export type ServiceId = 'discovery' | 'programme';

export type Service = {
  id: ServiceId;
  name: string;
  summary: string;
  duration: string;
  minutes: number;
  format: string;
  price: number;
  priceLabel: string;
};

export const services: Record<ServiceId, Service> = {
  discovery: {
    id: 'discovery',
    name: '30-Minute Discovery Call',
    summary: 'A complimentary, confidential conversation to share what’s on your mind and see whether coaching feels right.',
    duration: '30 min',
    minutes: 30,
    format: 'Online · one-to-one',
    price: 0,
    priceLabel: 'Free',
  },
  programme: {
    id: 'programme',
    name: 'Six-Month Transformational Coaching Journey',
    summary: '6 × 60-minute one-to-one sessions, monthly, with ongoing accountability and support between sessions.',
    duration: '6 × 60 min',
    minutes: 60,
    format: 'Online · one-to-one',
    price: 540,
    priceLabel: '£540',
  },
};

export const serviceList: Service[] = [services.discovery, services.programme];

export const topics = ['Career Crossroads', 'Executive Burnout', 'Identity & Confidence Shift', 'Something else'] as const;

export const BOOKING_WINDOW_DAYS = 90;

function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/** Wix-style availability: weekdays only, from tomorrow, up to 90 days ahead. */
export function isDateUnavailable(date: Date): boolean {
  const today = startOfToday();
  const last = new Date(today);
  last.setDate(last.getDate() + BOOKING_WINDOW_DAYS);
  const day = date.getDay();
  return date <= today || date > last || day === 0 || day === 6;
}

/** A believable, repeatable set of open slots for a date (some are "already booked"). */
export function slotsFor(date: Date, service: ServiceId): string[] {
  if (isDateUnavailable(date)) return [];
  const base = service === 'programme'
    ? ['09:00', '11:00', '13:00', '15:00', '17:00']
    : ['09:00', '09:30', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00'];
  const seed = date.getDate() + date.getMonth() * 31;
  return base.filter((_, index) => (seed + index * 3) % 4 !== 0);
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function makeReference(): string {
  return `LR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
