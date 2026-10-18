import { createFileRoute } from '@tanstack/react-router';
import { ClosingSection } from '@/components/coaching-sections';
import { siteMeta } from '@/lib/site-meta';
export const Route = createFileRoute('/testimonials')({ head: () => siteMeta('Insights & Testimonials', 'What clients can expect from transformational coaching with LR Transformational Coaching, and client stories.'), component: TestimonialsPage });
const outcomes = ['Gain clarity on what truly matters to you', 'Build greater confidence and self-trust', 'Overcome limiting beliefs', 'Make decisions with purpose and conviction', 'Develop healthier boundaries and habits', 'Create sustainable momentum towards your goals'];
function TestimonialsPage() { return <><section className="page-intro"><div className="content-width"><span className="eyebrow">INSIGHTS & TESTIMONIALS</span><h1>What you can expect.<br/><em>In your own words, soon.</em></h1><p>By the end of our work together, you may:</p><ul>{outcomes.map(o => <li key={o}><p>• {o}</p></li>)}</ul><p>Client testimonials are being gathered and will be shared here soon.</p></div></section><ClosingSection/></>; }
