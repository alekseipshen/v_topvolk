import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}

export const PHONE_NUMBER = '+18887713235';
export const PHONE_DISPLAY = '(888) 771-3235';
export const BUSINESS_EMAIL = 'info@maxappliancetexas.com';
export const BUSINESS_NAME = 'Max Appliance Repair';
export const BUSINESS_ADDRESS = '';
export const GOOGLE_RATING = 4.8;
export const GOOGLE_REVIEW_COUNT = '3,400';
export const GOOGLE_BUSINESS_PROFILE_URL = 'https://share.google/JAvlzws5KKCcgx3Az';

// Professional icons (Lucide React style)
export const icons = {
  phone: '📞',
  calendar: '📅',
  checkCircle: '✓',
  star: '⭐',
  clock: '⏱️',
  shield: '🛡️',
  award: '🏆',
  wrench: '🔧',
};

