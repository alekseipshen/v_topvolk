'use client';

import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_NUMBER, BUSINESS_EMAIL, BUSINESS_NAME, BUSINESS_ADDRESS } from '@/lib/utils';
import { appliances } from '@/lib/data/appliances';

export default function Footer() {
  // Major appliance categories grouped logically
  const majorAppliances = appliances.slice(0, 12);
  
  // 4 major cities we serve in Texas
  const serviceAreas = [
    { name: 'Houston Area', slug: 'houston' },
    { name: 'Dallas-Fort Worth', slug: 'dallas' },
    { name: 'Austin Area', slug: 'austin' },
    { name: 'San Antonio Area', slug: 'san-antonio' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">{BUSINESS_NAME}</h3>
            <p className="text-sm mb-2">Serving Texas</p>
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
            <p className="text-sm mt-4">20+ years of experience</p>
            <p className="text-sm">Fully Insured</p>
            <p className="text-sm">4.8★ Rating (3,400+ reviews)</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {majorAppliances.map((appliance) => (
                <li key={appliance.slug}>
                  <Link
                    href={`/services/${appliance.slug}-repair`}
                    className="hover:text-white transition text-sm"
                  >
                    {appliance.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/commercial"
                  className="hover:text-white transition text-sm font-semibold"
                >
                  Commercial Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas (Major Cities) */}
          <div>
            <h4 className="text-white font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/service-areas#${area.slug}`}
                    className="hover:text-white transition text-sm"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/service-areas"
                  className="hover:text-white transition text-sm font-semibold"
                >
                  View All 227 Cities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get Free Quote</h4>
            <p className="text-sm mb-4">Same-day service available</p>
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
              <strong className="text-gray-300">Independent Service Disclaimer:</strong> {BUSINESS_NAME} is an independent appliance repair service provider and is not affiliated with, authorized by, or endorsed by any of the appliance brands or manufacturers mentioned on this website.
            </p>
            <p>
              We provide independent, out-of-warranty repair services for all major appliance brands. All brand names, logos, and trademarks displayed on this website are the property of their respective owners and are used for informational purposes only to indicate the types of appliances we service.
            </p>
            <p>
              The use of these brand names and logos does not imply any affiliation with or endorsement by the respective trademark holders.
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




