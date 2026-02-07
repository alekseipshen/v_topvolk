import { Zap, Award, Shield, DollarSign } from 'lucide-react';
import GoogleRating from './GoogleRating';
import HeroCTAButtons from './HeroCTAButtons';

export default function HeroHome() {
  return (
    <section 
      className="relative h-[calc(100vh-5rem)] md:h-auto md:py-20 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#c5ecf3]">
        <img
          src="/hero-appliance.jpg"
          alt="Home Renovation Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Gradient Overlay - Mobile (stronger for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/70 md:hidden z-[1]"></div>
      
      {/* Gradient Overlay - Desktop (lighter to show more background) */}
      <div className="hidden md:block absolute inset-0 bg-white/60 z-[1]"></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 h-full md:h-auto">
        <div className="h-full md:h-auto md:grid md:grid-cols-2 md:gap-8 md:items-center flex flex-col py-4 pb-6 md:py-0">
          <div className="flex flex-col h-full md:h-auto md:pl-4 lg:pl-8">
            <div className="text-center md:text-left mb-[50px] md:mt-0 md:mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 mb-4 md:mb-6">
                <GoogleRating />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6">
                Professional Home Renovation in Seattle
              </h1>

              <p className="text-lg md:text-xl text-gray-700 mb-0 md:mb-0">
                Quality kitchen remodels, bathroom renovations, and custom deck installations
              </p>
            </div>

            <div className="w-full mt-auto md:mt-0 flex flex-col">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-x-8 md:gap-y-3 mb-4 md:mb-0 order-1 md:order-2 md:mt-8">
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

              <HeroCTAButtons />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
