import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, Calendar } from 'lucide-react';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { getAllCities, seattleCounties, getCountiesForCity } from '@/lib/data/seattle-counties';
import { services } from '@/lib/data/services';
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_NUMBER } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  const allCities = getAllCities();
  return allCities.map((city) => ({
    city: city.slug,
  }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const allCities = getAllCities();
  const city = allCities.find(c => c.slug === citySlug);
  
  if (!city) return {};
  
  return {
    title: `Home Renovation & Construction Services in ${city.name} | ${BUSINESS_NAME}`,
    description: `Professional home renovation, remodeling, and construction services in ${city.name}, WA. Kitchen remodels, bathroom renovations, deck installations. Call ${PHONE_DISPLAY} for a free estimate.`,
    keywords: `home renovation ${city.name}, construction contractor ${city.name}, remodeling ${city.name}, Seattle area contractor`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const allCities = getAllCities();
  const city = allCities.find(c => c.slug === citySlug);
  
  if (!city) {
    notFound();
  }
  
  // Get counties this city belongs to
  const cityCounties = getCountiesForCity(city.name);
  const countyNames = cityCounties.map(c => c.name).join(' and ');
  
  // Get nearby cities (from same county, limit to 8)
  const nearbyCities = cityCounties.length > 0 
    ? cityCounties[0].cities
        .filter(c => c !== city.name)
        .slice(0, 8)
        .map(cityName => ({
          name: cityName,
          slug: cityName.toLowerCase().replace(/\s+/g, '-')
        }))
    : [];
  
  // Featured services (first 6)
  const featuredServices = services.slice(0, 6);
  
  return (
    <>
      <Hero 
        title={`Home Renovation Services in ${city.name}`}
        subtitle={`Professional construction and remodeling services in ${city.name} and surrounding areas • Licensed & Insured • Free estimates`}
      />
      
      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Professional Construction Contractor Serving {city.name}, WA
            </h2>
            
            <div className="text-gray-700 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                Looking for a reliable construction contractor in <strong>{city.name}</strong>? 
                {BUSINESS_NAME} provides professional home renovation and remodeling services throughout 
                {city.name} and the greater Seattle area in {countyNames}.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                From kitchen remodels and bathroom renovations to custom deck installations and complete 
                home transformations, we deliver quality craftsmanship with direct communication and 
                transparent pricing. With over 100 projects completed since 2017, Vladislav Volkov is 
                your trusted local contractor.
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                We serve homeowners throughout {city.name} with free estimates, detailed project plans, 
                and quality inspection before completion. Licensed, insured, and committed to your satisfaction 
                - with penalties paid if deadlines are missed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services in {city.name}
            </h2>
            <p className="text-xl text-gray-600">
              Complete home renovation solutions for {city.name} homeowners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/${citySlug}`}
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
                    {service.title} in {city.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
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

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Project in {city.name}?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact us today for a free estimate and consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#F4B942', color: '#ffffff' }}
              >
                <Phone className="w-5 h-5" />
                Call {PHONE_DISPLAY}
              </a>
              <Link
                href="/#request-service"
                className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-md hover:shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Request Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              We Also Serve Nearby Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/cities/${nearbyCity.slug}`}
                  className="bg-white p-4 rounded-lg hover:shadow-md transition text-center border border-gray-200"
                >
                  <MapPin className="w-5 h-5 mx-auto mb-2 text-gold-500" />
                  <span className="font-medium text-gray-900">{nearbyCity.name}</span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/#service-areas"
                className="text-gold-500 hover:text-gold-600 font-semibold"
              >
                View All Service Areas →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our {city.name} Customers Say
          </h2>
          <Reviews />
        </div>
      </section>
    </>
  );
}
