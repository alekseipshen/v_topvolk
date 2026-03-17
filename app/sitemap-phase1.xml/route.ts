import { services } from '@/lib/data/services';
import { cities } from '@/lib/data/cities';

/**
 * PHASE 1 SITEMAP
 * Core pages + all service pages + top cities
 * ~90 pages
 */
export async function GET() {
  const baseUrl = 'https://www.topvolk.org';
  const now = new Date().toISOString();

  // Top 20 cities by importance
  const topCities = cities.slice(0, 20);

  const urls: Array<{ loc: string; lastmod: string; changefreq: string; priority: number }> = [
    // Core pages
    { loc: baseUrl, lastmod: now, changefreq: 'daily', priority: 1.0 },
    { loc: `${baseUrl}/services`, lastmod: now, changefreq: 'weekly', priority: 0.95 },
    { loc: `${baseUrl}/service-areas`, lastmod: now, changefreq: 'weekly', priority: 0.9 },
    { loc: `${baseUrl}/blog`, lastmod: now, changefreq: 'daily', priority: 0.9 },
    { loc: `${baseUrl}/commercial`, lastmod: now, changefreq: 'weekly', priority: 0.85 },

    // All service pages (29 services)
    ...services.map((service) => ({
      loc: `${baseUrl}/services/${service.slug}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.9,
    })),

    // Top 20 city pages
    ...topCities.map((city) => ({
      loc: `${baseUrl}/cities/${city.slug}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.85,
    })),

    // Legal pages
    { loc: `${baseUrl}/privacy-policy`, lastmod: now, changefreq: 'yearly', priority: 0.3 },
    { loc: `${baseUrl}/terms-of-use`, lastmod: now, changefreq: 'yearly', priority: 0.3 },
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
