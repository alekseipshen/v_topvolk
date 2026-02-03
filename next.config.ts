import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
        ],
      },
      {
        // Cache static assets
        source: '/brands/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // SEO Redirects from old site structure
  async redirects() {
    return [
      // Appliance repair pages → New service pages
      {
        source: '/refrigerator-repair',
        destination: '/services/refrigerator-repair',
        permanent: true, // 301 redirect
      },
      {
        source: '/washer-repair',
        destination: '/services/washer-repair',
        permanent: true,
      },
      
      // County/location pages → New service areas page
      {
        source: '/appliance-repair-bergen-county',
        destination: '/service-areas#bergen',
        permanent: true,
      },
      
      // Contact page → Homepage with contact section
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
      
      // Brand repair pages → Brand pages
      {
        source: '/samsung-appliance-repair-bergen-county',
        destination: '/brands/samsung-repair',
        permanent: true,
      },
      {
        source: '/samsung-appliance-repair',
        destination: '/brands/samsung-repair',
        permanent: true,
      },
      {
        source: '/lg-appliance-repair-bergen-county',
        destination: '/brands/lg-repair',
        permanent: true,
      },
      
      // City pages → Keep existing structure
      {
        source: '/cities/kenilworth',
        destination: '/cities/kenilworth',
        permanent: false, // Already correct
      },
      
      // Old blog post → New blog post (will create it)
      {
        source: '/5-top-reasons-why-your-dryer-isnt-drying-clothes-new-jersey-homeowners-guide',
        destination: '/blog/why-your-dryer-isnt-drying-clothes',
        permanent: true,
      },
    ];
  },
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
