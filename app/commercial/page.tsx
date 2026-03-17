import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { LocalBusinessSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { commercialAppliances } from '@/lib/data/appliances';
import { Building2, Wrench, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

const SITE_URL = 'https://www.topvolk.org';

export const metadata: Metadata = {
  title: 'Commercial Construction Services | TopVolk Construction',
  description: 'Professional commercial construction and renovation services in Seattle, WA. Office build-outs, restaurant renovations, retail remodeling. Licensed contractor serving King, Snohomish, and Pierce Counties.',
  keywords: 'commercial construction, commercial renovation, business remodeling, Seattle, WA',
  alternates: {
    canonical: `${SITE_URL}/commercial`,
  },
  openGraph: {
    title: 'Commercial Construction Services | TopVolk Construction',
    description: 'Professional commercial construction and renovation services in Seattle, WA.',
    url: `${SITE_URL}/commercial`,
  },
};

export default function CommercialPage() {
  return (
    <>
      {/* Structured Data */}
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Commercial Services', url: `${SITE_URL}/commercial` },
        ]}
      />

      {/* Hero Section */}
      <Hero
        title="Commercial Construction Services in Seattle, WA"
        subtitle="Professional construction and renovation services for businesses"
      />

      {/* SEO Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Expert Commercial Construction & Renovation
            </h2>

            <div className="text-gray-700 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                Need a reliable commercial contractor in Seattle? We specialize in office build-outs, restaurant
                renovations, retail remodeling, and commercial facility upgrades across the greater Seattle area.
                Our experienced team understands that downtime costs your business money.
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                <strong>TopVolk Construction</strong> provides professional commercial construction services with
                transparent pricing, detailed project plans, and on-time delivery. Licensed, insured, and committed
                to minimizing disruption to your business operations.
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
              <h3 className="text-xl font-bold mb-3 text-gray-900">On-Time Delivery</h3>
              <p className="text-gray-600">
                We understand downtime costs money. Detailed timelines with penalties for missed deadlines.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">100+ Projects Since 2017</h3>
              <p className="text-gray-600">
                Years of experience in both residential and commercial construction across the Seattle area.
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
                Office build-outs, restaurant renovations, retail spaces, and commercial facility upgrades.
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
                Detailed estimates with no hidden fees. Fully licensed and insured for commercial work.
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
              Commercial Services We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional construction and renovation services for businesses
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
