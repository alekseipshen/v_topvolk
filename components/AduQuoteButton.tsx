'use client';

import { Calendar } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';

interface AduQuoteButtonProps {
  label: string;
  /** Model slug, used as the GTM label so per-model interest is measurable. */
  model?: string;
  variant?: 'gold' | 'blue';
  className?: string;
}

/**
 * Opens the site-wide lead form with "ADU Construction" preselected.
 * Same modal, same GTM event (`open_lead_form`) as every other CTA on the site.
 */
export default function AduQuoteButton({ label, model, variant = 'gold', className = '' }: AduQuoteButtonProps) {
  const { openModal } = useModal();
  const bg = variant === 'gold' ? '#F4B942' : '#334e64';
  const hover = variant === 'gold' ? '#D4A030' : '#2a4054';

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'open_lead_form',
            label: model ? `adu_model_${model}` : 'adu_page',
          });
        }
        openModal('adu-construction');
      }}
      className={`inline-flex items-center justify-center gap-2 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg cursor-pointer ${className}`}
      style={{ backgroundColor: bg }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hover)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bg)}
    >
      <Calendar size={18} />
      {label}
    </button>
  );
}
