import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Wrench, Users, CheckCircle, MapPin } from 'lucide-react';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { services } from '@/lib/data/services';
import { getAllCities } from '@/lib/data/seattle-counties';
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_NUMBER } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    service: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  const allCities = getAllCities();
  const params: { service: string; city: string }[] = [];
  
  services.forEach((service) => {
    allCities.forEach((city) => {
      params.push({
        service: service.slug,
        city: city.slug,
      });
    });
  });
  
  return params;
}

// Enable dynamic rendering for on-demand pages
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = services.find(s => s.slug === serviceSlug);
  const allCities = getAllCities();
  const city = allCities.find(c => c.slug === citySlug);
  
  if (!service || !city) return {};
  
  return {
    title: `${service.name} in ${city.name} | ${BUSINESS_NAME}`,
    description: `Professional ${service.name.toLowerCase()} services in ${city.name}. ${service.description} Call ${PHONE_DISPLAY} for a free estimate.`,
    keywords: `${service.name.toLowerCase()}, ${city.name}, Seattle area, home renovation, construction contractor`,
  };
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = services.find(s => s.slug === serviceSlug);
  const allCities = getAllCities();
  const city = allCities.find(c => c.slug === citySlug);
  
  if (!service || !city) {
    notFound();
  }
  
  // Get other cities for this service (limit to 8)
  const otherCities = allCities.filter(c => c.slug !== city.slug).slice(0, 8);
  
  // Get other services (limit to 5)
  const otherServices = services.filter(s => s.slug !== service.slug).slice(0, 5);
  
  return (
    <>
      <Hero 
        title={`${service.name} in ${city.name}`}
        subtitle={`Professional ${service.name.toLowerCase()} services in ${city.name} and surrounding areas • Licensed & Insured • Free estimates`}
        applianceImage={service.image}
      />
      
      {/* Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {service.name} Services in {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.services.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-start gap-3">
                <div className="text-gold-500 text-xl font-bold flex-shrink-0 mt-0.5">✓</div>
                <h3 className="font-semibold text-gray-900 text-lg">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose {BUSINESS_NAME} in {city.name}?
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
              <h3 className="text-xl font-bold mb-3 text-gray-900">Licensed & Insured</h3>
              <p className="text-gray-600">
                Fully licensed contractor with comprehensive insurance coverage for your peace of mind.
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
              <h3 className="text-xl font-bold mb-3 text-gray-900">Local Service</h3>
              <p className="text-gray-600">
                Serving {city.name} and surrounding areas with fast response times and local expertise.
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
                Work directly with Vladislav - no middlemen, clear expectations, honest recommendations.
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
              <h3 className="text-xl font-bold mb-3 text-gray-900">Quality Guaranteed</h3>
              <p className="text-gray-600">
                100+ projects completed since 2017. Full responsibility with penalties for missed deadlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Professional {service.name} in {city.name}, WA
            </h2>
            
            <div className="text-gray-700 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                Looking for reliable <strong>{service.name.toLowerCase()}</strong> services in {city.name}? 
                {BUSINESS_NAME} provides professional construction and remodeling services throughout 
                {city.name} and the greater Seattle area.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                {service.description} With over 100 projects completed since 2017, Vladislav Volkov 
                delivers quality craftsmanship with direct communication and transparent pricing.
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                We serve homeowners throughout {city.name} with free estimates, detailed project plans, 
                and quality inspection before completion. Licensed, insured, and committed to your satisfaction 
                - with penalties paid if deadlines are missed.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-block text-center px-8 py-4 rounded-lg font-semibold text-lg transition shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#F4B942', color: '#ffffff' }}
              >
                Call {PHONE_DISPLAY}
              </a>
              <Link
                href="/#request-service"
                className="inline-block text-center bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-md hover:shadow-lg"
              >
                Request Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            We Also Serve Nearby Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {otherCities.map((otherCity) => (
              <Link
                key={otherCity.slug}
                href={`/services/${service.slug}/${otherCity.slug}`}
                className="bg-white p-4 rounded-lg hover:shadow-md transition text-center border border-gray-200"
              >
                <MapPin className="w-5 h-5 mx-auto mb-2 text-gold-500" />
                <span className="font-medium text-gray-900">{otherCity.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/#service-areas"
              className="text-gold-500 hover:text-gold-600 font-semibold"
            >
              View All Cities →
            </Link>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Other Services in {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {otherServices.map((otherService) => (
              <Link
                key={otherService.slug}
                href={`/services/${otherService.slug}/${city.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group border border-gray-200"
              >
                {otherService.image && (
                  <div className="w-full h-40 overflow-hidden">
                    <img 
                      src={otherService.image} 
                      alt={otherService.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {otherService.title}
                  </h3>
                  <span className="text-gold-500 font-semibold hover:underline">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/services"
              className="text-gold-500 hover:text-gold-600 font-semibold"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-gray-50">
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
