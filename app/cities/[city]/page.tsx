import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Calendar } from 'lucide-react';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { LocalBusinessSchema, BreadcrumbSchema, FAQSchema } from '@/components/StructuredData';
import { getAllCities, seattleCounties, getCountiesForCity } from '@/lib/data/seattle-counties';
import { featuredServices } from '@/lib/data/services';
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_NUMBER } from '@/lib/utils';

const SITE_URL = 'https://www.topvolk.org';

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
    title: `Home Renovation in ${city.name}, WA`,
    description: `Home renovation in ${city.name}, WA: kitchens, bathrooms, decks, basements. Licensed contractor since 2023. Call ${PHONE_DISPLAY}.`,
    keywords: `home renovation ${city.name}, construction contractor ${city.name}, remodeling ${city.name}, Seattle area contractor`,
    alternates: {
      canonical: `${SITE_URL}/cities/${city.slug}`,
    },
    openGraph: {
      title: `Home Renovation in ${city.name}, WA | ${BUSINESS_NAME}`,
      description: `Home renovation in ${city.name}, WA. Licensed contractor since 2023.`,
      url: `${SITE_URL}/cities/${city.slug}`,
    },
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

  const primaryCounty = cityCounties[0]?.name;
  const localArea = countyNames || 'Western & Central Washington';

  // Query-targeted service depth for this city. Only VISIBLE services are
  // listed here — Home Additions, Electrical, Plumbing, Foundation Repair and
  // other insurance-restricted trades are intentionally excluded (see
  // lib/data/services.ts `hidden` flag). Each block links to the matching
  // /services/{slug}/{city} page to concentrate internal-link relevance.
  const serviceHighlights = [
    {
      slug: 'kitchen-remodel',
      heading: `Kitchen Remodeling in ${city.name}`,
      body: `Custom kitchen remodels for ${city.name} homeowners — new cabinets, quartz and granite countertops, tile backsplashes, and smarter layouts. We manage the full kitchen renovation from demo to final walkthrough, keeping the project on schedule and on budget.`,
    },
    {
      slug: 'bathroom-remodel',
      heading: `Bathroom Remodeling in ${city.name}`,
      body: `From a quick refresh to a full bathroom remodel, we install walk-in showers, soaking tubs, custom vanities, and waterproof tile for homes across ${city.name}. Every ${city.name} bathroom renovation is built to code and finished with a quality inspection.`,
    },
    {
      slug: 'general-contracting',
      heading: `Whole-Home Renovation in ${city.name}`,
      body: `As a licensed general contractor, we handle whole-home renovations and multi-room remodels throughout ${city.name}${primaryCounty ? ` in ${primaryCounty}` : ''}. One team owns planning, permits, and construction so your ${city.name} home remodel stays coordinated from start to finish.`,
    },
    {
      slug: 'basement-finishing',
      heading: `Basement Finishing in ${city.name}`,
      body: `Turn an unused basement into livable square footage — a family room, home office, or guest suite. Our ${city.name} basement finishing covers framing, insulation, moisture control, and flooring.`,
    },
    {
      slug: 'deck-installation',
      heading: `Decks & Outdoor Living in ${city.name}`,
      body: `Custom decks, patios, and pergolas built for the Pacific Northwest climate. We design durable outdoor living spaces for ${city.name} homes using composite or premium wood decking.`,
    },
    {
      slug: 'flooring-installation',
      heading: `Flooring Installation in ${city.name}`,
      body: `Hardwood, laminate, luxury vinyl, and tile flooring installed throughout ${city.name}. Careful subfloor prep and precise installation give you floors that last.`,
    },
  ];

  const faqs = [
    {
      question: `Do you offer free estimates in ${city.name}, WA?`,
      answer: `Yes. We provide a free, no-obligation written estimate for every ${city.name} project, with a detailed scope and transparent pricing before any work begins.`,
    },
    {
      question: `Are you a licensed and insured contractor in ${city.name}?`,
      answer: `${BUSINESS_NAME} is a licensed and insured Washington construction contractor serving ${city.name} and ${localArea}. Our work is permitted and inspected to meet local code.`,
    },
    {
      question: `What home renovation services do you offer in ${city.name}?`,
      answer: `We handle kitchen remodeling, bathroom remodeling, whole-home renovations, basement finishing, decks, and flooring for ${city.name} homeowners — from single-room updates to complete remodels.`,
    },
    {
      question: `How long does a kitchen or bathroom remodel take in ${city.name}?`,
      answer: `Most bathroom remodels take two to four weeks and kitchen remodels four to eight weeks, depending on scope. We give ${city.name} clients a firm timeline up front and pay penalties if agreed deadlines are missed.`,
    },
    {
      question: `Which areas near ${city.name} do you serve?`,
      answer: `Along with ${city.name}, we serve ${nearbyCities.slice(0, 4).map(c => c.name).join(', ') || localArea} and the wider Seattle metro area.`,
    },
  ];

  return (
    <>
      {/* Structured Data */}
      <LocalBusinessSchema city={city.name} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Service Areas', url: `${SITE_URL}/service-areas` },
          { name: city.name, url: `${SITE_URL}/cities/${city.slug}` },
        ]}
      />
      <FAQSchema items={faqs} />

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
                {city.name} and surrounding communities in {countyNames}.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                From kitchen remodels and bathroom renovations to custom deck installations and complete 
                home transformations, we deliver quality craftsmanship with direct communication and 
                transparent pricing. With over 100 projects completed since 2023, Vladislav Volkov is 
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

      {/* Query-targeted service depth + contextual internal links */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Home Renovation Services in {city.name}, WA
            </h2>
            <div className="space-y-8">
              {serviceHighlights.map((sh) => (
                <div key={sh.slug}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {sh.heading}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    {sh.body}{' '}
                    <Link
                      href={`/services/${sh.slug}/${citySlug}`}
                      prefetch={false}
                      className="text-gold-500 font-semibold hover:underline"
                    >
                      Learn more about {sh.heading.replace(` in ${city.name}`, '')} in {city.name} →
                    </Link>
                  </p>
                </div>
              ))}
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
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
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

      {/* Local FAQ — long-tail depth + matches FAQPage schema above */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {city.name} Home Renovation FAQ
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
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
