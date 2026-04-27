// Edge Middleware for Google Ads Geolocation
// File: /middleware.ts (root of project)
// Purpose: Intercept ad traffic and rewrite URLs to city-specific service pages
// URL structure: /services/[service] → /services/[service]/[city]

import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export const config = {
  matcher: [
    '/services/:service',
    '/services/:service/:city',
  ],
};

// ============================================
// CITY MAPPING (Seattle Metro Area — King, Snohomish, Pierce, Kitsap)
// ============================================
// Inlined because Edge Runtime restricts imports
const CITY_NAME_TO_SLUG: Record<string, string> = {
  // King County
  'Auburn': 'auburn',
  'Beaux Arts Village': 'beaux-arts-village',
  'Bellevue': 'bellevue',
  'Black Diamond': 'black-diamond',
  'Bothell': 'bothell',
  'Burien': 'burien',
  'Carnation': 'carnation',
  'Clyde Hill': 'clyde-hill',
  'Covington': 'covington',
  'Des Moines': 'des-moines',
  'Duvall': 'duvall',
  'Enumclaw': 'enumclaw',
  'Fall City': 'fall-city',
  'Federal Way': 'federal-way',
  'Hunts Point': 'hunts-point',
  'Issaquah': 'issaquah',
  'Kenmore': 'kenmore',
  'Kent': 'kent',
  'Kirkland': 'kirkland',
  'Lake Forest Park': 'lake-forest-park',
  'Maple Valley': 'maple-valley',
  'Medina': 'medina',
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
  'White Center': 'white-center',
  'Woodinville': 'woodinville',
  'Yarrow Point': 'yarrow-point',

  // Snohomish County
  'Arlington': 'arlington',
  'Brier': 'brier',
  'Edmonds': 'edmonds',
  'Everett': 'everett',
  'Lake Stevens': 'lake-stevens',
  'Lynnwood': 'lynnwood',
  'Marysville': 'marysville',
  'Mill Creek': 'mill-creek',
  'Monroe': 'monroe',
  'Mountlake Terrace': 'mountlake-terrace',
  'Mukilteo': 'mukilteo',
  'Snohomish': 'snohomish',
  'Stanwood': 'stanwood',
  'Sultan': 'sultan',

  // Pierce County
  'Bonney Lake': 'bonney-lake',
  'Buckley': 'buckley',
  'Dupont': 'dupont',
  'Edgewood': 'edgewood',
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

  // Kitsap County
  'Bainbridge Island': 'bainbridge-island',
  'Bremerton': 'bremerton',
  'Poulsbo': 'poulsbo',
  'Port Orchard': 'port-orchard',
  'Silverdale': 'silverdale',
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ============================================
  // STEP 1: Check if this is ad traffic
  // ============================================

  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');

  // If NOT ad traffic → pass through
  if (utmSource !== 'google' || utmMedium !== 'cpc') {
    return NextResponse.next();
  }

  // ============================================
  // STEP 2: Get user's geolocation
  // ============================================

  const geo = geolocation(request);
  const cityName = geo.city;

  console.log('[GEO-MIDDLEWARE] Detected location:', {
    city: cityName,
    region: geo.region,
    country: geo.country,
  });

  // ============================================
  // STEP 3: Map city name to slug
  // ============================================

  let citySlug: string | null = null;

  if (cityName) {
    // Exact match
    citySlug = CITY_NAME_TO_SLUG[cityName] || null;

    // Case-insensitive fallback
    if (!citySlug) {
      const cityNameLower = cityName.toLowerCase();
      const matchedKey = Object.keys(CITY_NAME_TO_SLUG).find(
        key => key.toLowerCase() === cityNameLower
      );
      if (matchedKey) {
        citySlug = CITY_NAME_TO_SLUG[matchedKey];
      }
    }
  }

  // If city not in our service area → don't rewrite
  // User sees base /services/[service] page with "Seattle Area" headline
  if (!citySlug) {
    console.log('[GEO-MIDDLEWARE] City not found, passing through to base service page');
    return NextResponse.next();
  }

  // ============================================
  // STEP 4: Rewrite URL to add/update city
  // ============================================

  let newPathname = pathname;

  // Pattern 1: /services/[service] → /services/[service]/[city]
  const serviceOnlyMatch = pathname.match(/^\/services\/([^\/]+)$/);
  if (serviceOnlyMatch) {
    newPathname = `/services/${serviceOnlyMatch[1]}/${citySlug}`;
  }

  // Pattern 2: /services/[service]/[old-city] → /services/[service]/[detected-city]
  const serviceCityMatch = pathname.match(/^\/services\/([^\/]+)\/([^\/]+)$/);
  if (serviceCityMatch) {
    newPathname = `/services/${serviceCityMatch[1]}/${citySlug}`;
  }

  // If URL didn't change → pass through
  if (newPathname === pathname) {
    return NextResponse.next();
  }

  // ============================================
  // STEP 5: Rewrite request (internal, invisible to user)
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
