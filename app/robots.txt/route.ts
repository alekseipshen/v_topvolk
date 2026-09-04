/**
 * robots.txt as an explicit route.
 *
 * Replaces app/robots.ts because Next's MetadataRoute.Robots has no escape
 * hatch for non-standard directives, and we need `Content-Signal:`
 * (IETF draft-romm-aipref-contentsignals) — it declares what AI operators may
 * do with the content, which is separate from whether a crawler may access it.
 *
 * Output is byte-identical to the previous MetadataRoute output apart from the
 * added comment block and Content-Signal line.
 *
 * NB: never disallow /_next/. Next/Image serves every optimised image from
 * /_next/image, so blocking it removes the whole site from Google Images and
 * strips thumbnails out of the local pack and AI answers.
 */

const BASE_URL = 'https://www.topvolk.org';

const DISALLOW = [
  '/api/',
  '/keystatic/',
  '/admin/',
  '/test/',
  '/test-geo/',
  '/test-hero/',
  '/test-gallery/',
];

// We want to be found, quoted and recommended by AI assistants, so search and
// retrieval are permitted; training is permitted too, since refusing it does
// not help visibility and this is public marketing content.
const CONTENT_SIGNAL = 'ai-train=yes, search=yes, ai-retrieval=yes';

const SITEMAPS = [
  `${BASE_URL}/sitemap.xml`,
  `${BASE_URL}/sitemap-phase1.xml`,
  `${BASE_URL}/sitemap-phase2.xml`,
];

function group(userAgent: string, crawlDelay: number, contentSignal?: string) {
  const lines = [`User-Agent: ${userAgent}`, 'Allow: /'];
  for (const path of DISALLOW) lines.push(`Disallow: ${path}`);
  lines.push(`Crawl-delay: ${crawlDelay}`);
  if (contentSignal) lines.push(`Content-Signal: ${contentSignal}`);
  return lines.join('\n');
}

export function GET() {
  const body = [
    group('*', 1, CONTENT_SIGNAL),
    group('Googlebot', 0.5),
    group('Bingbot', 1),
    SITEMAPS.map((url) => `Sitemap: ${url}`).join('\n'),
  ].join('\n\n') + '\n';

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
