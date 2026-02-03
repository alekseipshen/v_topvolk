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
// CITY MAPPING (Texas cities - Houston, Dallas, Austin, San Antonio areas)
// ============================================
// Total cities: 230 (227 Texas + 3 test cities)
const CITY_NAME_TO_SLUG: Record<string, string> = {
  // Houston Area
  'Aldine': 'aldine',
  'Alvin': 'alvin',
  'Angleton': 'angleton',
  'Atascocita': 'atascocita',
  'Baytown': 'baytown',
  'Bellaire': 'bellaire',
  'Channelview': 'channelview',
  'Cinco Ranch': 'cinco-ranch',
  'Clute': 'clute',
  'Conroe': 'conroe',
  'Cypress': 'cypress',
  'Deer Park': 'deer-park',
  'Dickinson': 'dickinson',
  'Freeport': 'freeport',
  'Fresno': 'fresno',
  'Friendswood': 'friendswood',
  'Fulshear': 'fulshear',
  'Galena Park': 'galena-park',
  'Galveston': 'galveston',
  'Houston': 'houston',
  'Humble': 'humble',
  'Jacinto City': 'jacinto-city',
  'Katy': 'katy',
  'La Marque': 'la-marque',
  'La Porte': 'la-porte',
  'Lake Jackson': 'lake-jackson',
  'League City': 'league-city',
  'Mission Bend': 'mission-bend',
  'Missouri City': 'missouri-city',
  'Pasadena': 'pasadena',
  'Pearland': 'pearland',
  'Pecan Grove': 'pecan-grove',
  'Richmond': 'richmond',
  'Rosenberg': 'rosenberg',
  'Santa Fe': 'santa-fe',
  'Seabrook': 'seabrook',
  'Sienna Plantation': 'sienna-plantation',
  'South Houston': 'south-houston',
  'Spring': 'spring',
  'Stafford': 'stafford',
  'Sugar Land': 'sugar-land',
  'Texas City': 'texas-city',
  'Tomball': 'tomball',
  'Webster': 'webster',
  'The Woodlands': 'the-woodlands',
  
  // Dallas-Fort Worth Area
  'Dallas': 'dallas',
  'Irving': 'irving',
  'Garland': 'garland',
  'Grand Prairie': 'grand-prairie',
  'Mesquite': 'mesquite',
  'Carrollton': 'carrollton',
  'Richardson': 'richardson',
  'Rowlett': 'rowlett',
  'DeSoto': 'desoto',
  'Cedar Hill': 'cedar-hill',
  'Duncanville': 'duncanville',
  'Lancaster': 'lancaster',
  'Balch Springs': 'balch-springs',
  'Wilmer': 'wilmer',
  'Hutchins': 'hutchins',
  'Seagoville': 'seagoville',
  'Farmers Branch': 'farmers-branch',
  'Coppell': 'coppell',
  'Addison': 'addison',
  'University Park': 'university-park',
  'Highland Park': 'highland-park',
  'Sachse': 'sachse',
  'Fort Worth': 'fort-worth',
  'Arlington': 'arlington',
  'Mansfield': 'mansfield',
  'North Richland Hills': 'north-richland-hills',
  'Euless': 'euless',
  'Grapevine': 'grapevine',
  'Bedford': 'bedford',
  'Keller': 'keller',
  'Haltom City': 'haltom-city',
  'Hurst': 'hurst',
  'Colleyville': 'colleyville',
  'Southlake': 'southlake',
  'Watauga': 'watauga',
  'Richland Hills': 'richland-hills',
  'Forest Hill': 'forest-hill',
  'Benbrook': 'benbrook',
  'White Settlement': 'white-settlement',
  'Azle': 'azle',
  'Saginaw': 'saginaw',
  'Crowley': 'crowley',
  'Plano': 'plano',
  'Frisco': 'frisco',
  'McKinney': 'mckinney',
  'Allen': 'allen',
  'Wylie': 'wylie',
  'Prosper': 'prosper',
  'Princeton': 'princeton',
  'Anna': 'anna',
  'Melissa': 'melissa',
  'Murphy': 'murphy',
  'Celina': 'celina',
  'Fairview': 'fairview',
  'Lucas': 'lucas',
  'Parker': 'parker',
  'Denton': 'denton',
  'Lewisville': 'lewisville',
  'Flower Mound': 'flower-mound',
  'Little Elm': 'little-elm',
  'The Colony': 'the-colony',
  'Corinth': 'corinth',
  'Highland Village': 'highland-village',
  'Trophy Club': 'trophy-club',
  'Lake Dallas': 'lake-dallas',
  'Hickory Creek': 'hickory-creek',
  'Argyle': 'argyle',
  'Roanoke': 'roanoke',
  'Aubrey': 'aubrey',
  'Pilot Point': 'pilot-point',
  
  // Austin Area
  'Austin': 'austin',
  'Bee Cave': 'bee-cave',
  'Lakeway': 'lakeway',
  'Lago Vista': 'lago-vista',
  'Manor': 'manor',
  'Pflugerville': 'pflugerville',
  'West Lake Hills': 'west-lake-hills',
  'Rollingwood': 'rollingwood',
  'Sunset Valley': 'sunset-valley',
  'Liberty Hill': 'liberty-hill',
  'Leander': 'leander',
  'Georgetown': 'georgetown',
  'Hutto': 'hutto',
  'Round Rock': 'round-rock',
  'Cedar Park': 'cedar-park',
  'Taylor': 'taylor',
  'Jarrell': 'jarrell',
  'Florence': 'florence',
  'Buda': 'buda',
  'Kyle': 'kyle',
  'Dripping Springs': 'dripping-springs',
  'San Marcos': 'san-marcos',
  'Wimberley': 'wimberley',
  'Cedar Creek': 'cedar-creek',
  'Elgin': 'elgin',
  
  // San Antonio Area
  'San Antonio': 'san-antonio',
  'Alamo Heights': 'alamo-heights',
  'Balcones Heights': 'balcones-heights',
  'Castle Hills': 'castle-hills',
  'China Grove': 'china-grove',
  'Converse': 'converse',
  'Cross Mountain': 'cross-mountain',
  'Fair Oaks Ranch': 'fair-oaks-ranch',
  'Grey Forest': 'grey-forest',
  'Helotes': 'helotes',
  'Hill Country Village': 'hill-country-village',
  'Hollywood Park': 'hollywood-park',
  'Kirby': 'kirby',
  'Leon Valley': 'leon-valley',
  'Live Oak': 'live-oak',
  'Losoya': 'losoya',
  'Lytle': 'lytle',
  'Macdona': 'macdona',
  'Olmos Park': 'olmos-park',
  'Randolph AFB': 'randolph-afb',
  'Schertz': 'schertz',
  'Selma': 'selma',
  'Shavano Park': 'shavano-park',
  'Somerset': 'somerset',
  'St. Hedwig': 'st-hedwig',
  'Terrell Hills': 'terrell-hills',
  'Universal City': 'universal-city',
  'Von Ormy': 'von-ormy',
  'Windcrest': 'windcrest',
  
  // TEST CITIES (for debugging/testing from outside USA)
  'Tel Aviv': 'tel-aviv-test',
  'Tel Aviv-Yafo': 'tel-aviv-test',
  'Limassol': 'limassol-test',
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
  
  let fallbackCitySlug = 'houston'; // Default fallback
  
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
