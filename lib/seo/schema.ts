interface SchemaParams {
  city?: string;
  appliance?: string;
  brand?: string;
  county?: string;
}

const SITE_URL = 'https://maxapplianceservice.com';
const BUSINESS_NAME = 'Max Appliance Service';
const PHONE = '+15512829561';
const PHONE_DISPLAY = '(888) 771-3235';
const GOOGLE_RATING = 4.9;
const REVIEW_COUNT = 100;

export function generateLocalBusinessSchema(params: SchemaParams) {
  const { city, appliance, brand, county } = params;
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}#business`,
    name: BUSINESS_NAME,
    description: generateBusinessDescription(params),
    url: SITE_URL,
    telephone: PHONE,
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
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    areaServed: generateAreaServed(params),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '21:00',
      },
    ],
  };
  
  return schema;
}

export function generateServiceSchema(params: SchemaParams) {
  const { city, appliance, brand } = params;
  
  const serviceName = generateServiceName(params);
  const serviceDescription = generateServiceDescription(params);
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      telephone: PHONE,
      url: SITE_URL,
    },
    areaServed: generateAreaServed(params),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${serviceName} Services`,
      itemListElement: generateServiceList(params),
    },
  };
  
  return schema;
}

export function generateBreadcrumbSchema(params: SchemaParams) {
  const { city, appliance, brand } = params;
  
  const items: any[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ];
  
  let position = 2;
  
  if (city) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: formatCityName(city),
      item: `${SITE_URL}/${city}`,
    });
  }
  
  if (brand && !appliance) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: `${formatBrandName(brand)} Repair`,
      item: city ? `${SITE_URL}/${city}/${brand}-repair` : `${SITE_URL}/${brand}-repair`,
    });
  }
  
  if (appliance && !brand) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: `${formatApplianceName(appliance)} Repair`,
      item: city ? `${SITE_URL}/${city}/${appliance}-repair` : `${SITE_URL}/${appliance}-repair`,
    });
  }
  
  if (brand && appliance) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: `${formatBrandName(brand)} ${formatApplianceName(appliance)} Repair`,
      item: city 
        ? `${SITE_URL}/${city}/${brand}/${appliance}-repair`
        : `${SITE_URL}/${brand}/${appliance}-repair`,
    });
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

// Helper functions

function generateBusinessDescription(params: SchemaParams): string {
  const { city, appliance, brand } = params;
  
  if (city && brand && appliance) {
    return `Professional ${formatBrandName(brand)} ${formatApplianceName(appliance)} repair in ${formatCityName(city)}, Texas. Same-day service, certified technicians.`;
  } else if (city && appliance) {
    return `Expert ${formatApplianceName(appliance)} repair in ${formatCityName(city)}, NJ. 20+ years experience, same-day service available.`;
  } else if (city) {
    return `Professional appliance repair services in ${formatCityName(city)}, Texas. All major brands and appliances. Same-day service.`;
  } else {
    return `Expert appliance repair across Texas. 20+ years experience, certified technicians, same-day service for all major brands.`;
  }
}

function generateServiceName(params: SchemaParams): string {
  const { city, appliance, brand } = params;
  
  if (brand && appliance) {
    return `${formatBrandName(brand)} ${formatApplianceName(appliance)} Repair`;
  } else if (appliance) {
    return `${formatApplianceName(appliance)} Repair`;
  } else if (brand) {
    return `${formatBrandName(brand)} Appliance Repair`;
  } else {
    return 'Appliance Repair';
  }
}

function generateServiceDescription(params: SchemaParams): string {
  const { city, appliance, brand } = params;
  
  if (city && brand && appliance) {
    return `Professional ${formatBrandName(brand)} ${formatApplianceName(appliance)} repair services in ${formatCityName(city)}, Texas. Factory-trained technicians, same-day service, upfront pricing.`;
  } else if (city && appliance) {
    return `Expert ${formatApplianceName(appliance)} repair in ${formatCityName(city)}, NJ. Certified technicians, same-day service, all major brands.`;
  } else if (brand && appliance) {
    return `Professional ${formatBrandName(brand)} ${formatApplianceName(appliance)} repair across Texas. Factory-trained technicians, 20+ years experience.`;
  } else {
    return `Professional appliance repair services across Texas. All major brands and appliances. Same-day service available.`;
  }
}

function generateAreaServed(params: SchemaParams): any {
  const { city, county } = params;
  
  if (city) {
    return {
      '@type': 'City',
      name: formatCityName(city),
      containedInPlace: {
        '@type': 'State',
        name: 'Texas',
        '@id': 'https://en.wikipedia.org/wiki/New_Jersey',
      },
    };
  } else {
    return {
      '@type': 'State',
      name: 'Texas',
      '@id': 'https://en.wikipedia.org/wiki/New_Jersey',
    };
  }
}

function generateServiceList(params: SchemaParams): any[] {
  const { appliance } = params;
  
  if (appliance === 'refrigerator') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Refrigerator Not Cooling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ice Maker Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Water Dispenser Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Compressor Replacement' } },
    ];
  } else if (appliance === 'washer') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Washer Won\'t Spin' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Washer Leaking' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Washer Not Draining' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Control Panel Repair' } },
    ];
  } else if (appliance === 'dryer') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dryer Not Heating' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dryer Won\'t Start' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dryer Takes Too Long' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Belt Replacement' } },
    ];
  } else {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Appliance Diagnostic' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Appliance Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maintenance Service' } },
    ];
  }
}

function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatBrandName(slug: string): string {
  const brandMap: { [key: string]: string } = {
    'lg': 'LG',
    'ge': 'GE',
    'ge-appliances': 'GE Appliances',
    'ge-profile': 'GE Profile',
    'kitchenaid': 'KitchenAid',
    'sub-zero': 'Sub-Zero',
    'jennair': 'JennAir',
    'u-line': 'U-Line',
    'fisher-paykel': 'Fisher & Paykel',
  };
  
  if (brandMap[slug]) return brandMap[slug];
  
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatApplianceName(slug: string): string {
  const applianceMap: { [key: string]: string } = {
    'refrigerator': 'Refrigerator',
    'washer': 'Washer',
    'dryer': 'Dryer',
    'dishwasher': 'Dishwasher',
    'oven': 'Oven/Stove',
    'range': 'Range',
    'cooktop': 'Cooktop',
    'freezer': 'Freezer',
    'range-hood': 'Range Hood',
    'ice-maker': 'Ice Maker',
    'coffee-machine': 'Coffee Machine',
  };
  
  return applianceMap[slug] || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}



