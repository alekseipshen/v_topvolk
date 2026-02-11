import { cities } from '@/lib/data/cities';
import { counties } from '@/lib/data/counties';
import { MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { PHONE_NUMBER, PHONE_DISPLAY, BUSINESS_NAME } from '@/lib/utils';

export const metadata = {
  title: 'Service Areas | Home Renovation in Seattle, Bellevue, Tacoma & King County',
  description: 'TopVolk Construction serves 65+ cities across the Seattle metro area. Professional home renovation in King, Snohomish, Pierce & Kitsap counties. Call (206) 591-1096.',
};

export default function ServiceAreasPage() {
  // Group cities by county
  const citiesByCounty: Record<string, typeof cities> = {};
  
  cities.forEach((city) => {
    if (!citiesByCounty[city.county]) {
      citiesByCounty[city.county] = [];
    }
    citiesByCounty[city.county].push(city);
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 to-gold-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We Serve the Entire Seattle Metro Area
            </h1>
            <p className="text-xl md:text-2xl text-gold-100 mb-8">
              Professional home renovation services across King, Snohomish, Pierce & Kitsap counties
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition cursor-pointer"
                style={{ backgroundColor: '#334e64' }}
              >
                <Phone className="w-6 h-6" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Professional Home Renovation Throughout Greater Seattle
            </h2>
            <div className="text-gray-700 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                Since 2017, <strong>{BUSINESS_NAME}</strong> has been the trusted choice for home 
                renovation across the Seattle metropolitan area. Our experienced team delivers quality 
                craftsmanship for kitchen remodels, bathroom renovations, deck installations, and more.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                We work with homeowners throughout King County, Snohomish County, Pierce County, and Kitsap County. 
                Licensed, insured, and committed to exceeding expectations on every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Major Service Areas Overview */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Service Regions
            </h2>
            <p className="text-xl text-gray-600">
              Serving 4 counties across the Seattle metro area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
            {counties.map((county) => {
              const countyCount = citiesByCounty[county.slug]?.length || 0;
              return (
                <a
                  key={county.slug}
                  href={`#${county.slug}`}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition border-2 border-transparent hover:border-gold-500"
                >
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{county.name}</h3>
                  <p className="text-sm text-gray-600">{countyCount} cities</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities by Region */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cities We Serve by Region
            </h2>
            <p className="text-xl text-gray-600">
              Click on any city to see available renovation services
            </p>
          </div>

          <div className="space-y-12 max-w-7xl mx-auto">
            {counties.map((county) => {
              const countyCities = citiesByCounty[county.slug] || [];
              return (
                <div 
                  key={county.slug} 
                  id={county.slug}
                  className="bg-gray-50 rounded-lg shadow-lg p-6 md:p-8 scroll-mt-32"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gold-500">
                    {county.name} <span className="text-gray-500 text-xl">({countyCities.length} cities)</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {countyCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/cities/${city.slug}`}
                        prefetch={false}
                        className="bg-white p-3 rounded-lg hover:bg-gold-50 hover:shadow-md transition text-center border border-gray-200 cursor-pointer"
                      >
                        <span className="text-sm md:text-base font-medium text-gray-900">{city.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don&apos;t See Your City?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              We serve all areas within the greater Seattle region. Call us to discuss your renovation project.
            </p>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition cursor-pointer"
              style={{ backgroundColor: '#F4B942' }}
            >
              <Phone className="w-6 h-6" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
