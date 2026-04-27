// Seattle Metro Area cities by county

export interface City {
  slug: string;
  name: string;
  county: string;
}

export function getCitiesByCounty(countySlug: string): City[] {
  return cities.filter(city => city.county === countySlug);
}

export const cities: City[] = [
  // King County
  { slug: 'seattle', name: 'Seattle', county: 'king-county' },
  { slug: 'bellevue', name: 'Bellevue', county: 'king-county' },
  { slug: 'kirkland', name: 'Kirkland', county: 'king-county' },
  { slug: 'redmond', name: 'Redmond', county: 'king-county' },
  { slug: 'renton', name: 'Renton', county: 'king-county' },
  { slug: 'kent', name: 'Kent', county: 'king-county' },
  { slug: 'auburn', name: 'Auburn', county: 'king-county' },
  { slug: 'federal-way', name: 'Federal Way', county: 'king-county' },
  { slug: 'sammamish', name: 'Sammamish', county: 'king-county' },
  { slug: 'issaquah', name: 'Issaquah', county: 'king-county' },
  { slug: 'burien', name: 'Burien', county: 'king-county' },
  { slug: 'tukwila', name: 'Tukwila', county: 'king-county' },
  { slug: 'seatac', name: 'SeaTac', county: 'king-county' },
  { slug: 'mercer-island', name: 'Mercer Island', county: 'king-county' },
  { slug: 'woodinville', name: 'Woodinville', county: 'king-county' },
  { slug: 'bothell', name: 'Bothell', county: 'king-county' },
  { slug: 'kenmore', name: 'Kenmore', county: 'king-county' },
  { slug: 'shoreline', name: 'Shoreline', county: 'king-county' },
  { slug: 'lake-forest-park', name: 'Lake Forest Park', county: 'king-county' },
  { slug: 'maple-valley', name: 'Maple Valley', county: 'king-county' },
  { slug: 'covington', name: 'Covington', county: 'king-county' },
  { slug: 'newcastle', name: 'Newcastle', county: 'king-county' },
  { slug: 'des-moines', name: 'Des Moines', county: 'king-county' },
  { slug: 'normandy-park', name: 'Normandy Park', county: 'king-county' },
  { slug: 'black-diamond', name: 'Black Diamond', county: 'king-county' },
  { slug: 'snoqualmie', name: 'Snoqualmie', county: 'king-county' },
  { slug: 'north-bend', name: 'North Bend', county: 'king-county' },
  { slug: 'fall-city', name: 'Fall City', county: 'king-county' },
  { slug: 'enumclaw', name: 'Enumclaw', county: 'king-county' },
  { slug: 'white-center', name: 'White Center', county: 'king-county' },
  { slug: 'clyde-hill', name: 'Clyde Hill', county: 'king-county' },
  { slug: 'medina', name: 'Medina', county: 'king-county' },
  { slug: 'yarrow-point', name: 'Yarrow Point', county: 'king-county' },
  { slug: 'hunts-point', name: 'Hunts Point', county: 'king-county' },
  { slug: 'beaux-arts-village', name: 'Beaux Arts Village', county: 'king-county' },

  // Snohomish County
  { slug: 'everett', name: 'Everett', county: 'snohomish-county' },
  { slug: 'lynnwood', name: 'Lynnwood', county: 'snohomish-county' },
  { slug: 'edmonds', name: 'Edmonds', county: 'snohomish-county' },
  { slug: 'mountlake-terrace', name: 'Mountlake Terrace', county: 'snohomish-county' },
  { slug: 'mukilteo', name: 'Mukilteo', county: 'snohomish-county' },
  { slug: 'marysville', name: 'Marysville', county: 'snohomish-county' },
  { slug: 'lake-stevens', name: 'Lake Stevens', county: 'snohomish-county' },
  { slug: 'snohomish', name: 'Snohomish', county: 'snohomish-county' },
  { slug: 'mill-creek', name: 'Mill Creek', county: 'snohomish-county' },
  { slug: 'arlington', name: 'Arlington', county: 'snohomish-county' },
  { slug: 'stanwood', name: 'Stanwood', county: 'snohomish-county' },
  { slug: 'monroe', name: 'Monroe', county: 'snohomish-county' },
  { slug: 'sultan', name: 'Sultan', county: 'snohomish-county' },

  // Pierce County
  { slug: 'tacoma', name: 'Tacoma', county: 'pierce-county' },
  { slug: 'lakewood', name: 'Lakewood', county: 'pierce-county' },
  { slug: 'puyallup', name: 'Puyallup', county: 'pierce-county' },
  { slug: 'university-place', name: 'University Place', county: 'pierce-county' },
  { slug: 'bonney-lake', name: 'Bonney Lake', county: 'pierce-county' },
  { slug: 'gig-harbor', name: 'Gig Harbor', county: 'pierce-county' },
  { slug: 'edgewood', name: 'Edgewood', county: 'pierce-county' },
  { slug: 'fircrest', name: 'Fircrest', county: 'pierce-county' },
  { slug: 'sumner', name: 'Sumner', county: 'pierce-county' },
  { slug: 'orting', name: 'Orting', county: 'pierce-county' },
  { slug: 'steilacoom', name: 'Steilacoom', county: 'pierce-county' },
  { slug: 'dupont', name: 'DuPont', county: 'pierce-county' },

  // Kitsap County
  { slug: 'bremerton', name: 'Bremerton', county: 'kitsap-county' },
  { slug: 'silverdale', name: 'Silverdale', county: 'kitsap-county' },
  { slug: 'poulsbo', name: 'Poulsbo', county: 'kitsap-county' },
  { slug: 'bainbridge-island', name: 'Bainbridge Island', county: 'kitsap-county' },
  { slug: 'port-orchard', name: 'Port Orchard', county: 'kitsap-county' },
];
