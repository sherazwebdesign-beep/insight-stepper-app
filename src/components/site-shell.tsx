import { createContext, useContext, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowLeft, Check, Menu, X, Clock, Video, ShieldCheck, Lock, CreditCard, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { formatLongDate, isDateUnavailable, makeReference, serviceList, services, slotsFor, topics, type ServiceId } from '@/lib/booking-demo';

/** `book('Career Crossroads')` preselects a focus; `book({ service: 'programme' })` opens the six-month journey. */
export type BookArg = string | { topic?: string; service?: ServiceId };

const BookingContext = createContext<(arg?: BookArg) => void>(() => {});
export const useBooking = () => useContext(BookingContext);

export function Brand() {
  return <Link to="/" className="brand" aria-label="LR Transformational Coaching home"><img className="brand-logo" src="/brand/lr-logo.png" alt="LR Transformational Coaching" width={976} height={485}/></Link>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);
  const [topic, setTopic] = useState<string>(topics[0]);
  const [service, setService] = useState<ServiceId>('discovery');
  const [menu, setMenu] = useState(false);
  function book(arg?: BookArg) {
    const options = typeof arg === 'string' ? { topic: arg } : (arg ?? {});
    setTopic(options.topic ?? topics[0]);
    setService(options.service ?? 'discovery');
    setSession(value => value + 1);
    setOpen(true);
    setMenu(false);
  }
  const links = [{ to: '/', label: 'About' }, { to: '/transform-model', label: 'Transform Model™' }, { to: '/coach', label: 'The Coach' }, { to: '/programme', label: 'The Program' }, { to: '/testimonials', label: 'Insights & Testimonials' }] as const;
  return <BookingContext.Provider value={book}>
    <header className="site-header"><div className="header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.to} to={link.to} activeOptions={{ exact: true }} activeProps={{ className: 'nav-active' }}>{link.label}</Link>)}</nav><Button className="header-cta" onClick={() => book()}>Book Discovery Call <ArrowRight /></Button><Button className="mobile-menu" size="icon" variant="ghost" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>{menu && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <Link key={link.to} to={link.to} activeOptions={{ exact: true }} activeProps={{ className: 'nav-active' }} onClick={() => setMenu(false)}>{link.label}<ArrowRight size={16}/></Link>)}<Button onClick={() => book()}>Book Discovery Call <ArrowRight /></Button></nav>}</header>
    <main>{children}</main>
    <footer className="site-footer"><div className="content-width footer-top"><Brand /><p>A clearer mind. A truer you.<br/>A life that feels like yours.</p><Button variant="outline" onClick={() => book()}>Let’s have a conversation <ArrowRight /></Button></div><div className="content-width footer-bottom"><span>© {new Date().getFullYear()} LR Transformational Coaching</span><span>Clarity. Alignment. Lasting change.</span><Link to="/book-call">Get in touch <ArrowRight size={13}/></Link></div></footer>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="booking-dialog booking-wide"><BookingFlow key={session} initialService={service} initialTopic={topic} onClose={() => setOpen(false)} /></DialogContent></Dialog>
  </BookingContext.Provider>;
}

type StepKey = 'service' | 'time' | 'details' | 'payment' | 'confirmed';
const stepLabels: Record<StepKey, string> = { service: 'Service', time: 'Date & time', details: 'Your details', payment: 'Payment', confirmed: 'Confirmation' };
const stepTitles: Record<StepKey, string> = { service: 'Choose your session', time: 'Select a date & time', details: 'Tell us about you', payment: 'Secure checkout', confirmed: 'Your booking is confirmed' };

/**
 * Demo of the Wix Bookings flow: service → date & time → details → payment (paid services) → confirmation.
 * Nothing is sent or stored. The live site will use Wix Bookings and Wix Payments for the real thing.
 */
function BookingFlow({ initialService, initialTopic, onClose }: { initialService: ServiceId; initialTopic: string; onClose: () => void }) {
  const [serviceId, setServiceId] = useState<ServiceId>(initialService);
  const [index, setIndex] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [topic, setTopic] = useState(initialTopic);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [plan, setPlan] = useState<'full' | 'monthly'>('full');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState('');

  const service = services[serviceId];
  const paid = service.price > 0;
  const keys: StepKey[] = paid ? ['service', 'time', 'details', 'payment', 'confirmed'] : ['service', 'time', 'details', 'confirmed'];
  const key: StepKey = keys[index] ?? 'service';
  const slots = date ? slotsFor(date, serviceId) : [];
  // Pay-monthly is offered for the six-month journey only; the additional session is a single payment.
  const hasPlan = serviceId === 'programme';
  const monthly = hasPlan && plan === 'monthly';
  const payToday = monthly ? `£${service.price / 6}` : `£${service.price}`;

  function go(next: number) { setError(''); setIndex(Math.max(0, Math.min(keys.length - 1, next))); }
  function finish() {
    setBusy(true);
    window.setTimeout(() => { setReference(makeReference()); setBusy(false); setIndex(keys.length - 1); setError(''); }, paid ? 1400 : 700);
  }
  function chooseService(id: ServiceId) { setServiceId(id); setTime(''); setIndex(1); setError(''); }
  function continueFromTime() {
    if (!date || !time) { setError('Please choose a date and a time to continue.'); return; }
    go(2);
  }
  function continueFromDetails() {
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Please enter a valid email address.'); return; }
    if (paid) { go(3); return; }
    finish();
  }

  return <>
    <div className="booking-heading"><span className="eyebrow">{key === 'confirmed' ? 'YOUR NEXT CHAPTER' : 'LET’S BEGIN, TOGETHER'}</span><DialogTitle>{stepTitles[key]}</DialogTitle><DialogDescription>{key === 'confirmed' ? 'Thank you — a confirmation email would be sent to you now.' : 'A preview of the online booking experience.'}</DialogDescription></div>
    {key !== 'confirmed' && <div className="form-progress" style={{ gridTemplateColumns: `repeat(${keys.length - 1}, 1fr)` }}>{keys.slice(0, -1).map((k, i) => <span key={k} className={i <= index ? 'current' : ''}><b>{i < index ? <Check size={12}/> : i + 1}</b>{stepLabels[k]}</span>)}</div>}
    {key !== 'service' && key !== 'confirmed' && <div className="booking-summary"><div><strong>{service.name}</strong><span><Clock size={13}/>{service.duration}<Video size={13}/>{service.format}</span></div><b>{service.priceLabel}</b></div>}

    {key === 'service' && <div className="form-stage"><div className="service-list">{serviceList.map(item => <article key={item.id} className={`service-card ${serviceId === item.id ? 'selected' : ''}`}><div><h3>{item.name}</h3><p>{item.summary}</p><span className="service-meta"><Clock size={13}/>{item.duration}<Video size={13}/>{item.format}</span></div><div className="service-side"><b>{item.priceLabel}</b><Button onClick={() => chooseService(item.id)}>{item.price > 0 ? 'Book now' : 'Book a call'}<ArrowRight/></Button></div></article>)}</div></div>}

    {key === 'time' && <div className="form-stage"><div className="time-layout"><div className="calendar-wrap"><Calendar mode="single" weekStartsOn={1} selected={date} onSelect={next => { setDate(next); setTime(''); setError(''); }} disabled={isDateUnavailable} className="booking-calendar [--cell-size:2.4rem]" /></div><div className="slot-column"><p className="slot-date"><CalendarDays size={15}/>{date ? formatLongDate(date) : 'Choose a date to see times'}</p>{date && slots.length === 0 && <p className="field-hint">No availability on this date. Please choose another day.</p>}<div className="slot-list">{slots.map(slot => <Button key={slot} variant="outline" className={time === slot ? 'selected' : ''} aria-pressed={time === slot} onClick={() => { setTime(slot); setError(''); }}>{slot}</Button>)}</div><p className="field-hint">Times shown in UK time (Europe/London). Availability shown is for demonstration.</p></div></div>{error && <p role="alert" className="form-error">{error}</p>}<div className="form-actions"><Button variant="ghost" onClick={() => go(0)}><ArrowLeft/>Back</Button><Button onClick={continueFromTime}>Continue <ArrowRight/></Button></div></div>}

    {key === 'details' && <div className="form-stage"><div className="booking-chosen"><CalendarDays size={15}/>{date ? `${formatLongDate(date)} at ${time} (UK time)` : ''}</div><p className="field-label-title">What’s on your mind?</p><div className="topic-chips">{topics.map(t => <Button key={t} type="button" variant="outline" aria-pressed={topic === t} className={topic === t ? 'selected' : ''} onClick={() => setTopic(t)}>{t}{topic === t && <Check/>}</Button>)}</div><label className="field-label">Full name<input value={name} onChange={e => setName(e.target.value)} required maxLength={100} autoComplete="name" placeholder="Full name" /></label><div className="field-row"><label className="field-label">Email address<input value={email} onChange={e => setEmail(e.target.value)} type="email" required maxLength={255} autoComplete="email" placeholder="you@example.com" /></label><label className="field-label">Phone <span>(optional)</span><input value={phone} onChange={e => setPhone(e.target.value)} type="tel" maxLength={30} autoComplete="tel" placeholder="+44 …" /></label></div><label className="field-label">Anything you’d like to share? <span>(optional)</span><textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} maxLength={2000} placeholder="What would you love to feel clearer about?" /></label><p className="privacy-note"><ShieldCheck size={14}/>Demo only: nothing you type here is sent or stored.</p>{error && <p role="alert" className="form-error">{error}</p>}<div className="form-actions"><Button variant="ghost" onClick={() => go(1)}><ArrowLeft/>Back</Button><Button disabled={busy} onClick={continueFromDetails}>{busy ? 'Confirming…' : paid ? 'Continue to payment' : 'Confirm booking'}<ArrowRight/></Button></div></div>}

    {key === 'payment' && <div className="form-stage"><div className="demo-banner"><Lock size={14}/>Demo checkout. No payment is taken and no card details are collected, stored or sent.</div>{hasPlan && <><p className="field-label-title">Payment option</p><div className="plan-options"><Button type="button" variant="outline" className={plan === 'full' ? 'selected' : ''} aria-pressed={plan === 'full'} onClick={() => setPlan('full')}><span>Pay in full</span><b>£{service.price}</b></Button><Button type="button" variant="outline" className={plan === 'monthly' ? 'selected' : ''} aria-pressed={plan === 'monthly'} onClick={() => setPlan('monthly')}><span>Pay monthly · 6 × £{service.price / 6}</span><b>£{service.price / 6} today</b></Button></div></>}<p className="field-label-title">Pay with</p><div className="pay-method"><CreditCard size={16}/>Credit or debit card</div><div className="field-row"><label className="field-label">Card number<input inputMode="numeric" autoComplete="off" maxLength={19} placeholder="1234 1234 1234 1234" /></label><label className="field-label">Name on card<input autoComplete="off" maxLength={100} placeholder="Full name" /></label></div><div className="field-row"><label className="field-label">Expiry<input autoComplete="off" maxLength={5} placeholder="MM/YY" /></label><label className="field-label">Security code<input inputMode="numeric" autoComplete="off" maxLength={4} placeholder="CVC" /></label></div><div className="order-summary"><span>{service.name}</span><span>{monthly ? `6 × £${service.price / 6}` : `£${service.price}`}</span><strong>Total due today</strong><strong>{payToday}</strong></div>{error && <p role="alert" className="form-error">{error}</p>}<div className="form-actions"><Button variant="ghost" onClick={() => go(2)}><ArrowLeft/>Back</Button><Button disabled={busy} onClick={finish}>{busy ? 'Processing…' : `Pay ${payToday}`}<Lock/></Button></div></div>}

    {key === 'confirmed' && <div className="booking-success"><span className="success-icon"><Check size={30}/></span><p className="text-sm text-muted-foreground">Booking reference <b>{reference}</b></p><div className="confirm-card"><strong>{service.name}</strong><span><CalendarDays size={14}/>{date ? `${formatLongDate(date)} at ${time} (UK time)` : ''}</span><span><Video size={14}/>{service.format} · {service.duration}. A video link would be emailed to {email.trim() || 'you'}.</span><span><Check size={14}/>{paid ? `Paid today: ${payToday}${monthly ? ' (then monthly)' : ''}` : 'Complimentary · no payment needed'}</span></div><p className="text-sm text-muted-foreground">This is a demonstration of the booking flow. No booking has been made.</p><Button onClick={onClose}>Back to the website <ArrowRight /></Button></div>}
  </>;
}
