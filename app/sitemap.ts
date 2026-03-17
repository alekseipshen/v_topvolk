import { MetadataRoute } from 'next';

/**
 * MAIN SITEMAP INDEX
 * Points to phased sitemaps for gradual indexation
 *
 * Phase 1: Core pages + service pages + top cities (~90 pages)
 * Phase 2: Service+City combos for top cities (~350 pages)
 * Phase 3: All remaining service+city combos
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.topvolk.org';

  const routes: MetadataRoute.Sitemap = [
    // Phase 1: ACTIVE — core pages, all services, top cities
    {
      url: `${baseUrl}/sitemap-phase1.xml`,
      lastModified: new Date(),
    },

    // Phase 2: Service+City combos for top cities
    {
      url: `${baseUrl}/sitemap-phase2.xml`,
      lastModified: new Date(),
    },

    // Phase 3: Remaining service+city combos
    // UNCOMMENT WHEN READY:
    // {
    //   url: `${baseUrl}/sitemap-phase3.xml`,
    //   lastModified: new Date(),
    // },
  ];

  return routes;
}
