// Calls/texts consent shown under every lead form (TCPA prior express written consent,
// AI/automated voice calls included). Wording supplied by the owner on 2026-11-23.
// The box is optional and unchecked by default: consent may not be a condition of purchase.
// If the wording changes, bump CONSENT_VERSION so archived leads keep the exact text they agreed to.
export const CONSENT_VERSION = '2026-11-23';

export const CONSENT_TEXT =
  'I agree to receive calls and text messages from TopVolk Construction LLC at the number provided, ' +
  'including calls made with an automated system or AI voice assistant, about my project request. ' +
  'Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out.';
