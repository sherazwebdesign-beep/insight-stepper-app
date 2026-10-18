import reflection from '@/assets/reflection.asset.json';
import balance from '@/assets/life-balance.asset.json';
import mindset from '@/assets/mindset.asset.json';
import stones from '@/assets/stepping-stones.asset.json';
import { assetUrl } from './asset-url';

/**
 * Images shown beside each stage of the Transform Model™.
 *
 * To change an image:
 *   1. Drop the new file into /public/images/stages/ (for example awareness.jpg).
 *   2. Point that stage's `src` at it, e.g. src: '/images/stages/awareness.jpg'.
 *   3. Update `alt` so it describes the new picture.
 * Set `src` to null to show a calm text panel instead of a photo.
 */
export type StageName = 'Awareness' | 'Vision' | 'Mindset Shift' | 'Aligned Action' | 'Sustainable Growth';

export type StageImage = { src: string | null; alt: string };

export const stageImages: Record<StageName, StageImage> = {
  Awareness: { src: assetUrl(reflection.url), alt: 'A quiet moment of reflection by a sunlit window' },
  Vision: { src: assetUrl(balance.url), alt: 'Life balance across work, self, family and friends' },
  'Mindset Shift': { src: assetUrl(mindset.url), alt: 'Reflecting on mindset, choices and connection' },
  // The previous photo for this stage was removed at the client's request; a landscape stands in
  // until a replacement is chosen.
  'Aligned Action': { src: '/images/stages/aligned-action.jpg', alt: 'An olive tree on a sunlit hillside above the sea' },
  'Sustainable Growth': { src: assetUrl(stones.url), alt: 'Stepping stones leading across calm water' },
};

/** Soft landscape behind the closing call to action (no people). */
export const closingImage: StageImage = {
  src: '/images/closing.jpg',
  alt: 'A calm coastline at golden hour',
};
