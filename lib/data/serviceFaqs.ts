import { BUSINESS_NAME, PHONE_DISPLAY } from '@/lib/utils';
import type { FaqItem } from '@/lib/data/faqs';

// Matches the local SITE_URL const used across app/ and lib/seo/schema.ts.
const SITE_URL = 'https://www.topvolk.org';

/**
 * FAQ for /services/[service] pages.
 *
 * Previously three questions were built inline on the service page, identical
 * for all 30 services. AEO guidance is 8-15 Q&A on a money page: answer blocks
 * are the unit an AI assistant extracts, and three of them leave most buying
 * questions unanswered.
 *
 * Every answer here restates something the site already publishes — the $100
 * per-day late commitment, free preliminary estimates, permits passed through
 * at cost, written workmanship warranty per project agreement, Mon-Sat 9-5,
 * King/Snohomish/Pierce service area, founded 2023, 100+ projects. Nothing is
 * introduced that is not already claimed elsewhere on the site, so the FAQPage
 * JSON-LD stays a mirror of on-page content and of reality.
 *
 * The same array feeds the visible FAQ block and FAQSchema, so the two cannot
 * drift apart.
 */

// Services with a published cost guide — the cost answer links to real numbers
// instead of deflecting to a phone call.
const COST_GUIDES: Record<string, string> = {
  'kitchen-remodel': '/blog/kitchen-remodel-cost-seattle',
  'bathroom-remodel': '/blog/bathroom-remodel-cost-seattle',
  'deck-installation': '/blog/deck-cost-seattle',
  'basement-finishing': '/blog/basement-finishing-cost-seattle',
};

interface ServiceLike {
  slug: string;
  name: string;
  services?: string[];
}

export function buildServiceFaqs(service: ServiceLike): FaqItem[] {
  const lower = service.name.toLowerCase();
  const guide = COST_GUIDES[service.slug];

  const costAnswer = guide
    ? `${service.name} costs depend on scope, materials and the condition of the existing space. We publish a detailed Seattle cost breakdown at ${SITE_URL}${guide}. Every estimate through this website is preliminary — final pricing is set after an in-person consultation, site assessment and a signed scope-of-work agreement. Call ${PHONE_DISPLAY} for a free estimate.`
    : `${service.name} costs depend on scope, materials and site conditions. ${BUSINESS_NAME} provides free, detailed estimates with transparent pricing and no hidden fees. Estimates given through this website are preliminary; final pricing is set after an in-person consultation, site assessment and a signed scope-of-work agreement. Call ${PHONE_DISPLAY} for a quote.`;

  const faqs: FaqItem[] = [
    {
      question: `How much does ${lower} cost in Seattle?`,
      answer: costAnswer,
    },
    {
      question: `How long does a ${lower} project take?`,
      answer: `Timelines depend on scope and complexity. You get a detailed timeline during your free consultation, and we take financial responsibility for it: ${BUSINESS_NAME} pays $100 for every day past the agreed deadline.`,
    },
    {
      question: `Is ${BUSINESS_NAME} licensed and insured?`,
      answer: `Yes. ${BUSINESS_NAME} is a fully licensed and insured construction contractor operating in Washington State, serving the greater Seattle area since 2023 with more than 100 completed projects across King, Snohomish and Pierce counties.`,
    },
    {
      question: `Do you handle permits for ${lower}?`,
      answer: `Yes. We handle permit acquisition and our work is permitted and inspected to meet local code. Permit fees, plan-review costs and inspection charges from local jurisdictions — City of Seattle, King County, Bellevue, Tacoma and others — are passed through to you at cost, with no markup.`,
    },
    {
      question: `What warranty comes with ${lower}?`,
      answer: `Construction work performed by ${BUSINESS_NAME} is covered by a written workmanship warranty, with the terms specified in your project agreement. Manufacturer warranties on materials and fixtures are passed through from the manufacturer.`,
    },
    {
      question: `Which areas do you serve for ${lower}?`,
      answer: `We serve the greater Seattle area — Seattle, Bellevue, Kirkland, Redmond, Renton, Tacoma and Everett — along with communities across King, Snohomish and Pierce counties. The full city list is at ${SITE_URL}/service-areas.`,
    },
    {
      question: `Is the estimate free, and what happens at the first visit?`,
      answer: `The estimate is free. We visit the site, review the scope with you, and put together a detailed written estimate covering materials, timeline, allowances, change-order procedure and payment milestones. Nothing is charged before a scope-of-work agreement is signed.`,
    },
    {
      question: `When can I reach you?`,
      answer: `Monday through Saturday, 9:00 AM to 5:00 PM Pacific Time. Call ${PHONE_DISPLAY} or use the form on this page and we will get back to you to schedule a free estimate.`,
    },
  ];

  // Scope question, when the service data lists what the work covers.
  if (service.services && service.services.length > 0) {
    faqs.splice(3, 0, {
      question: `What does your ${lower} service include?`,
      answer: `Our ${lower} work covers ${service.services
        .map((s) => s.toLowerCase())
        .join(', ')}. One team owns planning, permits and construction, so the project stays coordinated from start to finish.`,
    });
  }

  return faqs;
}
