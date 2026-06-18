import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface FaqItem {
  q: string;
  a: string;
}

export interface CommonProblemItem {
  title: string;
  description: string;
}

export interface PageContent {
  answer?: string;
  title?: string;
  intro?: string;
  localContext?: string;
  commonProblems?: CommonProblemItem[];
  whyChooseUs?: string;
  faq?: FaqItem[];
  wordCount?: number;
  generatedAt?: string;
}

/**
 * Load city+service unique SEO content from a YAML file.
 * Returns null if no file exists or content is empty — page will fall back
 * to the static template.
 */
export function loadCityServiceContent(
  citySlug: string,
  serviceSlug: string
): PageContent | null {
  if (!citySlug || !serviceSlug) return null;
  const filePath = path.join(
    process.cwd(),
    'content',
    'cities',
    citySlug,
    'services',
    `${serviceSlug}.yaml`
  );

  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = yaml.load(raw) as PageContent | undefined | null;
    if (!data || typeof data !== 'object') return null;
    if (!data.intro) return null;
    return data;
  } catch {
    return null;
  }
}
