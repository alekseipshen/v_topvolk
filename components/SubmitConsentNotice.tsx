import Link from 'next/link';
import { CONSENT_TEXT } from '@/lib/consent';
import { PHONE_DISPLAY, PHONE_NUMBER } from '@/lib/utils';

// Calls/texts consent notice shown directly under the submit button (no checkbox since 2026-11-24).
// The text comes verbatim from lib/consent.ts, the same string archived with every lead;
// only the phone number is turned into a tap-to-call link.
export default function SubmitConsentNotice() {
  const [before, after] = CONSENT_TEXT.split(PHONE_DISPLAY);
  return (
    <p className="text-xs leading-snug text-gray-600 text-center">
      {before}
      {after !== undefined && (
        <>
          <a href={`tel:${PHONE_NUMBER}`} className="whitespace-nowrap underline hover:text-gray-900">
            {PHONE_DISPLAY}
          </a>
          {after}
        </>
      )}{' '}
      <Link href="/privacy-policy" target="_blank" rel="noopener" className="underline hover:text-gray-900">
        Privacy Policy
      </Link>
      {' · '}
      <Link href="/terms-of-use" target="_blank" rel="noopener" className="underline hover:text-gray-900">
        Terms
      </Link>
    </p>
  );
}
