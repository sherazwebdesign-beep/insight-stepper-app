import { createFileRoute } from "@tanstack/react-router";
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/components/site-shell';
import { TrustStrip, Introduction, LeadershipSection } from '@/components/coaching-sections';
import { siteMeta } from '@/lib/site-meta';
import landscape from '@/assets/stepping-stones.asset.json';
import { assetUrl } from '@/lib/asset-url';

export const Route = createFileRoute("/")({
  head: () => siteMeta('Where clarity drives transformation', 'Helping you navigate life transitions, overcome self-doubt, and create meaningful, lasting change with Lola Rey.'),
  component: Index,
});

// Order matters (client's numbering). `target` is the section the pill scrolls to.
const pains = [
  { label: 'Career Crossroads', target: 'lead' },
  { label: 'Personal Development', target: 'lead' },
  { label: 'Navigating Change', target: 'listen' },
  { label: 'Identity & Confidence Shift', target: 'listen' },
  { label: 'Finding Clarity and Direction', target: 'listen' },
] as const;

function Index() {
  const book = useBooking();
  const [topic, setTopic] = useState<string | undefined>();
  return <><section className="hero"><img src={assetUrl(landscape.url)} alt="Stepping stones leading across calm water toward the horizon" className="hero-image" width={1920} height={1024} fetchPriority="high"/><div className="content-width hero-content"><div className="reveal"><span className="eyebrow hero-eyebrow">LR TRANSFORMATIONAL COACHING · YOUR NEXT CHAPTER</span><h1>Where clarity drives<em>TRANSFORMATION</em></h1><p className="hero-description">Helping you navigate life transitions,<br className="hidden sm:block"/> overcome self-doubt, and create meaningful,<br className="hidden sm:block"/> lasting change.</p></div><div className="reveal reveal-delay"><div className="pain-selectors" aria-label="What brings you here?">{pains.map(({ label, target }) => <Button key={label} variant="outline" className={topic === label ? 'selected' : ''} aria-pressed={topic === label} onClick={() => { setTopic(label); window.history.replaceState(null, '', `#${target}`); document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }); }}>{topic === label && <Check/>}{label}</Button>)}</div><div className="hero-actions"><Button onClick={() => book(topic)}>Book 30-Min Discovery Call <ArrowRight/></Button><Link to="/transform-model" className="text-link">Explore the journey <ArrowUpRight size={16}/></Link></div><span className="hero-note"><ShieldCheck size={12}/>Complimentary. Confidential. A conversation, not a commitment.</span></div></div><a href="#listen" className="hero-bottom" aria-label="Scroll to the next section"><span>SPACE TO PAUSE. ROOM TO GROW.</span><span><ArrowDown size={14}/></span></a></section><TrustStrip/><Introduction/><LeadershipSection/></>;
}
