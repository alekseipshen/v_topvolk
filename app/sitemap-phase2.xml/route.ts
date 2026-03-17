import { services } from '@/lib/data/services';
import { cities } from '@/lib/data/cities';

/**
 * PHASE 2 SITEMAP
 * Remaining city pages + Service+City combos for top cities
 * ~350 pages
 */
export async function GET() {
  const baseUrl = 'https://www.topvolk.org';
  const now = new Date().toISOString();

  // Featured services for city combos (top 6 most important)
  const featuredServices = services.slice(0, 6);
  // Top 20 cities for combos
  const topCities = cities.slice(0, 20);
  // Remaining cities
  const remainingCities = cities.slice(20);

  const urls: Array<{ loc: string; lastmod: string; changefreq: string; priority: number }> = [
    // Remaining city pages (cities 21+)
    ...remainingCities.map((city) => ({
      loc: `${baseUrl}/cities/${city.slug}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.75,
    })),

    // Service+City combos for top 20 cities x featured 6 services (120 pages)
    ...topCities.flatMap((city) =>
      featuredServices.map((service) => ({
        loc: `${baseUrl}/services/${service.slug}/${city.slug}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8,
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
