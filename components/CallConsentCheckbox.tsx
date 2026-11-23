'use client';

import Link from 'next/link';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { CONSENT_TEXT } from '@/lib/consent';

interface CallConsentCheckboxProps {
  id: string;
  registration: UseFormRegisterReturn;
}

// Optional, unchecked by default. The whole label is the tap target.
export default function CallConsentCheckbox({ id, registration }: CallConsentCheckboxProps) {
  return (
    <div className="flex items-start gap-3">
      <input
        {...registration}
        type="checkbox"
        id={id}
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-gray-300 accent-[#204560]"
      />
      <label htmlFor={id} className="cursor-pointer text-xs leading-relaxed text-gray-600">
        {CONSENT_TEXT}{' '}
        <Link href="/privacy-policy" target="_blank" rel="noopener" className="underline hover:text-gray-900">
          Privacy Policy
        </Link>
        {' · '}
        <Link href="/terms-of-use" target="_blank" rel="noopener" className="underline hover:text-gray-900">
          Terms
        </Link>
      </label>
    </div>
  );
}
