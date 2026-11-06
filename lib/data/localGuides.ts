// Homepage "Cost & permit guides" block.
// Why: the homepage is recrawled every 1-2 days, while deep /services/{service}/{city}
// pages are recrawled every 1-3 months. Pages rewritten with real prices and city
// permit rules are listed here so Google reaches the new text quickly.
// Only list pages that are in indexAllowlist.ts (index, follow) or blog posts.
// Blurbs repeat facts already published on the target page; do not add new claims here.

export interface LocalGuide {
  href: string;
  title: string;
  blurb: string;
}

export const costGuides: LocalGuide[] = [
  {
    href: '/blog/adu-dadu-rules-cost-eastside',
    title: 'ADU & DADU Rules on the Eastside',
    blurb: 'How many ADUs you can build, size and height caps by city, fees and real costs.',
  },
  {
    href: '/blog/main-floor-remodel-cost-seattle',
    title: 'Main Floor Remodel Cost',
    blurb: 'Opening walls, kitchen and living areas on one level: budget, permits and timeline.',
  },
  {
    href: '/blog/whole-house-renovation-cost-seattle',
    title: 'Whole House Renovation Cost',
    blurb: 'What a full renovation costs around Seattle and the Eastside, and what drives it.',
  },
  {
    href: '/blog/kitchen-remodel-cost-seattle',
    title: 'Kitchen Remodel Cost in Seattle',
    blurb: 'Price ranges by scope, what drives the budget and what permits add.',
  },
  {
    href: '/blog/bathroom-remodel-cost-seattle',
    title: 'Bathroom Remodel Cost in Seattle',
    blurb: 'From a cosmetic refresh to a full gut, with typical timelines.',
  },
  {
    href: '/blog/basement-finishing-cost-seattle',
    title: 'Basement Finishing Cost in Seattle',
    blurb: 'Egress windows, moisture control and what a finished basement typically costs.',
  },
  {
    href: '/blog/deck-cost-seattle',
    title: 'Deck Cost in Seattle',
    blurb: 'Pressure-treated, cedar and composite decks compared on price and upkeep.',
  },
];

// Service hub -> guides that belong to that service. Why: on 2026-11-06 none of the six
// /services/* hubs linked to a single blog post, the three guides published 30.10 were
// still "URL is unknown to Google" / "Discovered" and the whole /blog/* family had 83
// impressions in 28 days. Hubs are recrawled every few days; the homepage block alone
// was not enough. Keep each list short (2-4) and only to pages that are index,follow.
const GUIDES_BY_SERVICE: Record<string, string[]> = {
  'kitchen-remodel': ['/blog/kitchen-remodel-cost-seattle', '/blog/main-floor-remodel-cost-seattle', '/blog/whole-house-renovation-cost-seattle', '/services/kitchen-remodel/shoreline'],
  'bathroom-remodel': ['/blog/bathroom-remodel-cost-seattle', '/blog/whole-house-renovation-cost-seattle', '/blog/main-floor-remodel-cost-seattle'],
  'basement-finishing': ['/blog/basement-finishing-cost-seattle', '/services/basement-finishing/kirkland', '/blog/whole-house-renovation-cost-seattle'],
  'deck-installation': ['/blog/deck-cost-seattle', '/services/deck-installation/duvall', '/services/deck-installation/sumner'],
  'adu-construction': ['/blog/adu-dadu-rules-cost-eastside', '/services/adu-construction/kirkland', '/blog/whole-house-renovation-cost-seattle'],
  'general-contracting': ['/blog/whole-house-renovation-cost-seattle', '/blog/main-floor-remodel-cost-seattle', '/blog/adu-dadu-rules-cost-eastside', '/blog/kitchen-remodel-cost-seattle'],
  'home-additions': ['/blog/adu-dadu-rules-cost-eastside', '/blog/main-floor-remodel-cost-seattle', '/blog/whole-house-renovation-cost-seattle'],
  'flooring-installation': ['/services/flooring-installation/bothell', '/blog/main-floor-remodel-cost-seattle', '/blog/whole-house-renovation-cost-seattle'],
};

export function guidesForService(serviceSlug: string): LocalGuide[] {
  const hrefs = GUIDES_BY_SERVICE[serviceSlug] ?? [];
  const all = [...costGuides, ...localGuides];
  return hrefs
    .map((href) => all.find((g) => g.href === href))
    .filter((g): g is LocalGuide => Boolean(g));
}

// City pages that carry their own block (lib/data/cityContent.ts) also list the
// cost guides, plus the local guide for that city when one exists.
export function guidesForCity(citySlug: string): LocalGuide[] {
  const own = localGuides.filter((g) => g.href.endsWith(`/${citySlug}`));
  return [...own, ...costGuides];
}

export const localGuides: LocalGuide[] = [
  {
    href: '/services/kitchen-remodel/shoreline',
    title: 'Kitchen Remodel in Shoreline',
    blurb: 'About $32K for a same-layout refresh, about $96K for a midrange major remodel, 6-10 weeks of work after the permit.',
  },
  {
    href: '/services/basement-finishing/kirkland',
    title: 'Basement Finishing in Kirkland',
    blurb: 'A 600-900 sq ft finish with an egress bedroom and a bath typically budgets $50K-$95K, plus 4-8 weeks of city review.',
  },
  {
    href: '/services/adu-construction/kirkland',
    title: 'ADU Construction in Kirkland',
    blurb: 'Up to two ADUs per lot, each up to 1,200 sq ft, no owner-occupancy rule, pre-approved DADU plans.',
  },
  {
    href: '/services/deck-installation/duvall',
    title: 'Deck Installation in Duvall',
    blurb: 'About $20K for a 16x20 wood deck and about $29K in composite, 1-3 weeks of building once permitted.',
  },
  {
    href: '/services/deck-installation/sumner',
    title: 'Deck Installation in Sumner',
    blurb: 'Wood vs composite pricing, plus what a roof cover or pergola adds on top.',
  },
  {
    href: '/services/flooring-installation/bothell',
    title: 'Flooring Installation in Bothell',
    blurb: 'Luxury vinyl plank about $4-$16 per sq ft installed, hardwood about $6-$25, 2-5 days for a typical floor.',
  },
];
