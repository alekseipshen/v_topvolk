/**
 * SITEMAP INDEX
 *
 * This used to be app/sitemap.ts. Next's MetadataRoute.Sitemap can only emit a
 * <urlset>, so the two child sitemaps were published as ordinary page URLs and
 * Search Console read /sitemap.xml as a two-page sitemap: isSitemapsIndex
 * false, 2 URLs submitted, 0 indexed. Nothing inside phase 1 or phase 2 was
 * ever submitted through it. A sitemap index has to be hand-written, hence a
 * route handler.
 *
 * There is no phase 3 any more. It listed 3 420 service x city combinations
 * by position in the grid; on 2026-09-29 that was replaced by the index
 * allowlist, and phase 2 now lists exactly the service x city pages that are
 * allowed to be indexed.
 */

const BASE_URL = 'https://www.topvolk.org';

const CHILD_SITEMAPS = [
  `${BASE_URL}/sitemap-phase1.xml`,
  `${BASE_URL}/sitemap-phase2.xml`,
];

export async function GET() {
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${CHILD_SITEMAPS.map(
    (loc) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
  ).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
