import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { commercialAppliances } from '@/lib/data/appliances';
import { Building2, Wrench, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Appliance Repair NJ | Max Appliance Service',
  description: 'Professional commercial appliance repair services in Texas. Fast, reliable repairs for restaurants, hotels, and businesses. Same-day service available.',
  keywords: 'commercial appliance repair, commercial refrigeration, restaurant equipment repair, Texas',
};

export default function CommercialPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Commercial Appliance Repair in Texas"
        subtitle="Professional repair services for restaurants, hotels, and businesses"
      />

      {/* SEO Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Expert Commercial Equipment Repair
            </h2>
            
            <div className="text-gray-700 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                Your commercial refrigerator down? Commercial mixer not working? We specialize in fast, reliable 
                repairs for restaurants, hotels, and businesses across Texas. Our factory-trained technicians 
                understand that downtime costs you money.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                <strong>Max Appliance Service</strong> provides <strong>same-day commercial repair</strong> for 
                all major brands. Upfront pricing, solid warranty, and 20+ years of experience keeping Texas 
                businesses running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Commercial */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Businesses Trust Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Same-Day Service</h3>
              <p className="text-gray-600">
                We understand downtime costs money. Fast response for urgent commercial repairs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">20+ Years Experience</h3>
              <p className="text-gray-600">
                Decades of experience repairing commercial equipment for NJ businesses.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Commercial Specialists</h3>
              <p className="text-gray-600">
                Factory-trained technicians for restaurants, hotels, and commercial kitchens.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Wrench className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Upfront Pricing</h3>
              <p className="text-gray-600">
                Transparent pricing and solid warranty. Fully insured for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Services */}
      <section id="commercial-services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commercial Equipment We Repair
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional repair services for all commercial appliances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {commercialAppliances.map((appliance) => {
              const applianceSlug = appliance.slug.replace('commercial-', '');
              
              return (
                <Link
                  key={appliance.slug}
                  href={`/commercial/${applianceSlug}`}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {appliance.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{appliance.description}</p>
                  <span className="text-green-600 font-semibold hover:underline">
                    Learn more →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />
    </>
  );
}


