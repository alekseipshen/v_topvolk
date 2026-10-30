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
