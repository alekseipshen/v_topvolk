// Calls/texts consent on the estimate forms (TCPA prior express written consent,
// AI/automated voice calls included). Every wording ever shown stays here by version,
// so an archived lead keeps the exact text that visitor saw.
//
// 2026-11-23: optional unchecked checkbox, owner's wording.
// 2026-11-24: checkbox removed at the owner's request; the notice sits under the submit
//   button and submitting the form is the signature. Automated/AI calls must stay named in
//   the notice, and "not a condition of purchase" is backed by the phone number to call instead.
// If the wording changes, add a new version and point CONSENT_VERSION at it.
import { PHONE_DISPLAY } from '@/lib/utils';

export const CONSENT_TEXTS: Record<string, string> = {
  '2026-11-23':
    'I agree to receive calls and text messages from TopVolk Construction LLC at the number provided, ' +
    'including calls made with an automated system or AI voice assistant, about my project request. ' +
    'Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out.',
  '2026-11-24':
    'By submitting this form, you agree that TopVolk Construction LLC may call and text you at the number ' +
    'provided about your project, including calls made with an automated system or AI voice assistant. ' +
    `Consent is not a condition of purchase: you can call us at ${PHONE_DISPLAY} instead. ` +
    'Message and data rates may apply. Reply STOP to opt out.',
};

export const CONSENT_METHODS: Record<string, string> = {
  '2026-11-23': 'checkbox',
  '2026-11-24': 'submit_notice',
};

export const CONSENT_VERSION = '2026-11-24';
export const CONSENT_TEXT = CONSENT_TEXTS[CONSENT_VERSION];

// Bundles cached before 2026-11-24 send no version: they still showed the checkbox.
export const LEGACY_CONSENT_VERSION = '2026-11-23';
