import { services } from '@/lib/data/services';
import { cities } from '@/lib/data/cities';

/**
 * PHASE 1 SITEMAP
 * Core pages + all service pages + top cities
 * ~90 pages
 */
import { pageLastmod } from '@/lib/data/pageLastmod';

// lastmod = the page's real last change (lib/data/pageLastmod.ts), never request
// time: a date that moves on every fetch makes Google ignore lastmod entirely.
export async function GET() {
  const baseUrl = 'https://www.topvolk.org';
  
  // Top 20 cities by importance
  const topCities = cities.slice(0, 20);

  const urls: Array<{ loc: string; lastmod: string; changefreq: string; priority: number }> = [
    // Core pages
    { loc: baseUrl, lastmod: pageLastmod('/'), changefreq: 'daily', priority: 1.0 },
    { loc: `${baseUrl}/services`, lastmod: pageLastmod('/services'), changefreq: 'weekly', priority: 0.95 },
    { loc: `${baseUrl}/service-areas`, lastmod: pageLastmod('/service-areas'), changefreq: 'weekly', priority: 0.9 },
    { loc: `${baseUrl}/blog`, lastmod: pageLastmod('/blog'), changefreq: 'daily', priority: 0.9 },

    // Cost guide pillar posts
    { loc: `${baseUrl}/blog/bathroom-remodel-cost-seattle`, lastmod: pageLastmod('/blog/bathroom-remodel-cost-seattle'), changefreq: 'monthly', priority: 0.85 },
    { loc: `${baseUrl}/blog/kitchen-remodel-cost-seattle`, lastmod: pageLastmod('/blog/kitchen-remodel-cost-seattle'), changefreq: 'monthly', priority: 0.85 },
    { loc: `${baseUrl}/blog/deck-cost-seattle`, lastmod: pageLastmod('/blog/deck-cost-seattle'), changefreq: 'monthly', priority: 0.85 },
    { loc: `${baseUrl}/blog/basement-finishing-cost-seattle`, lastmod: pageLastmod('/blog/basement-finishing-cost-seattle'), changefreq: 'monthly', priority: 0.85 },

    // All service pages (29 services)
    ...services.map((service) => ({
      loc: `${baseUrl}/services/${service.slug}`,
      lastmod: pageLastmod(`/services/${service.slug}`),
      changefreq: 'weekly',
      priority: 0.9,
    })),

    // Top 20 city pages
    ...topCities.map((city) => ({
      loc: `${baseUrl}/cities/${city.slug}`,
      lastmod: pageLastmod(`/cities/${city.slug}`),
      changefreq: 'weekly',
      priority: 0.85,
    })),

    // Legal pages
    { loc: `${baseUrl}/privacy-policy`, lastmod: pageLastmod('/privacy-policy'), changefreq: 'yearly', priority: 0.3 },
    { loc: `${baseUrl}/terms-of-use`, lastmod: pageLastmod('/terms-of-use'), changefreq: 'yearly', priority: 0.3 },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
