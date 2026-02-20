// Edge Middleware for Google Ads Geolocation
// File: /middleware.ts (root of project)
// Purpose: Intercept ad traffic and rewrite URLs to add city-specific path

import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export const config = {
  matcher: [
    '/services/:path*',
    '/brands/:path*',
    '/cities/:city*/services/:path*',
    '/cities/:city*/brands/:path*',
  ],
};

// ============================================
// CITY MAPPING (Seattle area - King, Snohomish, Pierce Counties)
// ============================================
// Total cities: 56 unique (from seattle-counties.ts)
const CITY_NAME_TO_SLUG: Record<string, string> = {
  // King County (31 cities)
  'Auburn': 'auburn',
  'Bellevue': 'bellevue',
  'Black Diamond': 'black-diamond',
  'Bothell': 'bothell',
  'Burien': 'burien',
  'Carnation': 'carnation',
  'Covington': 'covington',
  'Des Moines': 'des-moines',
  'Duvall': 'duvall',
  'Enumclaw': 'enumclaw',
  'Federal Way': 'federal-way',
  'Issaquah': 'issaquah',
  'Kent': 'kent',
  'Kirkland': 'kirkland',
  'Lake Forest Park': 'lake-forest-park',
  'Maple Valley': 'maple-valley',
  'Mercer Island': 'mercer-island',
  'Milton': 'milton',
  'Newcastle': 'newcastle',
  'Normandy Park': 'normandy-park',
  'North Bend': 'north-bend',
  'Redmond': 'redmond',
  'Renton': 'renton',
  'Sammamish': 'sammamish',
  'SeaTac': 'seatac',
  'Seattle': 'seattle',
  'Shoreline': 'shoreline',
  'Skykomish': 'skykomish',
  'Snoqualmie': 'snoqualmie',
  'Tukwila': 'tukwila',
  'Woodinville': 'woodinville',

  // Snohomish County (11 cities, Bothell already listed above)
  'Brier': 'brier',
  'Edmonds': 'edmonds',
  'Everett': 'everett',
  'Lake Stevens': 'lake-stevens',
  'Lynnwood': 'lynnwood',
  'Mill Creek': 'mill-creek',
  'Mountlake Terrace': 'mountlake-terrace',
  'Mukilteo': 'mukilteo',
  'Snohomish': 'snohomish',
  'Stanwood': 'stanwood',

  // Pierce County (17 cities, Auburn/Milton already listed above)
  'Bonney Lake': 'bonney-lake',
  'Buckley': 'buckley',
  'Dupont': 'dupont',
  'Fife': 'fife',
  'Fircrest': 'fircrest',
  'Gig Harbor': 'gig-harbor',
  'Lakewood': 'lakewood',
  'Orting': 'orting',
  'Puyallup': 'puyallup',
  'South Prairie': 'south-prairie',
  'Steilacoom': 'steilacoom',
  'Sumner': 'sumner',
  'Tacoma': 'tacoma',
  'University Place': 'university-place',
  'Wilkeson': 'wilkeson',
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  
  // ============================================
  // STEP 1: Check if this is ad traffic
  // ============================================
  
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  
  // If NOT ad traffic → pass through (do nothing)
  if (utmSource !== 'google' || utmMedium !== 'cpc') {
    return NextResponse.next();
  }
  
  // ============================================
  // STEP 2: Extract fallback city from URL (if already has /cities/[city])
  // ============================================
  
  let fallbackCitySlug = 'seattle'; // Default fallback
  
  // Check if URL already contains /cities/[city]/...
  const citiesMatch = pathname.match(/^\/cities\/([^\/]+)/);
  if (citiesMatch) {
    fallbackCitySlug = citiesMatch[1];
  }
  
  // ============================================
  // STEP 3: Get user's geolocation
  // ============================================
  
  const geo = geolocation(request);
  const cityName = geo.city;
  
  // Log for debugging
  console.log('[GEO-MIDDLEWARE] Detected location:', {
    city: cityName,
    region: geo.region,
    country: geo.country,
    fallback: fallbackCitySlug,
  });
  
  // ============================================
  // STEP 4: Map city name to slug
  // ============================================
  
  let citySlug = fallbackCitySlug;
  
  // If geolocation detected a city, try to use it
  if (cityName) {
    let detectedSlug = CITY_NAME_TO_SLUG[cityName];
    
    // Try case-insensitive if not found
    if (!detectedSlug) {
      const cityNameLower = cityName.toLowerCase();
      const matchedKey = Object.keys(CITY_NAME_TO_SLUG).find(
        key => key.toLowerCase() === cityNameLower
      );
      if (matchedKey) {
        detectedSlug = CITY_NAME_TO_SLUG[matchedKey];
      }
    }
    
    // If city found in our service area → use it
    if (detectedSlug) {
      console.log('[GEO-MIDDLEWARE] Using detected city:', detectedSlug);
      citySlug = detectedSlug;
    } else {
      console.log('[GEO-MIDDLEWARE] City not in service area, using fallback:', fallbackCitySlug);
    }
  } else {
    console.log('[GEO-MIDDLEWARE] No city detected, using fallback:', fallbackCitySlug);
  }
  
  // ============================================
  // STEP 5: Rewrite URL to add/update city path
  // ============================================
  
  let newPathname = pathname;
  
  // Pattern 1: /services/[appliance]-repair
  // → /cities/[city]/services/[appliance]-repair
  if (pathname.match(/^\/services\/.+/)) {
    const servicePath = pathname.replace('/services/', '');
    newPathname = `/cities/${citySlug}/services/${servicePath}`;
  }
  
  // Pattern 2: /brands/[brand]/services/[appliance]-repair
  // → /cities/[city]/brands/[brand]/services/[appliance]-repair
  else if (pathname.match(/^\/brands\/[^\/]+\/services\/.+/)) {
    const brandAndService = pathname.replace('/brands/', '');
    const [brand, , ...rest] = brandAndService.split('/');
    const servicePath = rest.join('/');
    newPathname = `/cities/${citySlug}/brands/${brand}/services/${servicePath}`;
  }
  
  // Pattern 3: /cities/[fallback-city]/services/[appliance]-repair
  // → /cities/[detected-city]/services/[appliance]-repair
  else if (pathname.match(/^\/cities\/[^\/]+\/services\/.+/)) {
    const parts = pathname.split('/');
    parts[2] = citySlug; // Replace city slug
    newPathname = parts.join('/');
  }
  
  // Pattern 4: /cities/[fallback-city]/brands/[brand]/services/[appliance]-repair
  // → /cities/[detected-city]/brands/[brand]/services/[appliance]-repair
  else if (pathname.match(/^\/cities\/[^\/]+\/brands\/[^\/]+\/services\/.+/)) {
    const parts = pathname.split('/');
    parts[2] = citySlug; // Replace city slug
    newPathname = parts.join('/');
  }
  
  // If URL didn't change → pass through
  if (newPathname === pathname) {
    return NextResponse.next();
  }
  
  // ============================================
  // STEP 6: Rewrite request (internal, invisible to user)
  // ============================================
  
  const url = request.nextUrl.clone();
  url.pathname = newPathname;
  
  console.log('[GEO-MIDDLEWARE] Rewrite:', {
    from: pathname,
    to: newPathname,
    detected: cityName || 'none',
    used: citySlug,
  });
  
  return NextResponse.rewrite(url);
}
