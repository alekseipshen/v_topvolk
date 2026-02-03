import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { services } from '@/lib/data/services';
import { cities } from '@/lib/data/cities';
import { CheckCircle, Clock, Users, Wrench, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Professional Home Renovation in Seattle"
        subtitle="Quality kitchen remodels, bathroom renovations, and custom deck installations"
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
                Professional construction contractor with extensive experience in residential remodeling and custom builds.
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
                Fast communication and project estimates. We respect your time and keep you informed every step.
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
                No middlemen - you communicate directly with Vladislav. Clear expectations and honest recommendations.
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
                Detailed estimates with no hidden fees. Full responsibility - penalties paid if deadlines are missed.
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
                Transform your home with <strong>TopVolk Construction LLC</strong> - a professional construction contractor 
                specializing in residential remodeling. Since 2017, Vladislav Volkov has completed over 100 projects across 
                Seattle, Bellevue, Tacoma, and surrounding King County areas.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                From <strong>kitchen remodels</strong> and <strong>bathroom renovations</strong> to custom <strong>deck installations</strong> 
                and complete home transformations, we deliver quality craftsmanship with direct communication and transparent pricing. 
                Licensed, insured, and committed to your satisfaction - with penalties paid if deadlines are missed.
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
                href={`/services/${service.slug}`}
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

      {/* Service Areas */}
      <section id="service-area" className="py-16 bg-white">
                <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Areas in Seattle
            </h2>
            <p className="text-xl text-gray-600">
              We serve Seattle, Bellevue, Tacoma, and surrounding King County areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Seattle', slug: 'seattle', description: 'Capitol Hill, Queen Anne, Ballard, Fremont, West Seattle' },
              { name: 'Bellevue', slug: 'bellevue', description: 'Downtown Bellevue, Factoria, Crossroads, Wilburton' },
              { name: 'Redmond', slug: 'redmond', description: 'Downtown Redmond, Education Hill, Overlake, Bear Creek' },
              { name: 'Kirkland', slug: 'kirkland', description: 'Downtown Kirkland, Totem Lake, Juanita, Houghton' },
              { name: 'Renton', slug: 'renton', description: 'Downtown Renton, Highlands, Kennydale, East Renton' },
              { name: 'Tacoma', slug: 'tacoma', description: 'Downtown Tacoma, North End, Stadium District, Proctor' }
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
            <p className="text-gray-600 text-lg">
              Serving all of King County and surrounding areas
            </p>
          </div>
        </div>

      </section>

      {/* Reviews */}
      <Reviews />
    </>
  );
}
