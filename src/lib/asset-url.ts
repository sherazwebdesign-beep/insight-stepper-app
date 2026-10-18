// Images imported from `src/assets/*.asset.json` point at `/__l5e/assets-v1/...`, a path that is
// only served by Lovable hosting. When the site is deployed somewhere else (for example Netlify),
// set VITE_ASSET_ORIGIN to the origin that still serves them, such as
// https://insight-stepper-app.lovable.app, or replace the images with files in /public.
const origin = String(import.meta.env['VITE_ASSET_ORIGIN'] ?? '').replace(/\/$/, '');

export function assetUrl(url: string): string {
  return origin && url.startsWith('/__l5e/') ? `${origin}${url}` : url;
}
