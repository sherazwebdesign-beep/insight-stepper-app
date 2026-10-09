import { createContext, useContext, useState, type ReactNode, type FormEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight, ArrowLeft, Check, Menu, X, Leaf, Clock, Video, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { bookingSchema } from '@/lib/booking-schema';
import { submitBooking } from '@/lib/booking.functions';

const BookingContext = createContext<(topic?: string) => void>(() => {});
export const useBooking = () => useContext(BookingContext);
const topics = ['Career Crossroads', 'Executive Burnout', 'Identity & Confidence Shift', 'Something else'] as const;

export function Brand() {
  return <Link to="/" className="brand" aria-label="LR Transformational Coaching home"><span className="monogram">LR<span className="monogram-leaf"><Leaf size={17} strokeWidth={1} /></span></span><span className="brand-name">TRANSFORMATIONAL<span>COACHING</span></span></Link>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<string>(topics[0]);
  const [menu, setMenu] = useState(false);
  function book(selected?: string) { if (selected) setTopic(selected); setOpen(true); setMenu(false); }
  const links = [{ to: '/about', label: 'About' }, { to: '/transform-model', label: 'Transform Model™' }, { to: '/comparison', label: 'Comparison' }, { to: '/programme', label: 'Programme' }, { to: '/book-call', label: 'Book Call' }] as const;
  return <BookingContext.Provider value={book}>
    <header className="site-header"><div className="header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.to} to={link.to} activeProps={{ className: 'nav-active' }}>{link.label}</Link>)}</nav><Button className="header-cta" onClick={() => book()}>Book Discovery Call <ArrowRight /></Button><Button className="mobile-menu" size="icon" variant="ghost" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>{menu && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <Link key={link.to} to={link.to} onClick={() => setMenu(false)}>{link.label}<ArrowRight size={16}/></Link>)}<Button onClick={() => book()}>Book Discovery Call <ArrowRight /></Button></nav>}</header>
    <main>{children}</main>
    <footer className="site-footer"><div className="content-width footer-top"><Brand /><p>A clearer mind. A truer you.<br/>A life that feels like yours.</p><Button variant="outline" onClick={() => book()}>Let’s have a conversation <ArrowRight /></Button></div><div className="content-width footer-bottom"><span>© {new Date().getFullYear()} LR Transformational Coaching</span><span>Clarity. Alignment. Lasting change.</span><Link to="/book-call">Get in touch <ArrowRight size={13}/></Link></div></footer>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="booking-dialog"><BookingForm key={open ? 'open' : 'closed'} initialTopic={topic} onClose={() => setOpen(false)} /></DialogContent></Dialog>
  </BookingContext.Provider>;
}

function BookingForm({ initialTopic, onClose }: { initialTopic: string; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [topic, setTopic] = useState(initialTopic);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const save = useServerFn(submitBooking);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('');
    const form = new FormData(event.currentTarget);
    const parsed = bookingSchema.safeParse({ name: form.get('name'), email: form.get('email'), topic, preferred_date: date, preferred_time: time, timezone: 'Europe/London', message: form.get('message') || '', website: form.get('website') || '' });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message || 'Please check your details.'); return; }
    setBusy(true);
    try { const result = await save({ data: parsed.data }); if (result.success) setStep(3); else setError(result.error || 'Please try again.'); }
    catch { setError('We couldn’t save your request. Please try again.'); }
    finally { setBusy(false); }
  }
  if (step === 3) return <div className="booking-success"><span className="success-icon"><Check size={30}/></span><p className="eyebrow">YOUR NEXT CHAPTER</p><DialogTitle>You’ve taken the first step.</DialogTitle><DialogDescription>Your discovery-call request has been received. Your preferred time is {date} at {time} (UK time). Lucy will contact you to confirm availability.</DialogDescription><p className="text-sm text-muted-foreground">This is a request, not a confirmed appointment.</p><Button onClick={onClose}>Back to the journey <ArrowRight /></Button></div>;
  return <><div className="booking-heading"><span className="eyebrow">LET’S BEGIN, TOGETHER</span><DialogTitle>A little space for you.</DialogTitle><DialogDescription>A complimentary 30-minute conversation. No pressure. Just possibility.</DialogDescription><div className="booking-meta"><span><Clock size={14}/>30 minutes</span><span><Video size={14}/>Online call</span></div></div><div className="form-progress">{['Your focus', 'Your time', 'Your details'].map((label, i) => <span key={label} className={i <= step ? 'current' : ''}><b>{i < step ? <Check size={12}/> : i + 1}</b>{label}</span>)}</div>
    {step === 0 && <div className="form-stage"><h3>What’s on your mind?</h3><div className="topic-options">{topics.map(t => <Button key={t} variant="outline" aria-pressed={topic === t} className={topic === t ? 'selected' : ''} onClick={() => setTopic(t)}>{t}{topic === t && <Check />}</Button>)}</div><Button className="w-full" onClick={() => setStep(1)}>Find a time <ArrowRight /></Button></div>}
    {step === 1 && <div className="form-stage"><h3>When would suit you?</h3><label className="field-label">Preferred date<input type="date" required value={date} onChange={e => { setDate(e.target.value); setError(''); }} /></label><p className="field-hint">Preferred times · Europe/London (UK time)</p><div className="time-options">{['09:00', '12:00', '15:00', '18:00'].map(t => <Button key={t} variant="outline" className={time === t ? 'selected' : ''} aria-pressed={time === t} onClick={() => setTime(t)}>{t}</Button>)}</div><p className="field-hint">Availability will be confirmed personally.</p>{error && <p role="alert" className="form-error">{error}</p>}<div className="form-actions"><Button variant="ghost" onClick={() => setStep(0)}><ArrowLeft/>Back</Button><Button onClick={() => { const chosen = new Date(`${date}T12:00:00Z`); if (!date || !time || !Number.isFinite(chosen.getTime()) || chosen <= new Date() || chosen.getTime() > Date.now() + 90 * 86400000) { setError('Choose a future date within 90 days and a preferred time.'); return; } setError(''); setStep(2); }}>Continue <ArrowRight /></Button></div></div>}
    {step === 2 && <form className="form-stage" onSubmit={submit}><h3>Let’s get to know you.</h3><label className="field-label">Your name<input name="name" required maxLength={100} autoComplete="name" placeholder="Full name" /></label><label className="field-label">Email address<input name="email" type="email" required maxLength={255} autoComplete="email" placeholder="you@example.com" /></label><label className="field-label">Anything you’d like to share? <span>(optional)</span><textarea name="message" rows={3} maxLength={2000} placeholder="What would you love to feel clearer about?" /></label><div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div><p className="privacy-note"><ShieldCheck size={14}/>Your details stay private and are only used to arrange your call.</p>{error && <p role="alert" className="form-error">{error}</p>}<div className="form-actions"><Button type="button" variant="ghost" onClick={() => setStep(1)}><ArrowLeft/>Back</Button><Button type="submit" disabled={busy}>{busy ? 'Sending request…' : 'Request discovery call'}<ArrowRight /></Button></div></form>}
  </>;
}