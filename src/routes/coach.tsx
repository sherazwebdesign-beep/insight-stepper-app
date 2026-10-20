import { createFileRoute } from '@tanstack/react-router';
import { StorySection, TrustStrip, ClosingSection } from '@/components/coaching-sections';
import { siteMeta } from '@/lib/site-meta';
export const Route = createFileRoute('/coach')({ head: () => siteMeta('The Coach — Lola Rey', 'Meet Lola Rey, an ICF accredited coach with 16+ years in major financial institutions and a deeply human approach to meaningful change.'), component: CoachPage });
function CoachPage() { return <><section className="page-intro"><div className="content-width"><span className="eyebrow">THE COACH</span><h1>The person behind LR.<br/><em>Transformational Coaching</em></h1><p className="coach-lede">A thinking partner who creates a space to be yourself</p><p>Real-life understanding. Corporate experience. A belief that the most meaningful change starts within.</p></div></section><StorySection/><TrustStrip/><ClosingSection/></>; }
