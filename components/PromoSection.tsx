'use client';

import { useWeeklyCountdown } from '@/hooks/useWeeklyCountdown';
import { useModal } from '@/contexts/ModalContext';
import { Clock, Phone } from 'lucide-react';
import { PHONE_NUMBER } from '@/lib/utils';

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="text-3xl md:text-5xl font-extrabold text-white px-3 py-2 md:px-5 md:py-3 rounded-lg min-w-[60px] md:min-w-[80px] text-center"
        style={{ backgroundColor: '#1f2937' }}
      >
        {pad(value)}
      </div>
      <span className="text-xs md:text-sm text-gray-300 mt-1 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function PromoSection() {
  const { days, hours, minutes, seconds, isExpired } = useWeeklyCountdown();
  const { openModal } = useModal();

  if (isExpired) return null;

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
            <Clock className="w-4 h-4" style={{ color: '#F4B942' }} />
            Limited Time Offer
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            <span style={{ color: '#F4B942' }}>15% OFF</span> All Labor
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10">
            Book your renovation this week and save on labor costs.
            <br className="hidden md:block" />
            Materials are billed separately and are not included in the discount.
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-3 md:gap-5 mb-8 md:mb-10">
            <CountdownBlock value={days} label="Days" />
            <div className="text-3xl md:text-5xl font-bold text-white/30 self-start pt-2 md:pt-3">
              :
            </div>
            <CountdownBlock value={hours} label="Hours" />
            <div className="text-3xl md:text-5xl font-bold text-white/30 self-start pt-2 md:pt-3">
              :
            </div>
            <CountdownBlock value={minutes} label="Min" />
            <div className="text-3xl md:text-5xl font-bold text-white/30 self-start pt-2 md:pt-3">
              :
            </div>
            <CountdownBlock value={seconds} label="Sec" />
          </div>

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
              Claim Your 15% Discount
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
        </div>
      </div>
    </section>
  );
}
