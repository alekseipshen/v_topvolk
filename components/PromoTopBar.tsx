'use client';

import { useModal } from '@/contexts/ModalContext';

export default function PromoTopBar() {
  const { openModal } = useModal();

  return (
    <div
      className="w-full py-2 px-4 text-center relative z-[60]"
      style={{ backgroundColor: '#F4B942' }}
    >
      <div className="container mx-auto flex items-center justify-center gap-2 md:gap-4 flex-wrap">
        {/* Offer text */}
        <span className="text-sm md:text-base font-bold text-gray-900">
          <span className="text-white bg-gray-900 px-2 py-0.5 rounded text-sm md:text-base font-extrabold">
            0% Financing
          </span>
          <span className="ml-1">for 24 Months</span>
          <span className="hidden md:inline font-normal text-gray-800">
            {' '}
            · subject to credit approval
          </span>
        </span>

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
          Get a Free Quote
        </button>
      </div>
    </div>
  );
}
