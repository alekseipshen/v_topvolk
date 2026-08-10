import { PHONE_NUMBER, PHONE_DISPLAY, BUSINESS_NAME, BUSINESS_EMAIL, GOOGLE_RATING } from '@/lib/utils';
import { reviews } from '@/lib/data/reviews';
import { featuredServices } from '@/lib/data/services';
import type { FaqItem } from '@/lib/data/faqs';

const SITE_URL = 'https://www.topvolk.org';
const REVIEW_COUNT = 32;
const FOUNDED_YEAR = 2023;

interface SchemaParams {
  city?: string;
  service?: string;
  county?: string;
}

/**
 * Organization schema -- used on homepage
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: BUSINESS_NAME,
    legalName: 'TopVolk Construction LLC',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    telephone: PHONE_NUMBER,
    email: BUSINESS_EMAIL,
    foundingDate: `${FOUNDED_YEAR}`,
    priceRange: '$$',
    description: 'Professional home renovation and construction services in the greater Seattle area. Kitchen remodels, bathroom renovations, deck installations, and general contracting since 2023.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '47.6062',
      longitude: '-122.3321',
    },
    areaServed: [
      { '@type': 'City', name: 'Seattle' },
      { '@type': 'City', name: 'Bellevue' },
      { '@type': 'City', name: 'Tacoma' },
      { '@type': 'City', name: 'Kirkland' },
      { '@type': 'City', name: 'Redmond' },
      { '@type': 'AdministrativeArea', name: 'King County' },
      { '@type': 'AdministrativeArea', name: 'Snohomish County' },
      { '@type': 'AdministrativeArea', name: 'Pierce County' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        // Mirrors the Google Business Profile exactly (Mon-Sat 09:00-17:00).
        // GBP is the canonical source for NAP + hours: it is what searchers see,
        // and any drift between it and the site is a NAP-consistency hit.
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_RATING.toString(),
      reviewCount: REVIEW_COUNT.toString(),
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * WebSite schema -- used on homepage
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    description: 'Professional home renovation and construction services in Seattle, WA area.',
    publisher: {
      '@id': `${SITE_URL}#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * LocalBusiness schema -- used on city pages and as secondary on service pages
 */
export function generateLocalBusinessSchema(params: SchemaParams) {
  const { city, service, county } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}#business`,
    name: BUSINESS_NAME,
    description: generateBusinessDescription(params),
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    email: BUSINESS_EMAIL,
    priceRange: '$$',
    image: `${SITE_URL}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city || 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '47.6062',
      longitude: '-122.3321',
    },
    areaServed: generateAreaServed(params),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        // Mirrors the Google Business Profile exactly (Mon-Sat 09:00-17:00).
        // GBP is the canonical source for NAP + hours: it is what searchers see,
        // and any drift between it and the site is a NAP-consistency hit.
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_RATING.toString(),
      reviewCount: REVIEW_COUNT.toString(),
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Service schema -- used on service pages
 */
export function generateServiceSchema(params: SchemaParams) {
  const service = getEffectiveService(params);

  const serviceName = service ? formatName(service) : 'Home Renovation';
  const serviceDescription = generateServiceDescription(params);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: BUSINESS_NAME,
      telephone: PHONE_NUMBER,
      url: SITE_URL,
    },
    areaServed: generateAreaServed(params),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
      },
    },
  };
}

/**
 * BreadcrumbList schema
 * Supports two call patterns:
 * 1. { items: [...] } -- explicit breadcrumb items
 * 2. SchemaParams { service, city } -- auto-generated
 */
export function generateBreadcrumbSchema(params: { items: Array<{ name: string; url: string }> } | SchemaParams) {
  if ('items' in params && Array.isArray(params.items)) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: params.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  // Auto-generate from SchemaParams
  const { city } = params as SchemaParams;
  const service = getEffectiveService(params as SchemaParams);

  const items: any[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
  ];

  let position = 2;

  if (service) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: formatName(service),
      item: `${SITE_URL}/services/${service}`,
    });
  }

  if (city) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: formatName(city),
      item: `${SITE_URL}/cities/${city}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/**
 * Review schemas -- homepage. One node per review that is actually rendered by
 * the <Reviews /> section, read from the same lib/data/reviews source so the
 * markup never claims a review the visitor can't see. Dates in the source are
 * relative ("3 months ago"), so datePublished is intentionally omitted rather
 * than fabricated.
 */
export function generateReviewSchemas() {
  return reviews.map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${SITE_URL}#business`,
      name: BUSINESS_NAME,
    },
    author: { '@type': 'Person', name: r.author },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: r.text,
  }));
}

/**
 * Service schemas -- homepage. One node per featured service shown in the
 * "Our Services" grid, linked back to the business entity via @id.
 */
export function generateHomepageServiceSchemas() {
  return featuredServices.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    serviceType: s.name,
    description: s.description,
    url: `${SITE_URL}/services/${s.slug}`,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${SITE_URL}#business`,
      name: BUSINESS_NAME,
      telephone: PHONE_NUMBER,
      url: SITE_URL,
    },
    areaServed: [
      { '@type': 'City', name: 'Seattle' },
      { '@type': 'City', name: 'Bellevue' },
      { '@type': 'City', name: 'Tacoma' },
    ],
  }));
}

/**
 * FAQPage schema -- mirrors the visible FAQ section on the homepage. Pass the
 * same items array that the section renders so the two never drift.
 */
export function generateFaqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

// ---- Helpers ----

function getEffectiveService(params: SchemaParams): string | undefined {
  return params.service;
}

function generateBusinessDescription(params: SchemaParams): string {
  const { city } = params;
  const service = getEffectiveService(params);

  if (city && service) {
    return `Professional ${formatName(service).toLowerCase()} services in ${formatName(city)}, WA. Licensed contractor since ${FOUNDED_YEAR}. Call ${PHONE_DISPLAY} for a free estimate.`;
  } else if (city) {
    return `Professional home renovation services in ${formatName(city)}, WA. Kitchen remodels, bathroom renovations, deck installations. Licensed contractor since ${FOUNDED_YEAR}.`;
  } else if (service) {
    return `Expert ${formatName(service).toLowerCase()} services in Seattle and surrounding areas. Licensed contractor with 100+ projects since ${FOUNDED_YEAR}.`;
  }
  return `Professional home renovation services in Seattle area. Kitchen remodels, bathroom renovations, deck installations. Licensed contractor since ${FOUNDED_YEAR}.`;
}

function generateServiceDescription(params: SchemaParams): string {
  const { city } = params;
  const service = getEffectiveService(params);

  if (city && service) {
    return `Professional ${formatName(service).toLowerCase()} services in ${formatName(city)}, WA. Licensed contractor, quality craftsmanship, free estimates. Call ${PHONE_DISPLAY}.`;
  } else if (service) {
    return `Professional ${formatName(service).toLowerCase()} services in Seattle and King County area. Licensed contractor with 100+ completed projects.`;
  }
  return `Professional home renovation services in Seattle area. Kitchen remodels, bathroom renovations, deck installations, and more.`;
}

function generateAreaServed(params: SchemaParams): any {
  const { city } = params;

  if (city) {
    return {
      '@type': 'City',
      name: formatName(city),
      containedInPlace: {
        '@type': 'State',
        name: 'Washington',
      },
    };
  }
  return [
    { '@type': 'City', name: 'Seattle' },
    { '@type': 'City', name: 'Bellevue' },
    { '@type': 'City', name: 'Tacoma' },
    { '@type': 'City', name: 'Kirkland' },
  ];
}

function formatName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
