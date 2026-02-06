import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { featuredServices } from '@/lib/data/services';
import { seattleCounties } from '@/lib/data/seattle-counties';
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
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}
                >
                  <CheckCircle className="w-10 h-10" style={{ color: '#F4B942' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">100+ Projects Since 2017</h3>
              <p className="text-gray-600">
                Professional construction contractor with extensive experience in residential remodeling and custom builds.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}
                >
                  <Clock className="w-10 h-10" style={{ color: '#F4B942' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Quick Response Time</h3>
              <p className="text-gray-600">
                Fast communication and project estimates. We respect your time and keep you informed every step.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}
                >
                  <Users className="w-10 h-10" style={{ color: '#F4B942' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Direct Communication</h3>
              <p className="text-gray-600">
                No middlemen - you communicate directly with Vladislav. Clear expectations and honest recommendations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}
                >
                  <Wrench className="w-10 h-10" style={{ color: '#F4B942' }} />
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
      <section id="our-services" className="py-16 bg-white">
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
            {featuredServices.map((service) => (
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
                  <span className="text-gold-500 font-semibold hover:underline">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-lg transition shadow-md hover:shadow-lg"
              style={{ backgroundColor: '#F4B942', color: '#ffffff' }}
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section id="service-areas" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Areas in Seattle
            </h2>
            <p className="text-xl text-gray-600">
              Serving 3 counties with 56 cities across the greater Seattle area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {seattleCounties.map((county) => (
              <div
                key={county.slug}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200"
              >
                <h3 className="font-bold text-2xl text-gray-900 mb-4 pb-3 border-b border-gray-300">
                  {county.name}
                  <span className="text-sm font-normal text-gray-500 ml-2">({county.totalCities} cities)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {county.cities.map((city, index) => (
                    <Link
                      key={index}
                      href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm bg-white px-3 py-1.5 rounded border border-gray-300 hover:border-gold-500 hover:bg-gold-50 transition"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg mb-4">
              Can't find your city? We serve all of King, Snohomish, and Pierce Counties
            </p>
            <Link
              href={`tel:${require('@/lib/utils').PHONE_NUMBER}`}
              className="inline-block bg-gold-500 hover:bg-gold-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Call for a Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Our Recent Home Renovation Works */}
      <section id="works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Recent Home Renovation Works
            </h2>
            <p className="text-xl text-gray-600">
              Take a look at some of our completed projects in the Seattle area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Project placeholders - will be replaced with real images */}
            {[
              { title: 'Modern Kitchen Remodel', location: 'Seattle, WA', description: 'Complete kitchen transformation with custom cabinets and quartz countertops' },
              { title: 'Luxury Bathroom Renovation', location: 'Bellevue, WA', description: 'Spa-like bathroom with heated floors and walk-in shower' },
              { title: 'Custom Deck Installation', location: 'Redmond, WA', description: 'Multi-level composite deck with built-in seating' },
              { title: 'Basement Finishing', location: 'Kirkland, WA', description: 'Transformed unfinished basement into family entertainment space' },
              { title: 'Master Suite Addition', location: 'Tacoma, WA', description: 'Added master bedroom with ensuite bathroom and walk-in closet' },
              { title: 'Whole House Remodel', location: 'Renton, WA', description: 'Complete home renovation including kitchen, bathrooms, and flooring' }
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Project Photo Coming Soon</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gold-500 font-semibold mb-2">{project.location}</p>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg">
              Want to see your project featured here? Contact us for a free consultation!
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <div id="reviews">
        <Reviews />
      </div>
    </>
  );
}
