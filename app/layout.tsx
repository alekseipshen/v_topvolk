import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import PromoTopBar from '@/components/PromoTopBar';
import { ModalProvider } from '@/contexts/ModalContext';
import LeadFormModalWrapper from '@/components/LeadFormModalWrapper';
// import ReCaptchaProvider from '@/components/ReCaptchaProvider'; // Temporarily disabled

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // FOUT instead of FOIT - instant text visibility
  variable: '--font-inter',
  preload: true,
});

const SITE_URL = 'https://www.topvolk.org';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TopVolk Construction | Home Renovation in Seattle, WA',
    template: '%s | TopVolk Construction',
  },
  description: 'Home renovation in Seattle, WA: kitchens, bathrooms, decks, basements. Licensed contractor since 2017. Call (206) 591-1096 for a free estimate.',
  keywords: 'home renovation, Seattle, kitchen remodel, bathroom remodel, deck installation, construction contractor, King County',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'TopVolk Construction | Professional Home Renovation in Seattle',
    description: 'Expert home renovation services in Seattle, Bellevue, Tacoma. Licensed contractor with 100+ projects since 2017.',
    type: 'website',
    url: SITE_URL,
    siteName: 'TopVolk Construction LLC',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'TopVolk Construction - Professional Home Renovation in Seattle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TopVolk Construction | Home Renovation in Seattle',
    description: 'Expert home renovation services in Seattle area. Kitchen remodels, bathroom renovations, deck installations. Licensed contractor since 2017.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {GTM_ID && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      )}
      <body className={inter.className}>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <ModalProvider>
          <PromoTopBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <StickyMobileBar />
          <LeadFormModalWrapper />
        </ModalProvider>
      </body>
    </html>
  );
}
