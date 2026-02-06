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

export const PHONE_NUMBER = '+12065911096';
export const PHONE_DISPLAY = '(206) 591-1096';
export const BUSINESS_EMAIL = 'info@topvolk.org';
export const BUSINESS_NAME = 'TopVolk Construction LLC';
export const BUSINESS_ADDRESS = '';
export const GOOGLE_RATING = 4.9;
export const GOOGLE_REVIEW_COUNT = '30+';
export const GOOGLE_BUSINESS_PROFILE_URL = 'https://share.google/GCqeuaL4bJXcZpNR5';

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

