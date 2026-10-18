import { createFileRoute } from '@tanstack/react-router';
import { Quote } from 'lucide-react';
import { ClosingSection } from '@/components/coaching-sections';
import { siteMeta } from '@/lib/site-meta';
export const Route = createFileRoute('/testimonials')({ head: () => siteMeta('Insights & Testimonials', 'What clients can expect from transformational coaching with LR Transformational Coaching, and client stories.'), component: TestimonialsPage });
const outcomes = ['Gain clarity on what truly matters to you', 'Build greater confidence and self-trust', 'Overcome limiting beliefs', 'Make decisions with purpose and conviction', 'Develop healthier boundaries and habits', 'Create sustainable momentum towards your goals'];
function TestimonialsPage() {
  return <>
    <section className="page-intro"><div className="content-width"><span className="eyebrow">INSIGHTS & TESTIMONIALS</span><h1>What you can expect.<br/><em>In your own words, soon.</em></h1><p>By the end of our work together, you may:</p></div></section>
    <section className="section content-width"><div className="expect-grid">{outcomes.map((outcome, i) => <article key={outcome} className="expect-card"><span>0{i + 1}</span><p>{outcome}</p></article>)}</div></section>
    <section className="section content-width"><div className="testimonial-placeholder"><Quote size={30} strokeWidth={1.1}/><h2>Client stories</h2><p>Client testimonials are being gathered and will be shared here soon.</p></div></section>
    <ClosingSection/>
  </>;
}
