import transition from '@/assets/transition.asset.json';
import { assetUrl } from './asset-url';

/**
 * Images shown beside each stage of the Transform Model™.
 *
 * To change an image:
 *   1. Drop the new file into /public/images/stages/ (replace the existing file, or add a new one).
 *   2. Point that stage's `src` at it, e.g. src: '/images/stages/awareness.jpg'.
 *   3. Update `alt` so it describes the new picture.
 * Set `src` to null to show a calm text panel instead of a photo.
 *
 * These are full infographics (they carry their own titles and text), so they are shown whole,
 * never cropped.
 */
export type StageName = 'Awareness' | 'Vision' | 'Mindset Shift' | 'Aligned Action' | 'Sustainable Growth';

export type StageImage = { src: string | null; alt: string };

export const stageImages: Record<StageName, StageImage> = {
  Awareness: { src: '/images/stages/awareness.jpg', alt: 'Awareness: Know. Understand. Grow. A cycle of noticing more, being curious, gaining clarity, making intentional choices and moving forward.' },
  Vision: { src: '/images/stages/vision.jpg', alt: 'Vision: a cycle of imagining boldly, finding your purpose, setting direction, taking action, learning and adapting, and making an impact.' },
  'Mindset Shift': { src: '/images/stages/mindset-shift.jpg', alt: 'Mindset Shift: a cycle of thinking clearly, staying curious, taking action, building confidence and embracing challenges.' },
  'Aligned Action': { src: '/images/stages/aligned-action.jpg', alt: 'Aligned Action: small steps, big progress. Stepping stones across calm water from setting your intentions to creating lasting change.' },
  'Sustainable Growth': { src: '/images/stages/sustainable-growth.jpg', alt: 'Sustainable Growth: small steps, lasting impact. A path up a sunlit hillside from setting your intentions to creating lasting change.' },
};

/** Photo behind the closing call to action (the client prefers the woman with the flowing scarf). */
export const closingImage: StageImage = {
  src: assetUrl(transition.url),
  alt: 'A woman holding a flowing scarf beside the sea at sunset',
};
