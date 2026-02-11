/**
 * Schema.org Structured Data Components
 * Helps Google understand our business, services, and local presence
 */

import { BUSINESS_NAME, PHONE_NUMBER, BUSINESS_EMAIL, BUSINESS_ADDRESS } from '@/lib/utils';

interface LocalBusinessProps {
  name?: string;
  city?: string;
  county?: string;
  service?: string;
}

/**
 * LocalBusiness Schema for main pages
 */
export function LocalBusinessSchema({ name, city, county, service }: LocalBusinessProps = {}) {
  const businessName = name || BUSINESS_NAME;
  const areaServed = city 
    ? `${city}, WA` 
    : county 
    ? `${county} County, WA`
    : 'Seattle, WA';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://topvolk.org/#organization',
    name: businessName,
    legalName: 'TopVolk Construction LLC',
    description: service 
      ? `Professional ${service} service in ${areaServed}. Same-day appointments, 20+ years experience, all major brands.`
      : `Professional appliance repair service in ${areaServed}. Same-day appointments, 20+ years experience, all major brands.`,
    url: 'https://topvolk.org',
    logo: 'https://topvolk.org/logo.png',
    image: 'https://topvolk.org/og-image.jpg',
    telephone: PHONE_NUMBER,
    email: BUSINESS_EMAIL,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city || 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
    geo: county === 'King' ? {
      '@type': 'GeoCoordinates',
      latitude: '47.6062',
      longitude: '-122.3321',
    } : undefined,
    areaServed: [
      {
        '@type': 'State',
        name: 'Washington',
      },
      ...(county ? [{
        '@type': 'AdministrativeArea',
        name: `${county} County`,
      }] : []),
      ...(city ? [{
        '@type': 'City',
        name: city,
      }] : []),
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      // Add social media profiles when available
      // 'https://www.facebook.com/topvolkconstruction',
      // 'https://www.instagram.com/topvolkconstruction',
    ],
    ...(service && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Appliance Repair Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service,
              provider: {
                '@type': 'LocalBusiness',
                name: businessName,
              },
              areaServed: areaServed,
            },
          },
        ],
      },
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '100',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList Schema for navigation
 */
interface BreadcrumbProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service Schema for specific appliance repair services
 */
interface ServiceProps {
  name: string;
  description: string;
  url: string;
  city?: string;
  brand?: string;
}

export function ServiceSchema({ name, description, url, city, brand }: ServiceProps) {
  const areaServed = city ? `${city}, WA` : 'Seattle, WA';
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': url,
    serviceType: name,
    name: brand ? `${brand} ${name}` : name,
    description: description,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      telephone: PHONE_NUMBER,
      email: BUSINESS_EMAIL,
      url: 'https://topvolk.org',
    },
    areaServed: {
      '@type': city ? 'City' : 'State',
      name: areaServed,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceRange: '$$',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * WebPage Schema for regular pages
 */
interface WebPageProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}

export function WebPageSchema({ title, description, url, datePublished, dateModified }: WebPageProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://topvolk.org/#website',
      url: 'https://topvolk.org',
      name: BUSINESS_NAME,
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQ Schema for service pages
 */
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
