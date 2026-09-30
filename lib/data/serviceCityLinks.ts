import { isServiceCityIndexable } from '@/lib/data/indexAllowlist';

/**
 * Internal link to a /services/{service}/{city} page, or to its nearest
 * indexable parent when that page is noindex.
 *
 * Most service x city pages are outside the index allowlist. Linking to them
 * from every city page and service hub spends crawl and link weight on pages
 * Google is told to drop, so a link names the combo only when the combo is
 * indexable. Otherwise it points to whichever parent the link is about:
 * `'city'` for city lists (nearby cities, county grids), `'service'` for
 * service lists (services in this city).
 */
export function serviceCityHref(
  serviceSlug: string,
  citySlug: string,
  fallback: 'city' | 'service',
): string {
  if (isServiceCityIndexable(serviceSlug, citySlug)) {
    return `/services/${serviceSlug}/${citySlug}`;
  }
  return fallback === 'city' ? `/cities/${citySlug}` : `/services/${serviceSlug}`;
}
