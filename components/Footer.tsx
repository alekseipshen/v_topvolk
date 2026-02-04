'use client';

import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_NUMBER, BUSINESS_EMAIL, BUSINESS_NAME, BUSINESS_ADDRESS, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '@/lib/utils';
import { services } from '@/lib/data/services';
import { seattleCounties } from '@/lib/data/seattle-counties';

export default function Footer() {
  // Major renovation services
  const majorServices = services.slice(0, 6);
  
  // Seattle area counties we serve
  const serviceAreas = seattleCounties.map(county => ({
    name: county.name,
    slug: county.slug,
    cityCount: county.totalCities
  }));

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">{BUSINESS_NAME}</h3>
            <p className="text-sm mb-2">Serving Seattle Area</p>
            <p className="mb-2">
              <a 
                href={`tel:${PHONE_NUMBER}`} 
                onClick={() => {
                  // GTM Event - Phone Click
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      event: 'phone_click',
                    });
                  }
                }}
                className="hover:text-white transition"
              >
                {PHONE_DISPLAY}
              </a>
            </p>
            <p className="mb-2">
              <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-white transition text-sm">
                {BUSINESS_EMAIL}
              </a>
            </p>
            <p className="text-sm mt-4">100+ Projects Since 2017</p>
            <p className="text-sm">Licensed & Insured</p>
            <p className="text-sm">{GOOGLE_RATING}★ Rating ({GOOGLE_REVIEW_COUNT} reviews)</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {majorServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-white transition text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-white font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/#service-areas`}
                    className="hover:text-white transition text-sm"
                  >
                    {area.name}
                    <span className="text-gray-500 ml-1">({area.cityCount})</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/#service-areas"
                  className="hover:text-white transition text-sm font-semibold"
                >
                  View All 56 Cities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get Free Quote</h4>
            <p className="text-sm mb-4">Quick response time</p>
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => {
                // GTM Event - Phone Click
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'phone_click',
                  });
                }
              }}
              className="text-white px-6 py-3 rounded-lg transition font-semibold inline-block mb-6 text-center"
              style={{ backgroundColor: '#33ac38' }}
            >
              {PHONE_DISPLAY}
            </a>
            
            <h4 className="text-white font-semibold mb-3 mt-6">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:text-white transition">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/ca-notice-at-collection" className="hover:text-white transition">
                  CA Notice at Collection
                </Link>
              </li>
              <li>
                <Link href="/do-not-sell" className="hover:text-white transition">
                  Do Not Sell My Info
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-4xl mx-auto text-xs text-gray-400 text-center space-y-2">
            <p>
              <strong className="text-gray-300">{BUSINESS_NAME}</strong> - Professional construction contractor specializing in residential remodeling and custom builds. Licensed and insured contractor serving Seattle, Bellevue, Tacoma, and surrounding King County areas since 2017.
            </p>
            <p>
              All project estimates are provided free of charge. We take full responsibility for every project and maintain direct communication with our clients throughout the construction process.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}




