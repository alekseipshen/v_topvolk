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
    totalCities: 39,
    cities: [
      'Auburn',
      'Beaux Arts Village',
      'Bellevue',
      'Black Diamond',
      'Bothell',
      'Burien',
      'Carnation',
      'Clyde Hill',
      'Covington',
      'Des Moines',
      'Duvall',
      'Enumclaw',
      'Fall City',
      'Federal Way',
      'Hunts Point',
      'Issaquah',
      'Kenmore',
      'Kent',
      'Kirkland',
      'Lake Forest Park',
      'Maple Valley',
      'Medina',
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
      'White Center',
      'Woodinville',
      'Yarrow Point'
    ]
  },
  {
    name: 'Snohomish County',
    slug: 'snohomish-county',
    description: 'Professional renovation services throughout Snohomish County including Everett, Lynnwood, and Edmonds',
    totalCities: 15,
    cities: [
      'Arlington',
      'Bothell',
      'Brier',
      'Edmonds',
      'Everett',
      'Lake Stevens',
      'Lynnwood',
      'Marysville',
      'Mill Creek',
      'Monroe',
      'Mountlake Terrace',
      'Mukilteo',
      'Snohomish',
      'Stanwood',
      'Sultan'
    ]
  },
  {
    name: 'Pierce County',
    slug: 'pierce-county',
    description: 'Quality construction services across Pierce County including Tacoma, Puyallup, and Lakewood',
    totalCities: 18,
    cities: [
      'Auburn',
      'Bonney Lake',
      'Buckley',
      'Dupont',
      'Edgewood',
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
  },
  {
    name: 'Kitsap County',
    slug: 'kitsap-county',
    description: 'Serving Kitsap County including Bremerton, Poulsbo, and Bainbridge Island',
    totalCities: 5,
    cities: [
      'Bainbridge Island',
      'Bremerton',
      'Poulsbo',
      'Port Orchard',
      'Silverdale'
    ]
  }
];

// Helper function to get all unique cities
export interface City {
  name: string;
  slug: string;
}

export function getAllCities(): City[] {
  const allCities = new Set<string>();
  seattleCounties.forEach(county => {
    county.cities.forEach(city => allCities.add(city));
  });
  return Array.from(allCities).sort().map(city => ({
    name: city,
    slug: city.toLowerCase().replace(/\s+/g, '-')
  }));
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
