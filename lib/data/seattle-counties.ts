// Seattle Area Counties and Cities
// Service areas for TopVolk Construction LLC

export interface County {
  name: string;
  slug: string;
  description: string;
  totalCities: number;
  cities: string[];
}

export const seattleCounties: County[] = [
  {
    name: 'King County',
    slug: 'king-county',
    description: 'Serving all cities in King County including Seattle, Bellevue, Redmond, and surrounding areas',
    totalCities: 31,
    cities: [
      'Auburn',
      'Bellevue',
      'Black Diamond',
      'Bothell',
      'Burien',
      'Carnation',
      'Covington',
      'Des Moines',
      'Duvall',
      'Enumclaw',
      'Federal Way',
      'Issaquah',
      'Kent',
      'Kirkland',
      'Lake Forest Park',
      'Maple Valley',
      'Mercer Island',
      'Milton',
      'Newcastle',
      'Normandy Park',
      'North Bend',
      'Redmond',
      'Renton',
      'Sammamish',
      'SeaTac',
      'Seattle',
      'Shoreline',
      'Skykomish',
      'Snoqualmie',
      'Tukwila',
      'Woodinville'
    ]
  },
  {
    name: 'Snohomish County',
    slug: 'snohomish-county',
    description: 'Professional renovation services throughout Snohomish County including Everett, Lynnwood, and Edmonds',
    totalCities: 11,
    cities: [
      'Bothell',
      'Brier',
      'Edmonds',
      'Everett',
      'Lake Stevens',
      'Lynnwood',
      'Mill Creek',
      'Mountlake Terrace',
      'Mukilteo',
      'Snohomish',
      'Stanwood'
    ]
  },
  {
    name: 'Pierce County',
    slug: 'pierce-county',
    description: 'Quality construction services across Pierce County including Tacoma, Puyallup, and Lakewood',
    totalCities: 17,
    cities: [
      'Auburn',
      'Bonney Lake',
      'Buckley',
      'Dupont',
      'Fife',
      'Fircrest',
      'Gig Harbor',
      'Lakewood',
      'Milton',
      'Orting',
      'Puyallup',
      'South Prairie',
      'Steilacoom',
      'Sumner',
      'Tacoma',
      'University Place',
      'Wilkeson'
    ]
  }
];

// Helper function to get all unique cities
export function getAllCities(): string[] {
  const allCities = new Set<string>();
  seattleCounties.forEach(county => {
    county.cities.forEach(city => allCities.add(city));
  });
  return Array.from(allCities).sort();
}

// Helper function to get counties for a specific city
export function getCountiesForCity(cityName: string): County[] {
  return seattleCounties.filter(county => 
    county.cities.some(city => city.toLowerCase() === cityName.toLowerCase())
  );
}

// Get total service area stats
export function getServiceAreaStats() {
  const uniqueCities = getAllCities();
  return {
    totalCounties: seattleCounties.length,
    totalCities: uniqueCities.length,
    counties: seattleCounties.map(c => ({
      name: c.name,
      cities: c.totalCities
    }))
  };
}
