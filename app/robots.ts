import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.topvolk.org';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/keystatic/',
          '/_next/',
          '/admin/',
          '/test/',
          '/test-geo/',
          '/test-hero/',
          '/test-gallery/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/keystatic/',
          '/_next/',
          '/admin/',
          '/test/',
          '/test-geo/',
          '/test-hero/',
          '/test-gallery/',
        ],
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/keystatic/',
          '/_next/',
          '/admin/',
          '/test/',
          '/test-geo/',
          '/test-hero/',
          '/test-gallery/',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-phase1.xml`,
      `${baseUrl}/sitemap-phase2.xml`,
    ],
  };
}
