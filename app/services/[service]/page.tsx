import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Wrench, Users, CheckCircle } from 'lucide-react';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { services } from '@/lib/data/services';
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_NUMBER } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    service: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug,
  }));
}

// Enable dynamic rendering for on-demand pages
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = services.find(s => s.slug === serviceSlug);
  if (!service) return {};
  
  return {
    title: `${service.name} Seattle | ${BUSINESS_NAME}`,
    description: `${service.description} Licensed contractor serving Seattle, Bellevue, Tacoma. Call ${PHONE_DISPLAY} for a free estimate.`,
    keywords: `${service.name.toLowerCase()}, Seattle, ${service.slug}, home renovation, construction contractor`,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { service: serviceSlug } = await params;
  const service = services.find(s => s.slug === serviceSlug);
  
  if (!service) {
    notFound();
  }
  
  return (
    <>
      <Hero 
        title={`${service.name} in Seattle Area`}
        subtitle={`Professional ${service.name.toLowerCase()} services • Licensed & Insured • Free estimates`}
        applianceImage={service.image}
      />
      
      {/* Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {service.name} Services We Provide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.services.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-start gap-3">
                <div className="text-green-600 text-xl font-bold flex-shrink-0 mt-0.5">✓</div>
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
              Why Choose {BUSINESS_NAME}?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Licensed & Insured</h3>
              <p className="text-gray-600">
                Fully licensed contractor with comprehensive insurance coverage for your peace of mind.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Quick Response</h3>
              <p className="text-gray-600">
                Fast project estimates and clear communication throughout the entire construction process.
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
                Work directly with Vladislav - no middlemen, clear expectations, honest recommendations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Wrench className="w-10 h-10 text-green-600" />
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
              Professional {service.name} in Seattle, Bellevue, and Tacoma
            </h2>
            
            <div className="text-gray-700 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                {service.description}
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                With over 100 projects completed since 2017, <strong>{BUSINESS_NAME}</strong> delivers professional 
                {service.name.toLowerCase()} services across Seattle, Bellevue, Tacoma, and surrounding King County areas. 
                Vladislav Volkov, a licensed and insured contractor, provides direct communication, transparent pricing, 
                and takes full responsibility for every project.
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                Whether you're updating a single room or planning a complete transformation, we offer free estimates, 
                detailed construction plans, and quality inspection before project completion. Contact us today at{' '}
                <a href={`tel:${PHONE_NUMBER}`} className="text-green-600 font-semibold hover:underline">
                  {PHONE_DISPLAY}
                </a>{' '}
                to discuss your {service.name.toLowerCase()} project.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Other Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Other Services We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services
              .filter(s => s.slug !== serviceSlug)
              .map((otherService) => (
                <Link
                  key={otherService.slug}
                  href={`/services/${otherService.slug}`}
                  prefetch={false}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group"
                >
                  {otherService.image && (
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={otherService.image} 
                        alt={otherService.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {otherService.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{otherService.description}</p>
                    <span className="text-green-600 font-semibold hover:underline">
                      Learn more →
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
      
      <Reviews />
    </>
  );
}
