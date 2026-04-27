// Seattle Metro Area cities — derived from seattle-counties.ts (single source of truth).
// Priority order matters: top 20 cities flow into sitemap-phase1.xml; remaining cities into phase2/phase3.

import { seattleCounties } from './seattle-counties';

export interface City {
  slug: string;
  name: string;
  county: string;
}

// Priority slugs for sitemap phase 1 — highest organic search volume + revenue potential.
// Order is intentional, do not alphabetize.
const PRIORITY_SLUGS: string[] = [
  'seattle',
  'bellevue',
  'kirkland',
  'redmond',
  'tacoma',
  'renton',
  'kent',
  'auburn',
  'federal-way',
  'sammamish',
  'issaquah',
  'lynnwood',
  'everett',
  'bothell',
  'shoreline',
  'mercer-island',
  'edmonds',
  'puyallup',
  'lakewood',
  'mill-creek',
];

const slugify = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, '-');

// Build a map of unique cities from seattleCounties; first-seen county wins for duplicates
// (e.g. Bothell is in King + Snohomish; we pin it to King for consistency).
const buildUniqueCities = (): Map<string, City> => {
  const map = new Map<string, City>();
  seattleCounties.forEach((county) => {
    county.cities.forEach((cityName) => {
      const slug = slugify(cityName);
      if (!map.has(slug)) {
        map.set(slug, { slug, name: cityName, county: county.slug });
      }
    });
  });
  return map;
};

const uniqueMap = buildUniqueCities();

// Priority cities first, remainder alphabetical by name.
export const cities: City[] = (() => {
  const result: City[] = [];
  const remainingMap = new Map(uniqueMap);

  PRIORITY_SLUGS.forEach((slug) => {
    const city = remainingMap.get(slug);
    if (city) {
      result.push(city);
      remainingMap.delete(slug);
    }
  });

  const rest = Array.from(remainingMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return [...result, ...rest];
})();

export function getCitiesByCounty(countySlug: string): City[] {
  return cities.filter((city) => city.county === countySlug);
}
