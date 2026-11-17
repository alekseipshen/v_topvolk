// Hand-maintained additions to the generated index allowlist (lib/data/indexAllowlist.ts).
// Edit this file by hand; build-index-allowlist.py merges it into the generated file.
//
// 2026-11-17, client request (voice 16.11: bring back pages for the nearby cities).
// Work zone only (<= 30 mi from Bellevue, no Kitsap: seo-plan.md rule 4). These
// /services/{service}/{city} pages were removed on 06.11 / 16.11 (404) although between
// 2026-02-01 and 2026-11-14 each brought a Search Console click, an organic GA4 landing
// session, or a real lead in the "Topvolk Leads" Telegram group. The generated list
// only looks back 90 days, so their spring and summer visits fell outside it.
// Evidence: Clients/TopVolk/Data/near-cities-removed-pages-2026-11-17.json
// (Clients/TopVolk/Scripts/near-cities-removed-pages-2026-11-17.py).

export const MANUAL_ALLOWED: string[] = [
  '/services/adu-construction/monroe', // 19.8 mi
  '/services/adu-construction/tacoma', // 27.8 mi
  '/services/bathroom-remodel/kent', // 14.7 mi
  '/services/carpentry/monroe', // 19.8 mi
  '/services/carpentry/north-bend', // 19.6 mi
  '/services/flooring-installation/tacoma', // 27.8 mi
  '/services/foundation-repair/issaquah', // 6.2 mi
  '/services/foundation-repair/north-bend', // 19.6 mi
  '/services/framing/snohomish', // 23.1 mi
  '/services/garage-construction/monroe', // 19.8 mi
  '/services/garage-construction/tacoma', // 27.8 mi
  '/services/general-contracting/kenmore', // 11.3 mi
  '/services/handyman-services/covington', // 16.3 mi
  '/services/handyman-services/everett', // 25.4 mi
  '/services/handyman-services/maple-valley', // 16.9 mi
  '/services/handyman-services/puyallup', // 29.6 mi
  '/services/home-additions/kirkland', // 7.2 mi
  '/services/home-additions/puyallup', // 29.6 mi
  '/services/hvac/federal-way', // 21.5 mi
  '/services/hvac/kent', // 14.7 mi
  '/services/landscaping/hunts-point', // 4.6 mi
  '/services/plumbing/auburn', // 20.5 mi
  '/services/roofing/enumclaw', // 28.4 mi
  '/services/tile-installation/burien', // 12.2 mi
];
