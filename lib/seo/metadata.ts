import { Metadata } from 'next';
import { PHONE_DISPLAY, BUSINESS_NAME } from '@/lib/utils';

interface SEOParams {
  city?: string;
  service?: string;
  // Legacy params from programmatic pages (brands/appliances routes)
  brand?: string;
  appliance?: string;
  county?: string;
}

const SITE_NAME = 'TopVolk Construction LLC';
const SITE_URL = 'https://topvolk.org';

export function generatePageMetadata(params: SEOParams): Metadata {
  const { city, service, brand, appliance } = params;
  
  // Map legacy "appliance" param to "service" for backward compatibility
  const effectiveService = service || appliance;
  
  let title = '';
  let description = '';
  
  if (city && brand && effectiveService) {
    const cityName = formatName(city);
    const brandName = formatName(brand);
    const serviceName = formatName(effectiveService);
    title = `${brandName} ${serviceName} in ${cityName}, WA | ${SITE_NAME}`;
    description = `Professional ${brandName} ${serviceName.toLowerCase()} services in ${cityName} and surrounding areas. Licensed contractor since 2017. Call ${PHONE_DISPLAY}!`;
  } else if (city && effectiveService) {
    const cityName = formatName(city);
    const serviceName = formatName(effectiveService);
    title = `${serviceName} in ${cityName}, WA | ${SITE_NAME}`;
    description = `Professional ${serviceName.toLowerCase()} services in ${cityName} and surrounding areas. Licensed contractor since 2017. Call ${PHONE_DISPLAY} for a free estimate!`;
  } else if (brand && effectiveService) {
    const brandName = formatName(brand);
    const serviceName = formatName(effectiveService);
    title = `${brandName} ${serviceName} | Seattle Area | ${SITE_NAME}`;
    description = `Professional ${brandName} ${serviceName.toLowerCase()} services in Seattle, Bellevue, Tacoma. Licensed contractor with 100+ projects. Call ${PHONE_DISPLAY}!`;
  } else if (city) {
    const cityName = formatName(city);
    title = `Home Renovation in ${cityName}, WA | ${SITE_NAME}`;
    description = `Professional home renovation services in ${cityName} and nearby areas. Kitchen remodels, bathroom renovations, deck installations. Call ${PHONE_DISPLAY}!`;
  } else if (brand) {
    const brandName = formatName(brand);
    title = `${brandName} Services | Seattle Area | ${SITE_NAME}`;
    description = `Professional ${brandName} services in Seattle, Bellevue, Tacoma and surrounding areas. Licensed contractor. Call ${PHONE_DISPLAY}!`;
  } else if (effectiveService) {
    const serviceName = formatName(effectiveService);
    title = `${serviceName} | Seattle Area | ${SITE_NAME}`;
    description = `Expert ${serviceName.toLowerCase()} services in Seattle, Bellevue, Tacoma and surrounding areas. Licensed contractor with 100+ projects. Call ${PHONE_DISPLAY}!`;
  } else {
    title = `${SITE_NAME} | Professional Home Renovation in Seattle`;
    description = `Expert home renovation services in Seattle area. Kitchen remodels, bathroom renovations, deck installations. Licensed contractor since 2017. Call ${PHONE_DISPLAY}!`;
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

function formatName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildCanonicalUrl(params: SEOParams): string {
  const { city, service, brand, appliance } = params;
  const effectiveService = service || appliance;
  
  let path = '';
  
  if (city && brand && effectiveService) {
    path = `/cities/${city}/brands/${brand}/services/${effectiveService}`;
  } else if (city && effectiveService) {
    path = `/cities/${city}/services/${effectiveService}`;
  } else if (brand && effectiveService) {
    path = `/brands/${brand}/services/${effectiveService}`;
  } else if (brand) {
    path = `/brands/${brand}`;
  } else if (city && service) {
    path = `/services/${service}/${city}`;
  } else if (effectiveService) {
    path = `/services/${effectiveService}`;
  } else if (city) {
    path = `/cities/${city}`;
  } else {
    path = '/';
  }
  
  return `${SITE_URL}${path}`;
}
