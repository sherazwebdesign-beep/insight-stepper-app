import { createFileRoute } from "@tanstack/react-router";
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/components/site-shell';
import { TrustStrip, Introduction, LeadershipSection, ModelSection, ComparisonSection, StorySection, ProgrammeSection, ClosingSection } from '@/components/coaching-sections';
import { siteMeta } from '@/lib/site-meta';
import landscape from '@/assets/stepping-stones.asset.json';
import { assetUrl } from '@/lib/asset-url';

export const Route = createFileRoute("/")({
  head: () => siteMeta('Where clarity drives transformation', 'Helping professionals navigate life transitions, overcome self-doubt, and create meaningful, lasting change with Lola Rey.'),
  component: Index,
});

function Index() {
  const book = useBooking();
  const [topic, setTopic] = useState<string | undefined>();
  return <><section className="hero"><img src={assetUrl(landscape.url)} alt="Stepping stones leading across calm water toward the horizon" className="hero-image" width={1920} height={1024} fetchPriority="high"/><div className="content-width hero-content"><div className="reveal"><span className="eyebrow hero-eyebrow">LR TRANSFORMATIONAL COACHING · YOUR NEXT CHAPTER</span><h1>Where clarity drives<em>TRANSFORMATION</em></h1><p className="hero-description">Helping professionals navigate life transitions,<br className="hidden sm:block"/> overcome self-doubt, and create meaningful,<br className="hidden sm:block"/> lasting change.</p></div><div className="reveal reveal-delay"><div className="pain-selectors" aria-label="What brings you here?">{['Career Crossroads', 'Executive Burnout', 'Identity & Confidence Shift'].map(t => <Button key={t} variant="outline" className={topic === t ? 'selected' : ''} aria-pressed={topic === t} onClick={() => { setTopic(t); window.history.replaceState(null, '', '#listen'); document.getElementById('listen')?.scrollIntoView({ behavior: 'smooth' }); }}>{topic === t && <Check/>}{t}</Button>)}</div><div className="hero-actions"><Button onClick={() => book(topic)}>Book 30-Min Discovery Call <ArrowRight/></Button><Link to="/transform-model" className="text-link">Explore the journey <ArrowUpRight size={16}/></Link></div></div></div></section><TrustStrip/><Introduction/><LeadershipSection/><ModelSection/><ComparisonSection/><StorySection/><ProgrammeSection/><ClosingSection/></>;
}
