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
    totalCities: 41,
    cities: [
      'Algona',
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
      'Pacific',
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
      'Gold Bar',
      'Granite Falls',
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
    totalCities: 19,
    cities: [
      'Auburn',
      'Bonney Lake',
      'Buckley',
      'Dupont',
      'Eatonville',
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
  },
  {
    name: 'Whatcom County',
    slug: 'whatcom-county',
    description: 'Serving Whatcom County including Bellingham, Lynden, Ferndale, and Blaine',
    totalCities: 4,
    cities: [
      'Bellingham',
      'Blaine',
      'Ferndale',
      'Lynden'
    ]
  },
  {
    name: 'Skagit County',
    slug: 'skagit-county',
    description: 'Serving Skagit County including Mount Vernon, Burlington, Anacortes, and Sedro-Woolley',
    totalCities: 4,
    cities: [
      'Anacortes',
      'Burlington',
      'Mount Vernon',
      'Sedro-Woolley'
    ]
  },
  {
    name: 'Island County',
    slug: 'island-county',
    description: 'Serving Island County including Oak Harbor and Coupeville',
    totalCities: 2,
    cities: [
      'Coupeville',
      'Oak Harbor'
    ]
  },
  {
    name: 'Clallam County',
    slug: 'clallam-county',
    description: 'Serving Clallam County on the Olympic Peninsula including Port Angeles, Sequim, and Forks',
    totalCities: 3,
    cities: [
      'Forks',
      'Port Angeles',
      'Sequim'
    ]
  },
  {
    name: 'Jefferson County',
    slug: 'jefferson-county',
    description: 'Serving Jefferson County including Port Townsend',
    totalCities: 1,
    cities: [
      'Port Townsend'
    ]
  },
  {
    name: 'Grays Harbor County',
    slug: 'grays-harbor-county',
    description: 'Serving Grays Harbor County including Aberdeen, Hoquiam, Ocean Shores, and surrounding towns',
    totalCities: 7,
    cities: [
      'Aberdeen',
      'Elma',
      'Hoquiam',
      'McCleary',
      'Montesano',
      'Ocean Shores',
      'Westport'
    ]
  },
  {
    name: 'Pacific County',
    slug: 'pacific-county',
    description: 'Serving Pacific County including Raymond',
    totalCities: 1,
    cities: [
      'Raymond'
    ]
  },
  {
    name: 'Lewis County',
    slug: 'lewis-county',
    description: 'Serving Lewis County including Centralia, Chehalis, Napavine, and Winlock',
    totalCities: 4,
    cities: [
      'Centralia',
      'Chehalis',
      'Napavine',
      'Winlock'
    ]
  },
  {
    name: 'Cowlitz County',
    slug: 'cowlitz-county',
    description: 'Serving Cowlitz County including Longview and Kelso',
    totalCities: 2,
    cities: [
      'Kelso',
      'Longview'
    ]
  },
  {
    name: 'Mason County',
    slug: 'mason-county',
    description: 'Serving Mason County including Shelton',
    totalCities: 1,
    cities: [
      'Shelton'
    ]
  },
  {
    name: 'Thurston County',
    slug: 'thurston-county',
    description: 'Serving Thurston County including Olympia, Lacey, Tumwater, and surrounding cities',
    totalCities: 5,
    cities: [
      'Lacey',
      'Olympia',
      'Tenino',
      'Tumwater',
      'Yelm'
    ]
  },
  {
    name: 'Chelan County',
    slug: 'chelan-county',
    description: 'Serving Chelan County in Central Washington including Wenatchee and Leavenworth',
    totalCities: 2,
    cities: [
      'Leavenworth',
      'Wenatchee'
    ]
  },
  {
    name: 'Douglas County',
    slug: 'douglas-county',
    description: 'Serving Douglas County in Central Washington including East Wenatchee',
    totalCities: 1,
    cities: [
      'East Wenatchee'
    ]
  },
  {
    name: 'Kittitas County',
    slug: 'kittitas-county',
    description: 'Serving Kittitas County in Central Washington including Ellensburg and Cle Elum',
    totalCities: 2,
    cities: [
      'Cle Elum',
      'Ellensburg'
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
