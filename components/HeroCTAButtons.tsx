'use client';

import { Phone, Calendar } from 'lucide-react';
import { PHONE_NUMBER, PHONE_DISPLAY } from '@/lib/utils';
import { useModal } from '@/contexts/ModalContext';

export default function HeroCTAButtons() {
  const { openModal } = useModal();

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 order-2 md:order-1 md:mb-8">
      <a
        href={`tel:${PHONE_NUMBER}`}
        onClick={() => {
          // GTM Event - Phone Click
          if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
              event: 'phone_click',
            });
          }
        }}
        className="flex items-center gap-2 md:gap-3 text-white px-6 md:px-10 py-3 md:py-5 rounded-lg transition font-semibold text-base md:text-xl shadow-lg hover:shadow-xl w-full md:w-auto justify-center"
        style={{ backgroundColor: '#33ac38' }}
      >
        <Phone size={20} className="md:w-7 md:h-7" />
        <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
      </a>
      <button
        onClick={openModal}
        className="flex items-center gap-2 md:gap-3 text-white px-6 md:px-10 py-3 md:py-5 rounded-lg transition font-semibold text-base md:text-xl shadow-lg hover:shadow-xl w-full md:w-auto justify-center cursor-pointer"
        style={{ backgroundColor: '#334e64' }}
      >
        <Calendar size={20} className="md:w-7 md:h-7" />
        <span className="whitespace-nowrap">Request Service</span>
      </button>
    </div>
  );
}
