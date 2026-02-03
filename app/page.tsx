import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import BrandsSection from '@/components/BrandsSection';
import { services } from '@/lib/data/services';
import { cities } from '@/lib/data/cities';
import { CheckCircle, Clock, Users, Wrench, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Professional Home Renovation in Seattle Area"
        subtitle="Kitchen remodels, bathroom renovations, deck installations, and complete home transformations"
      />

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TopVolk Construction?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">100+ Projects Since 2017</h3>
              <p className="text-gray-600">
                Professional contractor with extensive experience in residential renovation. Quality inspection before project completion.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Quick Response Time</h3>
              <p className="text-gray-600">
                Fast estimates and scheduling. Flexible availability across Seattle area. Penalties if we miss agreed deadlines.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Direct Communication</h3>
              <p className="text-gray-600">
                Work directly with Vladislav - no middlemen. Clear project communication and quick response to messages.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Wrench className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Transparent Pricing</h3>
              <p className="text-gray-600">
                Detailed quotes before work begins. No hidden fees. Honest recommendations - won't push unnecessary demolition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Expert Home Renovation Services in Seattle
            </h2>
            
            <div className="text-gray-700 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                Need a kitchen remodel or bathroom renovation? Looking to build a custom deck or transform your entire home? 
                <strong> TopVolk Construction LLC</strong> specializes in residential renovation projects across Seattle, Bellevue, 
                and Tacoma areas. Licensed contractor with 100+ completed projects since 2017.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                Vladislav Volkov personally oversees every project with full licensing and insurance. <strong>Direct communication</strong>, 
                detailed quotes before work begins, and quality inspection before completion. We take full responsibility - 
                penalties apply if deadlines are missed. Honest recommendations and transparent pricing you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Complete home renovation solutions for Seattle area homeowners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}-repair`}
                prefetch={false}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group"
              >
                {service.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <span className="text-green-600 font-semibold hover:underline">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Brands We Service */}
      <BrandsSection />

      {/* Service Areas */}
      <section id="service-area" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Areas in Texas
            </h2>
            <p className="text-xl text-gray-600">
              We serve Houston, Dallas, Austin, and San Antonio metro areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Houston', slug: 'houston', description: '46 cities including Katy, Sugar Land, The Woodlands' },
              { name: 'Dallas-Fort Worth', slug: 'dallas', description: '92 cities including Plano, Frisco, Irving' },
              { name: 'Austin', slug: 'austin', description: '26 cities including Round Rock, Cedar Park, Georgetown' },
              { name: 'San Antonio', slug: 'san-antonio', description: '27 cities including Alamo Heights, Helotes' }
            ].map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas#${area.slug}`}
                prefetch={false}
                className="bg-gray-50 p-6 rounded-lg hover:bg-green-50 hover:shadow-lg transition border border-gray-200 cursor-pointer"
              >
                <h3 className="font-bold text-xl text-gray-900 mb-2">{area.name}</h3>
                <p className="text-sm text-gray-600">{area.description}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/service-areas"
              prefetch={false}
              className="inline-block text-green-600 hover:text-green-700 font-semibold text-lg hover:underline"
            >
              View all 227 cities we serve →
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />
    </>
  );
}
