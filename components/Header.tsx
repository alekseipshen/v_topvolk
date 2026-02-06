'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Calendar, MapPin } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_NUMBER, BUSINESS_ADDRESS } from '@/lib/utils';
import { useModal } from '@/contexts/ModalContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModal();

  return (
    <header className="bg-gray-800 shadow-sm sticky top-0 z-50">
      {/* Top Bar with Address - Hidden on all devices */}
      {/* <div className="hidden md:block w-full py-2 text-sm text-white" style={{ backgroundColor: '#334e64' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-end items-center gap-2">
          <MapPin size={14} />
          <span>{BUSINESS_ADDRESS}</span>
        </div>
      </div> */}

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center -my-2">
            <Image
              src="/logo.png"
              alt="Max Appliance Repair"
              width={280}
              height={80}
              className="h-14 md:h-20 w-auto"
              priority
              quality={95}
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-gray-100 hover:text-gold-400 transition font-medium">
          Home
        </Link>
        <Link href="/#our-services" className="text-gray-100 hover:text-gold-400 transition font-medium">
          Services
        </Link>
            <Link href="/#service-areas" className="text-gray-100 hover:text-gold-400 transition font-medium">
              Areas
            </Link>
            <Link href="/#works" className="text-gray-100 hover:text-gold-400 transition font-medium">
              Works
            </Link>
            <Link href="/#reviews" className="text-gray-100 hover:text-gold-400 transition font-medium">
              Reviews
            </Link>
            <button
            onClick={() => {
               if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'open_lead_form',
                    label: 'header_button'
                  });
               }
               openModal();
            }}
            className="flex items-center gap-2 text-white px-6 py-2 rounded-lg transition font-semibold cursor-pointer"
            style={{ backgroundColor: '#334e64' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a4054'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#334e64'}
          >
            <Calendar size={18} />
            Request Service
          </button>
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => {
               if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'phone_click',
                    label: 'header_button'
                  });
               }
            }}
            className="flex items-center gap-2 text-white px-6 py-2 rounded-lg transition font-semibold"
            style={{ backgroundColor: '#F4B942' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d9530'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F4B942'}
          >
            <Phone size={18} />
            {PHONE_DISPLAY}
          </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition text-gray-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-100 hover:text-gold-400 transition py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#our-services"
                className="text-gray-100 hover:text-gold-400 transition py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/#service-areas"
                className="text-gray-100 hover:text-gold-400 transition py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Areas
              </Link>
              <Link
                href="/#works"
                className="text-gray-100 hover:text-gold-400 transition py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Works
              </Link>
              <Link
                href="/#reviews"
                className="text-gray-100 hover:text-gold-400 transition py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      event: 'phone_click',
                      label: 'mobile_menu'
                    });
                }
              }}
              className="flex items-center gap-2 text-white px-6 py-3 rounded-lg transition font-semibold justify-center"
              style={{ backgroundColor: '#F4B942' }}
            >
              <Phone size={18} />
              {PHONE_DISPLAY}
            </a>
              <div className="flex items-center gap-2 text-gray-300 justify-center py-2 text-sm border-t border-gray-700 mt-2 pt-2">
                <MapPin size={16} />
                <span className="text-center">{BUSINESS_ADDRESS}</span>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
