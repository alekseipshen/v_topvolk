import Link from 'next/link';
import type { Metadata } from 'next';
import { Home, Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_NUMBER, BUSINESS_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for could not be found.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <div className="text-7xl md:text-8xl font-bold text-gray-300 mb-4 select-none">
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you were looking for doesn't exist or has been moved.
          {' '}
          {BUSINESS_NAME} is still here to help with your home renovation project.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition"
            style={{ backgroundColor: '#F4B942' }}
          >
            <Phone className="w-5 h-5" />
            Call {PHONE_DISPLAY}
          </a>
        </div>

        <div className="text-left bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Popular pages
          </h2>
          <ul className="space-y-2">
            <li>
              <Link href="/services/general-contracting" className="text-gold-500 hover:underline">
                General Contracting in Seattle Area
              </Link>
            </li>
            <li>
              <Link href="/services/bathroom-remodel" className="text-gold-500 hover:underline">
                Bathroom Remodeling
              </Link>
            </li>
            <li>
              <Link href="/services/kitchen-remodel" className="text-gold-500 hover:underline">
                Kitchen Remodeling
              </Link>
            </li>
            <li>
              <Link href="/services/deck-installation" className="text-gold-500 hover:underline">
                Deck Installation
              </Link>
            </li>
            <li>
              <Link href="/services/basement-finishing" className="text-gold-500 hover:underline">
                Basement Finishing
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gold-500 hover:underline">
                Blog: Cost Guides &amp; Renovation Tips
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
