import { PHONE_NUMBER, PHONE_DISPLAY, BUSINESS_NAME, BUSINESS_EMAIL, GOOGLE_RATING } from '@/lib/utils';

const SITE_URL = 'https://www.topvolk.org';
const REVIEW_COUNT = 32;
const FOUNDED_YEAR = 2017;

interface SchemaParams {
  city?: string;
  service?: string;
  county?: string;
  // Legacy params from programmatic pages (brands/appliances routes)
  brand?: string;
  appliance?: string;
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
    description: 'Professional home renovation and construction services in the greater Seattle area. Kitchen remodels, bathroom renovations, deck installations, and general contracting since 2017.',
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
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '19:00',
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
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '19:00',
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
  const { city, brand } = params;
  const service = getEffectiveService(params);

  const serviceName = brand && service
    ? `${formatName(brand)} ${formatName(service)}`
    : service
    ? formatName(service)
    : brand
    ? `${formatName(brand)} Services`
    : 'Home Renovation';
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
 * 2. SchemaParams { brand, service, city, appliance } -- auto-generated
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
  const { city, brand } = params as SchemaParams;
  const service = getEffectiveService(params as SchemaParams);

  const items: any[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
  ];

  let position = 2;

  if (brand) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: formatName(brand),
      item: `${SITE_URL}/brands/${brand}`,
    });
  }

  if (service) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: formatName(service),
      item: brand
        ? `${SITE_URL}/brands/${brand}/services/${service}`
        : `${SITE_URL}/services/${service}`,
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

// ---- Helpers ----

function getEffectiveService(params: SchemaParams): string | undefined {
  return params.service || params.appliance;
}

function generateBusinessDescription(params: SchemaParams): string {
  const { city, brand } = params;
  const service = getEffectiveService(params);

  if (city && brand && service) {
    return `Professional ${formatName(brand)} ${formatName(service).toLowerCase()} services in ${formatName(city)}, WA. Licensed contractor since ${FOUNDED_YEAR}. Call ${PHONE_DISPLAY}.`;
  } else if (city && service) {
    return `Professional ${formatName(service).toLowerCase()} services in ${formatName(city)}, WA. Licensed contractor since ${FOUNDED_YEAR}. Call ${PHONE_DISPLAY} for a free estimate.`;
  } else if (brand && service) {
    return `Professional ${formatName(brand)} ${formatName(service).toLowerCase()} services in Seattle and surrounding areas. Licensed contractor since ${FOUNDED_YEAR}.`;
  } else if (city) {
    return `Professional home renovation services in ${formatName(city)}, WA. Kitchen remodels, bathroom renovations, deck installations. Licensed contractor since ${FOUNDED_YEAR}.`;
  } else if (brand) {
    return `Professional ${formatName(brand)} services in Seattle and surrounding areas. Licensed contractor with 100+ projects since ${FOUNDED_YEAR}.`;
  } else if (service) {
    return `Expert ${formatName(service).toLowerCase()} services in Seattle and surrounding areas. Licensed contractor with 100+ projects since ${FOUNDED_YEAR}.`;
  }
  return `Professional home renovation services in Seattle area. Kitchen remodels, bathroom renovations, deck installations. Licensed contractor since ${FOUNDED_YEAR}.`;
}

function generateServiceDescription(params: SchemaParams): string {
  const { city, brand } = params;
  const service = getEffectiveService(params);

  if (city && brand && service) {
    return `Professional ${formatName(brand)} ${formatName(service).toLowerCase()} services in ${formatName(city)}, WA. Licensed contractor. Call ${PHONE_DISPLAY}.`;
  } else if (city && service) {
    return `Professional ${formatName(service).toLowerCase()} services in ${formatName(city)}, WA. Licensed contractor, quality craftsmanship, free estimates. Call ${PHONE_DISPLAY}.`;
  } else if (brand && service) {
    return `Professional ${formatName(brand)} ${formatName(service).toLowerCase()} services in Seattle area. Licensed contractor with 100+ completed projects.`;
  } else if (service) {
    return `Professional ${formatName(service).toLowerCase()} services in Seattle and King County area. Licensed contractor with 100+ completed projects.`;
  } else if (brand) {
    return `Professional ${formatName(brand)} services in Seattle area. Licensed contractor with 100+ completed projects.`;
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
