import { services } from '@/lib/data/services';
import { cities } from '@/lib/data/cities';

/**
 * PHASE 3 SITEMAP
 * All remaining service+city combos
 * Submit after Phase 2 is 80%+ indexed
 */
export async function GET() {
  const baseUrl = 'https://www.topvolk.org';
  const now = new Date().toISOString();

  // All services
  const allServices = services;
  // Top 20 cities already covered in phase 2 with featured services;
  // here we add remaining service combos for top cities + all combos for remaining cities
  const topCities = cities.slice(0, 20);
  const remainingCities = cities.slice(20);
  const featuredServiceSlugs = new Set(services.slice(0, 6).map(s => s.slug));
  const remainingServices = services.filter(s => !featuredServiceSlugs.has(s.slug));

  const urls: Array<{ loc: string; lastmod: string; changefreq: string; priority: number }> = [
    // Remaining services x top 20 cities (not covered in phase 2)
    ...topCities.flatMap((city) =>
      remainingServices.map((service) => ({
        loc: `${baseUrl}/services/${service.slug}/${city.slug}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7,
      }))
    ),

    // All services x remaining cities
    ...remainingCities.flatMap((city) =>
      allServices.map((service) => ({
        loc: `${baseUrl}/services/${service.slug}/${city.slug}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.65,
      }))
    ),
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
