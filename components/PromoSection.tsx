'use client';

import { useModal } from '@/contexts/ModalContext';
import { CreditCard, Phone } from 'lucide-react';
import { PHONE_NUMBER } from '@/lib/utils';

export default function PromoSection() {
  const { openModal } = useModal();

  return (
    <section
      className="py-10 md:py-16 relative overflow-hidden"
      style={{ backgroundColor: '#334e64' }}
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
            <CreditCard className="w-4 h-4" style={{ color: '#F4B942' }} />
            Flexible Payment Plans
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            <span style={{ color: '#F4B942' }}>0% Financing</span> for 24 Months
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10">
            Start your renovation now and pay over time with monthly payments.
            <br className="hidden md:block" />
            We walk you through the payment plan at your free estimate.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'open_lead_form',
                    label: 'promo_section',
                  });
                }
                openModal();
              }}
              className="px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl cursor-pointer"
              style={{ backgroundColor: '#F4B942', color: '#ffffff' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#D4A030')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#F4B942')
              }
            >
              Get My Free Quote
            </button>
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'phone_click',
                    label: 'promo_section',
                  });
                }
              }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-lg text-white border-2 border-white/30 hover:bg-white/10 transition"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>

          <p className="text-xs md:text-sm text-gray-400 mt-6">
            Subject to credit approval. Terms and eligibility vary by project.
          </p>
        </div>
      </div>
    </section>
  );
}
