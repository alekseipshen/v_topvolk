'use client';

import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { useModal } from '@/contexts/ModalContext';

interface AduModelCardProps {
  /** Model slug, used as the GTM label so per-model interest is measurable. */
  model: string;
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Clickable wrapper for an ADU model card on /services/adu-construction.
 *
 * Why: Clarity showed 13-23 dead clicks a week on these cards (people click the
 * photo or the model name expecting something to happen). A click anywhere on the
 * card now opens the same lead form as the "Get Quote" button, with the model
 * preselected in the GTM label. Clicks on the button itself (or any link inside
 * the card) are left to that element, so nothing fires twice.
 */
export default function AduModelCard({ model, id, className = '', children }: AduModelCardProps) {
  const { openModal } = useModal();

  const open = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'open_lead_form',
        label: `adu_model_card_${model}`,
      });
    }
    openModal('adu-construction');
  };

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a')) return;
    open();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };

  return (
    <div
      id={id}
      role="button"
      tabIndex={0}
      aria-label={`Get a quote for the ${model.replace(/-/g, ' ')} ADU model`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${className}`}
    >
      {children}
    </div>
  );
}
