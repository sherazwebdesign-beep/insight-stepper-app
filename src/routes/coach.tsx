import { createFileRoute } from '@tanstack/react-router';
import { StorySection, TrustStrip, ClosingSection } from '@/components/coaching-sections';
import { siteMeta } from '@/lib/site-meta';
export const Route = createFileRoute('/coach')({ head: () => siteMeta('The Coach — Lola Rey', 'Meet Lola Rey, an ICF accredited coach with 16+ years in major financial institutions and a deeply human approach to meaningful change.'), component: CoachPage });
function CoachPage() { return <><section className="page-intro"><div className="content-width"><span className="eyebrow">THE COACH</span><h1>The person behind LR<br/><em>A thinking partner. A space to be yourself.</em></h1><p>Corporate experience. Real-life understanding. A belief that the most meaningful change starts within.</p></div></section><StorySection full/><TrustStrip/><ClosingSection/></>; }
