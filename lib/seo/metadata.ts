import { Metadata } from 'next';

interface SEOParams {
  city?: string;
  appliance?: string;
  brand?: string;
  county?: string;
}

const SITE_NAME = 'Max Appliance Service';
const SITE_URL = 'https://maxapplianceservice.com'; // Update with actual domain
const PHONE = '(888) 771-3235';

export function generatePageMetadata(params: SEOParams): Metadata {
  const { city, appliance, brand, county } = params;
  
  // Generate title
  let title = '';
  let description = '';
  
  if (city && brand && appliance) {
    // City + Brand + Appliance
    const cityName = formatCityName(city);
    const brandName = formatBrandName(brand);
    const applianceName = formatApplianceName(appliance);
    title = `Expert ${brandName} ${applianceName} Repair in ${cityName} & Surrounding Cities | Same-Day Service`;
    description = `Professional ${brandName} ${applianceName} repair in ${cityName} and nearby areas. Certified technicians, same-day service, upfront pricing. Call ${PHONE} for ${brandName} appliance repairs!`;
  } else if (city && brand) {
    // City + Brand
    const cityName = formatCityName(city);
    const brandName = formatBrandName(brand);
    title = `${brandName} Appliance Repair in ${cityName} & Surrounding Cities | Expert ${brandName} Service`;
    description = `Trusted ${brandName} appliance repair in ${cityName} and nearby areas. Factory-trained technicians for all ${brandName} appliances. Same-day service available. Call ${PHONE} now!`;
  } else if (city && appliance) {
    // City + Appliance
    const cityName = formatCityName(city);
    const applianceName = formatApplianceName(appliance);
    title = `${cityName} ${applianceName} Repair & Surrounding Cities | Same-Day Service | ${SITE_NAME}`;
    description = `Expert ${applianceName} repair in ${cityName} and nearby areas. Same-day service, certified technicians, upfront pricing. Call ${PHONE} for professional ${applianceName} repair!`;
  } else if (brand && appliance) {
    // Brand + Appliance (state-wide NJ)
    const brandName = formatBrandName(brand);
    const applianceName = formatApplianceName(appliance);
    title = `${brandName} ${applianceName} Repair Texas | Expert ${brandName} Service`;
    description = `Professional ${brandName} ${applianceName} repair across Texas. Factory-trained technicians, same-day service, 20+ years experience. Call ${PHONE}!`;
  } else if (city) {
    // City only
    const cityName = formatCityName(city);
    title = `Appliance Repair in ${cityName} & Surrounding Cities | Same-Day Service | ${SITE_NAME}`;
    description = `Professional appliance repair in ${cityName} and nearby areas. Expert service for refrigerators, washers, dryers, ovens & more. Same-day service available. Call ${PHONE}!`;
  } else if (brand) {
    // Brand only (state-wide NJ)
    const brandName = formatBrandName(brand);
    title = `${brandName} Appliance Repair Texas | ${SITE_NAME}`;
    description = `Authorized ${brandName} appliance repair across NJ. Factory-trained technicians, all major ${brandName} appliances. Same-day service. Call ${PHONE}!`;
  } else if (appliance) {
    // Appliance only (state-wide NJ)
    const applianceName = formatApplianceName(appliance);
    title = `${applianceName} Repair Texas | Same-Day Service | ${SITE_NAME}`;
    description = `Expert ${applianceName} repair across Texas. Certified technicians, same-day service, all major brands. Call ${PHONE} for professional ${applianceName} repair!`;
  } else {
    // Homepage
    title = `${SITE_NAME} | Expert Appliance Repair in Texas`;
    description = `Professional appliance repair across Texas. 20+ years experience, same-day service, certified technicians. Repair all major brands - refrigerators, washers, dryers & more. Call ${PHONE}!`;
  }
  
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: buildCanonicalUrl(params),
    },
  };
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

function buildCanonicalUrl(params: SEOParams): string {
  const { city, appliance, brand } = params;
  
  let path = '';
  
  if (city && brand && appliance) {
    path = `/${city}/${brand}/${appliance}-repair`;
  } else if (city && brand) {
    path = `/${city}/${brand}-repair`;
  } else if (city && appliance) {
    path = `/${city}/${appliance}-repair`;
  } else if (brand && appliance) {
    path = `/${brand}/${appliance}-repair`;
  } else if (city) {
    path = `/${city}`;
  } else if (brand) {
    path = `/${brand}-repair`;
  } else if (appliance) {
    path = `/${appliance}-repair`;
  } else {
    path = '/';
  }
  
  return `${SITE_URL}${path}`;
}



