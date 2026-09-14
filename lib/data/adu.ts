import type { FaqItem } from '@/lib/data/faqs';
import { BUSINESS_NAME, PHONE_DISPLAY } from '@/lib/utils';

/**
 * Content for the ADU section (/services/adu-construction and the homepage
 * teaser). Modeled on a dedicated ADU builder site — types, sample models,
 * pre-approved plans, process, pricing, FAQ — but written for the Seattle
 * market and kept consistent with facts the site already publishes:
 * founded 2023, 100+ projects, $100/day late commitment, free estimates,
 * permits passed through at cost, King/Snohomish/Pierce service area.
 *
 * ⚠️ Pricing: `startingPrice` values are planning figures for the greater
 * Seattle area (in line with the $180K–$280K for 400–600 sq ft already
 * published on the city ADU pages, and with the $350–$600 per sq ft range
 * quoted by local sources in 2025–2026). Vladislav must confirm or adjust
 * them before launch — they are shown as "from" figures with a disclaimer.
 */

export interface AduModel {
  slug: string;
  name: string;
  tagline: string;
  sqft: string;
  bedrooms: string;
  bathrooms: string;
  buildTime: string;
  startingPrice: number;
  image: string;
  imageAlt: string;
  idealFor: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const aduModels: AduModel[] = [
  {
    slug: 'studio',
    name: 'Studio DADU',
    tagline: 'Compact backyard cottage',
    sqft: '≈ 400',
    bedrooms: 'Studio',
    bathrooms: '1',
    buildTime: '3–4 months',
    startingPrice: 180000,
    image: '/assets/adu/studio-400.jpg',
    imageAlt: 'Concept rendering of a 400 sq ft detached studio ADU with a gable metal roof and cedar entry in a Seattle backyard',
    idealFor: 'Rental income, home office, guest suite',
    description:
      'The smallest footprint that still works as a full home: open living and sleeping area, a real kitchen and a full bathroom. Fits on most Seattle lots without giving up the whole yard.',
    features: ['Open studio layout', 'Full kitchen & bathroom', 'Mini-split heating & cooling', 'Private entrance & porch'],
  },
  {
    slug: 'one-bedroom',
    name: 'One-Bedroom DADU',
    tagline: 'Our most requested plan',
    sqft: '≈ 600',
    bedrooms: '1',
    bathrooms: '1',
    buildTime: '4–5 months',
    startingPrice: 240000,
    image: '/assets/adu/one-bedroom-600.jpg',
    imageAlt: 'Concept rendering of a 600 sq ft one-bedroom detached ADU with a shed roof and cedar deck in a Seattle backyard',
    idealFor: 'Long-term rental, parents, adult children',
    description:
      'A separate bedroom, a living room with a sliding door onto a small deck, and a kitchen with full-size appliances. The layout renters and family members ask for most.',
    features: ['Separate bedroom', 'Living room with deck access', 'Full kitchen with pantry', 'Washer/dryer closet'],
    popular: true,
  },
  {
    slug: 'two-bedroom',
    name: 'Two-Bedroom Cottage',
    tagline: 'Room for a family',
    sqft: '≈ 800',
    bedrooms: '2',
    bathrooms: '1–2',
    buildTime: '5–6 months',
    startingPrice: 300000,
    image: '/assets/adu/two-bedroom-800.jpg',
    imageAlt: 'Concept rendering of an 800 sq ft two-bedroom backyard cottage ADU with a covered porch and dormer in a Seattle backyard',
    idealFor: 'Multigenerational living, family rental',
    description:
      'One-and-a-half stories with a covered porch and a loft-style second bedroom. Up to the 1,000 sq ft Seattle allows for a detached unit — a real second home on your property.',
    features: ['Two bedrooms', 'Covered front porch', 'Full kitchen & laundry', 'Option for a second bathroom'],
  },
  {
    slug: 'garage-conversion',
    name: 'Garage Conversion',
    tagline: 'Fastest path to a rental unit',
    sqft: '≈ 400–500',
    bedrooms: 'Studio / 1',
    bathrooms: '1',
    buildTime: '2–3 months',
    startingPrice: 95000,
    image: '/assets/adu/garage-conversion.jpg',
    imageAlt: 'Concept rendering of a detached garage converted into a living unit with a new window wall and patio in a Seattle backyard',
    idealFor: 'Budget-conscious owners, quick rental',
    description:
      'Your existing garage already has a foundation, a roof and a power feed. We insulate, add plumbing, replace the garage door with a window wall and finish it as a code-compliant dwelling unit.',
    features: ['Uses existing structure', 'New insulation & windows', 'Kitchenette & bathroom', 'No new foundation needed'],
  },
];

export interface AduType {
  name: string;
  short: string;
  description: string;
}

export const aduTypes: AduType[] = [
  {
    name: 'Detached ADU (DADU)',
    short: 'Backyard cottage',
    description:
      'A stand-alone unit in your backyard with its own entrance, kitchen and bathroom. Up to 1,000 sq ft in Seattle. The most private option and the strongest rental product.',
  },
  {
    name: 'Attached ADU (AADU)',
    short: 'Addition or basement',
    description:
      'A separate unit built onto your house or carved out of an existing basement or level. Shares a wall with the main home but has its own locking entrance and full kitchen.',
  },
  {
    name: 'Garage Conversion',
    short: 'Existing structure',
    description:
      'Turn a detached or attached garage into living space. Reuses the foundation, roof and electrical feed, so it is usually the fastest and lowest-cost route to a legal unit.',
  },
  {
    name: 'Basement ADU',
    short: 'Below-grade unit',
    description:
      'Finish and separate a basement into an independent apartment: egress windows, a separate entry, waterproofing, a kitchen and a bathroom. Ideal for older Seattle homes on sloped lots.',
  },
];

export interface AduStep {
  title: string;
  description: string;
}

export const aduSteps: AduStep[] = [
  {
    title: 'Free Site Assessment',
    description:
      'Vladislav visits your property, checks lot size, setbacks, utility access and the condition of any structure you want to convert. You get a written preliminary estimate — no charge.',
  },
  {
    title: 'Design & Permits',
    description:
      'Choose a Seattle pre-approved DADU plan or a custom design for your lot. We prepare the drawings, submit to SDCI or your city, and handle plan-review comments until the permit is issued.',
  },
  {
    title: 'Construction',
    description:
      'Foundation, framing, plumbing, electrical, insulation, drywall and finishes — one team from start to finish. Construction typically runs 10–16 weeks after the permit is issued.',
  },
  {
    title: 'Inspection & Handover',
    description:
      'We coordinate every city inspection through final approval, then walk the unit with you before handover. Deadline is in the contract: we pay $100 for every day past it.',
  },
];

export const aduIncludes: string[] = [
  'Design & permit drawings',
  'Permit submittal & plan-review handling',
  'Foundation to finish construction',
  'Full kitchen & bathroom',
  'Mini-split heating & cooling',
  'Utility connections (water, sewer, power)',
  'All city inspections coordinated',
  'Written workmanship warranty',
];

export interface AduComparisonRow {
  label: string;
  custom: string;
  preApproved: string;
}

// Seattle SDCI advertises roughly 2–6 weeks to permit for its pre-approved
// DADU plans; a standard new-DADU submittal typically runs 6–12 weeks.
export const aduPlanComparison: AduComparisonRow[] = [
  { label: 'Design & architecture', custom: 'Custom drawings for your lot', preApproved: 'Ready plan set from the city catalog' },
  { label: 'Permit review', custom: '6–12 weeks', preApproved: '2–6 weeks' },
  { label: 'Total timeline', custom: '6–9 months', preApproved: '4–7 months' },
  { label: 'Code compliance', custom: 'Reviewed during permitting', preApproved: 'Pre-reviewed by SDCI' },
];

export const aduPreApprovedBenefits: { title: string; description: string }[] = [
  { title: 'Skip design fees', description: 'Plans are already drawn and reviewed — you buy the plan set instead of paying for architecture from scratch.' },
  { title: 'Faster permits', description: 'Seattle SDCI issues permits for pre-approved DADUs in about 2–6 weeks instead of a full plan review.' },
  { title: 'Code compliance built in', description: 'Structural, energy and life-safety reviews are already done, so there are fewer resubmittals.' },
  { title: 'Adapted to your lot', description: 'We handle the site plan, setbacks, utility routing and foundation design that still have to be done for every parcel.' },
];

export function buildAduFaqs(): FaqItem[] {
  return [
    {
      question: 'How much does it cost to build an ADU in Seattle?',
      answer: `A detached ADU in the greater Seattle area typically starts around $180,000 for a 400 sq ft studio and $240,000–$330,000 for a 600 sq ft one-bedroom, with larger two-bedroom cottages from about $300,000. Garage conversions start near $95,000 because the foundation and roof already exist. Prices depend on site conditions, utility connections and finish level. Every estimate through this website is preliminary; final pricing is set after a free in-person site assessment and a signed scope-of-work agreement. Call ${PHONE_DISPLAY} to schedule.`,
    },
    {
      question: 'How long does an ADU project take from start to move-in?',
      answer: `Design and permit preparation start within two weeks of signing. Seattle SDCI plan review takes about 2–6 weeks for a pre-approved DADU plan and 6–12 weeks for a custom design; construction then runs 10–16 weeks. Four to seven months end-to-end is realistic for most lots. You get a written timeline before work starts, and ${BUSINESS_NAME} pays $100 for every day past the agreed deadline.`,
    },
    {
      question: 'How many ADUs can I build on my lot in Washington?',
      answer: 'Washington House Bill 1337, in force statewide since mid-2025, requires cities to allow up to two accessory dwelling units on a residential lot — for example one attached and one detached — without an owner-occupancy requirement, and without off-street parking when the lot is within a half mile of a major transit stop. Local codes still set height, setbacks and lot coverage, so we confirm what fits during the free site visit.',
    },
    {
      question: 'What size ADU is allowed in Seattle?',
      answer: 'In Seattle a detached ADU can generally be up to 1,000 sq ft of floor area, with height limits that depend on the roof form and lot width. Side and rear setbacks are typically 5 feet, and single-family zones cap total lot coverage. Lots under about 4,000 sq ft face tighter math, which is why we run the numbers with your actual parcel data before drawing anything.',
    },
    {
      question: 'Do you handle the ADU permit?',
      answer: 'Yes. We prepare the drawings, submit the application to Seattle SDCI or the permit authority in your city — Bellevue, Kirkland, Tacoma, Everett and others — respond to plan-review comments and schedule every inspection through final approval. Permit and plan-review fees charged by the jurisdiction are passed through to you at cost, with no markup.',
    },
    {
      question: 'What are Seattle pre-approved DADU plans, and can I use one?',
      answer: 'The City of Seattle keeps a catalog of detached ADU designs that SDCI has already reviewed for structural, energy and building-code compliance. Using one skips most of the design work and shortens permit review to roughly 2–6 weeks. The plans apply within the City of Seattle; outside city limits we design to your city or county code under the standard review process. We still prepare the site plan, foundation design and utility routing for your specific lot.',
    },
    {
      question: 'Can I rent out my ADU?',
      answer: 'Yes. Long-term rental of an ADU is allowed in Seattle and across Washington, and HB 1337 removed the owner-occupancy requirement statewide. Short-term rental rules vary by city and may require a separate license. We build every unit as a fully independent dwelling — private entrance, full kitchen and bathroom — so it can be rented, used by family or sold with the property.',
    },
    {
      question: 'Does the ADU need its own water, sewer and electrical service?',
      answer: 'Not always. Many Seattle ADUs share the main house’s water and sewer line and get a sub-panel from the existing electrical service. A separate service line adds roughly $8,000–$18,000 depending on trench distance to the main, but makes the unit fully independent for financing or a future sale. We price both options in your estimate so you can choose.',
    },
    {
      question: 'Can you convert my garage or basement into an ADU?',
      answer: 'Yes. Garage and basement conversions are the lowest-cost route to a legal unit because the structure already exists. The work usually covers insulation, egress windows, a separate entrance, plumbing for a kitchen and bathroom, an electrical upgrade and, for basements, waterproofing. We confirm ceiling height, foundation condition and moisture before quoting.',
    },
    {
      question: 'How do homeowners pay for an ADU?',
      answer: 'Most homeowners fund an ADU with a home-equity line of credit, a cash-out refinance or a construction/renovation loan; some combine that with the expected rental income. We are a construction company, not a lender, but the detailed written estimate and timeline we provide are what lenders ask for when underwriting the project.',
    },
    {
      question: `Is ${BUSINESS_NAME} licensed and insured for ADU construction?`,
      answer: `Yes. ${BUSINESS_NAME} is a fully licensed and insured construction contractor in Washington State, serving the greater Seattle area since 2023 with more than 100 completed projects across King, Snohomish and Pierce counties. Construction work is covered by a written workmanship warranty specified in your project agreement.`,
    },
  ];
}

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

/** "Studio" stays as is; numeric counts get the "bed" suffix. */
export function formatBedrooms(bedrooms: string): string {
  return /^\d/.test(bedrooms) ? `${bedrooms} bed` : bedrooms;
}
