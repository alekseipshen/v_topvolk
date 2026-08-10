// Latitude/longitude for every city we serve.
// Source: U.S. Census Bureau 2024 Gazetteer, places file for Washington
// (www2.census.gov/geo/docs/maps-data/data/gazetteer/2024_Gazetteer/2024_gaz_place_53.txt).
//
// Used to order the "nearby cities" links by real distance. Before this the list
// was the first eight cities alphabetically, so a Bellevue page pointed visitors
// at Aberdeen and Anacortes.

export interface CityPoint {
  lat: number;
  lng: number;
}

export const cityCoords: Record<string, CityPoint> = {
  'aberdeen': { lat: 46.975205, lng: -123.811373 },
  'algona': { lat: 47.281987, lng: -122.250467 },
  'anacortes': { lat: 48.488725, lng: -122.62398 },
  'arlington': { lat: 48.170372, lng: -122.144553 },
  'auburn': { lat: 47.303773, lng: -122.21 },
  'bainbridge-island': { lat: 47.642487, lng: -122.507764 },
  'beaux-arts-village': { lat: 47.585343, lng: -122.203646 },
  'bellevue': { lat: 47.597837, lng: -122.15648 },
  'bellingham': { lat: 48.753442, lng: -122.470179 },
  'black-diamond': { lat: 47.314748, lng: -122.017685 },
  'blaine': { lat: 48.98719, lng: -122.74877 },
  'bonney-lake': { lat: 47.199502, lng: -122.163032 },
  'bothell': { lat: 47.773531, lng: -122.204376 },
  'bremerton': { lat: 47.539877, lng: -122.717048 },
  'brier': { lat: 47.792388, lng: -122.273432 },
  'buckley': { lat: 47.162239, lng: -122.020272 },
  'burien': { lat: 47.475605, lng: -122.344661 },
  'burlington': { lat: 48.466355, lng: -122.328882 },
  'carnation': { lat: 47.644188, lng: -121.90067 },
  'centralia': { lat: 46.72205, lng: -122.970947 },
  'chehalis': { lat: 46.664176, lng: -122.965425 },
  'cle-elum': { lat: 47.194638, lng: -120.952843 },
  'clyde-hill': { lat: 47.630354, lng: -122.217983 },
  'coupeville': { lat: 48.218795, lng: -122.679466 },
  'covington': { lat: 47.364793, lng: -122.104561 },
  'des-moines': { lat: 47.388708, lng: -122.317581 },
  'dupont': { lat: 47.107351, lng: -122.647576 },
  'duvall': { lat: 47.735512, lng: -121.972224 },
  'east-wenatchee': { lat: 47.41745, lng: -120.283798 },
  'eatonville': { lat: 46.868224, lng: -122.269568 },
  'edgewood': { lat: 47.232074, lng: -122.285729 },
  'edmonds': { lat: 47.813604, lng: -122.35333 },
  'ellensburg': { lat: 47.000124, lng: -120.54954 },
  'elma': { lat: 47.005223, lng: -123.410773 },
  'enumclaw': { lat: 47.202179, lng: -121.988976 },
  'everett': { lat: 47.965413, lng: -122.189895 },
  'fall-city': { lat: 47.569379, lng: -121.913697 },
  'federal-way': { lat: 47.311596, lng: -122.337757 },
  'ferndale': { lat: 48.853366, lng: -122.590232 },
  'fife': { lat: 47.232293, lng: -122.350611 },
  'fircrest': { lat: 47.230716, lng: -122.515704 },
  'forks': { lat: 47.952801, lng: -124.390294 },
  'gig-harbor': { lat: 47.338378, lng: -122.600753 },
  'gold-bar': { lat: 47.856335, lng: -121.692006 },
  'granite-falls': { lat: 48.089605, lng: -121.969206 },
  'hoquiam': { lat: 46.977202, lng: -123.909716 },
  'hunts-point': { lat: 47.642958, lng: -122.229197 },
  'issaquah': { lat: 47.544488, lng: -122.049085 },
  'kelso': { lat: 46.116751, lng: -122.886466 },
  'kenmore': { lat: 47.749858, lng: -122.247244 },
  'kent': { lat: 47.38797, lng: -122.212727 },
  'kirkland': { lat: 47.696658, lng: -122.20417 },
  'lacey': { lat: 47.043087, lng: -122.798232 },
  'lake-forest-park': { lat: 47.758911, lng: -122.291729 },
  'lake-stevens': { lat: 48.003405, lng: -122.096828 },
  'lakewood': { lat: 47.164092, lng: -122.528106 },
  'leavenworth': { lat: 47.594704, lng: -120.663913 },
  'longview': { lat: 46.145707, lng: -122.964299 },
  'lynden': { lat: 48.94992, lng: -122.454803 },
  'lynnwood': { lat: 47.828979, lng: -122.300672 },
  'maple-valley': { lat: 47.367147, lng: -122.034815 },
  'marysville': { lat: 48.080214, lng: -122.154312 },
  'mccleary': { lat: 47.058457, lng: -123.269646 },
  'medina': { lat: 47.626541, lng: -122.242866 },
  'mercer-island': { lat: 47.564004, lng: -122.231214 },
  'mill-creek': { lat: 47.865188, lng: -122.210598 },
  'milton': { lat: 47.251994, lng: -122.317289 },
  'monroe': { lat: 47.859793, lng: -121.984006 },
  'montesano': { lat: 47.014726, lng: -123.585711 },
  'mount-vernon': { lat: 48.417071, lng: -122.311832 },
  'mountlake-terrace': { lat: 47.794329, lng: -122.302607 },
  'mukilteo': { lat: 47.912991, lng: -122.302205 },
  'napavine': { lat: 46.586796, lng: -122.902031 },
  'newcastle': { lat: 47.531486, lng: -122.165582 },
  'normandy-park': { lat: 47.432975, lng: -122.344689 },
  'north-bend': { lat: 47.487967, lng: -121.768786 },
  'oak-harbor': { lat: 48.293832, lng: -122.628154 },
  'ocean-shores': { lat: 46.965362, lng: -124.147207 },
  'olympia': { lat: 47.040604, lng: -122.895 },
  'orting': { lat: 47.096936, lng: -122.211687 },
  'pacific': { lat: 47.261974, lng: -122.252429 },
  'port-angeles': { lat: 48.119236, lng: -123.448013 },
  'port-orchard': { lat: 47.538443, lng: -122.632431 },
  'port-townsend': { lat: 48.121762, lng: -122.787876 },
  'poulsbo': { lat: 47.741078, lng: -122.642151 },
  'puyallup': { lat: 47.179046, lng: -122.291523 },
  'raymond': { lat: 46.683742, lng: -123.739507 },
  'redmond': { lat: 47.677924, lng: -122.115336 },
  'renton': { lat: 47.47919, lng: -122.194613 },
  'sammamish': { lat: 47.594268, lng: -122.038081 },
  'seatac': { lat: 47.443403, lng: -122.298287 },
  'seattle': { lat: 47.619335, lng: -122.351538 },
  'sedro-woolley': { lat: 48.511356, lng: -122.232137 },
  'sequim': { lat: 48.073688, lng: -123.087809 },
  'shelton': { lat: 47.225574, lng: -123.112243 },
  'shoreline': { lat: 47.756917, lng: -122.345505 },
  'silverdale': { lat: 47.667733, lng: -122.681851 },
  'skykomish': { lat: 47.709852, lng: -121.356448 },
  'snohomish': { lat: 47.928866, lng: -122.092684 },
  'snoqualmie': { lat: 47.543245, lng: -121.868645 },
  'south-prairie': { lat: 47.135386, lng: -122.096623 },
  'stanwood': { lat: 48.245144, lng: -122.342232 },
  'steilacoom': { lat: 47.169267, lng: -122.592336 },
  'sultan': { lat: 47.871132, lng: -121.804106 },
  'sumner': { lat: 47.227215, lng: -122.236264 },
  'tacoma': { lat: 47.252199, lng: -122.459832 },
  'tenino': { lat: 46.853817, lng: -122.86045 },
  'tukwila': { lat: 47.476289, lng: -122.27574 },
  'tumwater': { lat: 46.989463, lng: -122.917277 },
  'university-place': { lat: 47.215371, lng: -122.547259 },
  'wenatchee': { lat: 47.435985, lng: -120.329266 },
  'westport': { lat: 46.891815, lng: -124.119847 },
  'white-center': { lat: 47.50924, lng: -122.348063 },
  'wilkeson': { lat: 47.101266, lng: -122.052453 },
  'winlock': { lat: 46.490681, lng: -122.918391 },
  'woodinville': { lat: 47.757695, lng: -122.146791 },
  'yarrow-point': { lat: 47.644576, lng: -122.219994 },
  'yelm': { lat: 46.942608, lng: -122.643159 },
};

/** Great-circle distance in miles between two points. */
export function distanceMiles(a: CityPoint, b: CityPoint): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Order candidate cities by distance from `citySlug`, nearest first.
 * Cities without coordinates keep their original order at the end, so a missing
 * entry degrades the list instead of dropping the city.
 */
export function sortByDistance<T extends { slug: string }>(
  citySlug: string,
  candidates: T[],
): T[] {
  const origin = cityCoords[citySlug];
  if (!origin) return candidates;
  const known = candidates.filter((c) => cityCoords[c.slug]);
  const unknown = candidates.filter((c) => !cityCoords[c.slug]);
  known.sort(
    (a, b) =>
      distanceMiles(origin, cityCoords[a.slug]) -
      distanceMiles(origin, cityCoords[b.slug]),
  );
  return [...known, ...unknown];
}
