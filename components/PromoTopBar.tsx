'use client';

import { useWeeklyCountdown } from '@/hooks/useWeeklyCountdown';
import { useModal } from '@/contexts/ModalContext';

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export default function PromoTopBar() {
  const { days, hours, minutes, seconds, isExpired } = useWeeklyCountdown();
  const { openModal } = useModal();

  if (isExpired) return null;

  return (
    <div
      className="w-full py-2 px-4 text-center relative z-[60]"
      style={{ backgroundColor: '#F4B942' }}
    >
      <div className="container mx-auto flex items-center justify-center gap-2 md:gap-4 flex-wrap">
        {/* Offer text */}
        <span className="text-sm md:text-base font-bold text-gray-900">
          <span className="hidden md:inline">This Week Only: </span>
          <span className="text-white bg-gray-900 px-2 py-0.5 rounded text-sm md:text-base font-extrabold">
            15% OFF
          </span>
          <span className="ml-1">Labor</span>
        </span>

        {/* Divider */}
        <span className="hidden md:inline text-gray-800/50">|</span>

        {/* Countdown */}
        <div className="flex items-center gap-1 font-mono text-sm md:text-base font-bold text-gray-900">
          <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded text-xs md:text-sm">
            {pad(days)}d
          </span>
          <span>:</span>
          <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded text-xs md:text-sm">
            {pad(hours)}h
          </span>
          <span>:</span>
          <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded text-xs md:text-sm">
            {pad(minutes)}m
          </span>
          <span>:</span>
          <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded text-xs md:text-sm">
            {pad(seconds)}s
          </span>
        </div>

        {/* CTA button — desktop only */}
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).dataLayer) {
              (window as any).dataLayer.push({
                event: 'open_lead_form',
                label: 'promo_top_bar',
              });
            }
            openModal();
          }}
          className="hidden md:inline-block ml-2 px-4 py-1 bg-gray-900 text-white text-sm font-semibold rounded hover:bg-gray-800 transition cursor-pointer"
        >
          Claim Discount
        </button>
      </div>
    </div>
  );
}
