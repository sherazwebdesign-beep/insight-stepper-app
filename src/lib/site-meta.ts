export function siteMeta(title: string, description: string) {
  return { meta: [
    { title: `${title} — LR Transformational Coaching` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} — LR Transformational Coaching` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] };
}