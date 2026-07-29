import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.topvolk.org';

  return {
    rules: [
      // NB: never disallow /_next/. Next/Image serves every optimised image
      // from /_next/image, so blocking it removes the whole site from Google
      // Images and strips thumbnails out of the local pack and AI answers.
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/keystatic/',
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
