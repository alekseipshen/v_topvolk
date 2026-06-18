/**
 * Schema.org Structured Data Components
 * Uses unified schema generators from lib/seo/schema.ts
 * These are thin wrapper components for embedding JSON-LD in pages
 */

import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/schema';

interface LocalBusinessProps {
  city?: string;
  service?: string;
  county?: string;
}

/**
 * LocalBusiness Schema for main pages and city pages
 */
export function LocalBusinessSchema({ city, county, service }: LocalBusinessProps = {}) {
  const schema = generateLocalBusinessSchema({ city, service, county });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Organization + WebSite + LocalBusiness schemas for the homepage
 * Organization (parent entity) + LocalBusiness (operating entity) are
 * cross-linked via @id, so search engines treat them as the same business
 * rather than duplicates.
 */
export function HomepageSchemas() {
  const org = generateOrganizationSchema();
  const site = generateWebSiteSchema();
  const business = generateLocalBusinessSchema({});

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
    </>
  );
}

/**
 * BreadcrumbList Schema for navigation
 */
interface BreadcrumbProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbProps) {
  const schema = generateBreadcrumbSchema({ items });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service Schema for specific construction service pages
 */
interface ServiceProps {
  name: string;
  description: string;
  url: string;
  city?: string;
}

export function ServiceSchema({ name, description, url, city }: ServiceProps) {
  const schema = generateServiceSchema({ service: name, city });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQ Schema for service pages
 */
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
