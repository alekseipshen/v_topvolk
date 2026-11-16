'use client';

import type { ReactNode } from 'react';
import { useModal } from '@/contexts/ModalContext';

interface OpenEstimateButtonProps {
  className?: string;
  children: ReactNode;
}

/**
 * Opens the site-wide estimate modal, exactly like the hero "Get Free Estimate"
 * button (same ModalContext, service preselected from the URL, same GTM event).
 * Lets server components place a quote CTA without becoming client components.
 */
export default function OpenEstimateButton({ className = '', children }: OpenEstimateButtonProps) {
  const { openModal } = useModal();
  return (
    <button type="button" onClick={() => openModal()} className={`cursor-pointer ${className}`}>
      {children}
    </button>
  );
}
