import { PHONE_NUMBER, PHONE_DISPLAY, BUSINESS_NAME, GOOGLE_RATING } from '@/lib/utils';

interface SchemaParams {
  city?: string;
  service?: string;
  // Legacy params from programmatic pages (brands/appliances routes)
  brand?: string;
  appliance?: string;
  county?: string;
}

const SITE_URL = 'https://topvolk.org';
const REVIEW_COUNT = 30;

export function generateLocalBusinessSchema(params: SchemaParams) {
  const { city, service } = params;
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}#business`,
    name: BUSINESS_NAME,
    description: generateBusinessDescription(params),
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    priceRange: '$$',
    image: `${SITE_URL}/logo.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_RATING.toString(),
      reviewCount: REVIEW_COUNT.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US',
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
  };
  
  return schema;
}

export function generateServiceSchema(params: SchemaParams) {
  const { city } = params;
  
  const serviceName = generateServiceName(params);
  const serviceDescription = generateServiceDescription(params);
  
  const schema: any = {
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
  };
  
  return schema;
}

export function generateBreadcrumbSchema(params: SchemaParams) {
  const { city, brand } = params;
  const service = getEffectiveService(params);
  
  const items: any[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
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

// Helper functions

function getEffectiveService(params: SchemaParams): string | undefined {
  return params.service || params.appliance;
}

function generateBusinessDescription(params: SchemaParams): string {
  const { city, brand } = params;
  const service = getEffectiveService(params);
  
  if (city && brand && service) {
    return `Professional ${formatName(brand)} ${formatName(service)} services in ${formatName(city)}, WA. Licensed contractor since 2017. Call ${PHONE_DISPLAY}.`;
  } else if (city && service) {
    return `Professional ${formatName(service)} services in ${formatName(city)}, WA. Licensed contractor since 2017. Call ${PHONE_DISPLAY} for a free estimate.`;
  } else if (brand && service) {
    return `Professional ${formatName(brand)} ${formatName(service)} services in Seattle and surrounding areas. Licensed contractor since 2017.`;
  } else if (city) {
    return `Professional home renovation services in ${formatName(city)}, WA. Kitchen remodels, bathroom renovations, deck installations. Licensed contractor since 2017.`;
  } else if (brand) {
    return `Professional ${formatName(brand)} services in Seattle and surrounding areas. Licensed contractor with 100+ projects since 2017.`;
  } else if (service) {
    return `Expert ${formatName(service)} services in Seattle and surrounding areas. Licensed contractor with 100+ projects since 2017.`;
  } else {
    return `Professional home renovation services in Seattle area. Kitchen remodels, bathroom renovations, deck installations. Licensed contractor since 2017.`;
  }
}

function generateServiceName(params: SchemaParams): string {
  const { brand } = params;
  const service = getEffectiveService(params);
  
  if (brand && service) {
    return `${formatName(brand)} ${formatName(service)}`;
  } else if (service) {
    return formatName(service);
  } else if (brand) {
    return `${formatName(brand)} Services`;
  }
  return 'Home Renovation';
}

function generateServiceDescription(params: SchemaParams): string {
  const { city, brand } = params;
  const service = getEffectiveService(params);
  
  if (city && brand && service) {
    return `Professional ${formatName(brand)} ${formatName(service)} services in ${formatName(city)}, WA. Licensed contractor. Call ${PHONE_DISPLAY}.`;
  } else if (city && service) {
    return `Professional ${formatName(service)} services in ${formatName(city)}, WA. Licensed contractor, quality craftsmanship, free estimates. Call ${PHONE_DISPLAY}.`;
  } else if (brand && service) {
    return `Professional ${formatName(brand)} ${formatName(service)} services in Seattle area. Licensed contractor with 100+ completed projects.`;
  } else if (service) {
    return `Professional ${formatName(service)} services in Seattle and King County area. Licensed contractor with 100+ completed projects.`;
  } else {
    return `Professional home renovation services in Seattle area. Kitchen remodels, bathroom renovations, deck installations, and more.`;
  }
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
        '@id': 'https://en.wikipedia.org/wiki/Washington_(state)',
      },
    };
  } else {
    return [
      {
        '@type': 'City',
        name: 'Seattle',
      },
      {
        '@type': 'City',
        name: 'Bellevue',
      },
      {
        '@type': 'City',
        name: 'Tacoma',
      },
      {
        '@type': 'City',
        name: 'Kirkland',
      },
    ];
  }
}

function formatName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
