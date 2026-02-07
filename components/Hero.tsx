import { Zap, Award, Shield, DollarSign } from 'lucide-react';
import Image from 'next/image';
import GoogleRating from './GoogleRating';
import HeroCTAButtons from './HeroCTAButtons';
import HeroBackground from './HeroBackground';

interface HeroProps {
  title: string;
  subtitle?: string;
  city?: string;
  appliance?: string;
  brand?: string;
  brandLogo?: string;
  applianceImage?: string;
}

export default function Hero({ title, subtitle = 'Licensed contractor specializing in kitchen, bathroom, deck, and home renovations', brand, brandLogo, applianceImage }: HeroProps) {
  const backgroundImage = applianceImage || "/hero-bg.jpg";

  return (
    <section
      className="relative h-[calc(100vh-5rem)] md:h-auto md:py-20 overflow-hidden"
      style={{ backgroundColor: '#c5ecf3' }}
    >
      {/* Background image - no overlay so image is fully visible */}
      <div className="absolute inset-0 z-0">
        <HeroBackground path={backgroundImage} />
      </div>

      {/* Desktop Layout: Grid 2 columns (Left: content, Right: image) */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 h-full md:h-auto">
        <div className="h-full md:h-auto md:grid md:grid-cols-2 md:gap-8 md:items-center flex flex-col py-4 pb-6 md:py-0">
          {/* Left Column - Content (Desktop & Mobile) */}
          <div className="flex flex-col h-full md:h-auto md:pl-4 lg:pl-8">
            {/* Top Section - Text */}
            <div className="text-center md:text-left mb-[50px] md:mt-0 md:mb-8">
              {/* Google Rating and Brand Logo */}
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 mb-4 md:mb-6">
                <GoogleRating />
                {brandLogo && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                    <Image
                      src={brandLogo}
                      alt={brand ? `${brand} Logo` : 'Brand Logo'}
                      width={120}
                      height={48}
                      className="h-10 md:h-12 w-auto object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Main Heading - text shadow for readability on photo */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                {title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-700 mb-0 md:mb-0 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                {subtitle}
              </p>
            </div>

            {/* Bottom Section - Badges & Buttons (прижато к низу на мобайле) */}
            <div className="w-full mt-auto md:mt-0 flex flex-col">
              {/* Trust Badges - На мобайле ПЕРВЫМИ (order-1), на десктопе ВТОРЫМИ (md:order-2) */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-x-8 md:gap-y-3 mb-4 md:mb-0 order-1 md:order-2 md:mt-8">
                {/* Mobile: с фоном, Desktop: без фона, горизонтально */}
                <div className="bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 md:p-0 rounded md:rounded-none shadow-md md:shadow-none text-center md:text-left flex md:flex-row flex-col md:items-center md:gap-3">
                  <Zap className="w-6 h-6 mx-auto md:mx-0 mb-1 md:mb-0 text-gold-500" />
                  <div className="font-semibold text-xs md:text-base text-gray-900">Same-Day Response</div>
                </div>
                <div className="bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 md:p-0 rounded md:rounded-none shadow-md md:shadow-none text-center md:text-left flex md:flex-row flex-col md:items-center md:gap-3">
                  <Award className="w-6 h-6 mx-auto md:mx-0 mb-1 md:mb-0 text-gold-500" />
                  <div className="font-semibold text-xs md:text-base text-gray-900">Since 2017 • 100+ Projects</div>
                </div>
                <div className="bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 md:p-0 rounded md:rounded-none shadow-md md:shadow-none text-center md:text-left flex md:flex-row flex-col md:items-center md:gap-3">
                  <Shield className="w-6 h-6 mx-auto md:mx-0 mb-1 md:mb-0 text-gold-500" />
                  <div className="font-semibold text-xs md:text-base text-gray-900">Fully Insured</div>
                </div>
                <div className="bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 md:p-0 rounded md:rounded-none shadow-md md:shadow-none text-center md:text-left flex md:flex-row flex-col md:items-center md:gap-3">
                  <DollarSign className="w-6 h-6 mx-auto md:mx-0 mb-1 md:mb-0 text-gold-500" />
                  <div className="font-semibold text-xs md:text-base text-gray-900">Upfront Pricing</div>
                </div>
              </div>

              {/* CTA Buttons - Client Component */}
              <HeroCTAButtons />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
