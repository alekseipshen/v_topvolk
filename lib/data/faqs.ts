import { PHONE_DISPLAY } from '@/lib/utils';

export interface FaqItem {
  question: string;
  answer: string;
}

// Single source of truth for the homepage FAQ. Rendered visibly in the
// "Frequently Asked Questions" section AND emitted as FAQPage JSON-LD, so the
// structured data always mirrors on-page content (Google rich-results policy).
// Every answer is consistent with the canonical facts: founded 2023, licensed
// WA contractor, Mon-Sat 09:00-17:00, King/Snohomish/Pierce service area, and
// only the services the client actually offers.
export const homeFaqs: FaqItem[] = [
  {
    question: 'What areas does TopVolk Construction serve?',
    answer:
      'TopVolk Construction serves the greater Seattle area, including Bellevue, Tacoma, Kirkland, and Redmond, along with communities across King, Snohomish, and Pierce Counties in Washington.',
  },
  {
    question: 'Is TopVolk Construction licensed and insured?',
    answer:
      'Yes. TopVolk Construction LLC is a licensed and insured general contractor operating in Washington State.',
  },
  {
    question: 'How long has TopVolk Construction been in business?',
    answer:
      'TopVolk Construction has completed more than 100 residential projects across the Seattle area since 2023.',
  },
  {
    question: 'What home renovation services does TopVolk offer?',
    answer:
      'We specialize in kitchen remodels, bathroom renovations, deck and patio construction, basement finishing, flooring installation, and full-service general contracting.',
  },
  {
    question: 'Does TopVolk Construction offer free estimates?',
    answer: `Yes. We provide free, detailed estimates with transparent pricing and no hidden fees. Call ${PHONE_DISPLAY} to schedule yours.`,
  },
  {
    question: 'What are your business hours?',
    answer: 'We are open Monday through Saturday, 9:00 AM to 5:00 PM.',
  },
];
