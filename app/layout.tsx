import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import { ModalProvider } from '@/contexts/ModalContext';
import LeadFormModalWrapper from '@/components/LeadFormModalWrapper';
// import ReCaptchaProvider from '@/components/ReCaptchaProvider'; // Temporarily disabled

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // FOUT instead of FOIT - instant text visibility
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: 'TopVolk Construction LLC | Professional Home Renovation in Seattle',
  description: 'Expert home renovation services in Seattle area. Kitchen remodels, bathroom renovations, deck installations. Licensed contractor since 2017. Call (206) 591-1096 for a free estimate!',
  keywords: 'home renovation, Seattle, kitchen remodel, bathroom remodel, deck installation, construction contractor, King County',
  openGraph: {
    title: 'TopVolk Construction | Professional Home Renovation in Seattle',
    description: 'Expert home renovation services in Seattle, Bellevue, Tacoma. Licensed contractor with 100+ projects since 2017.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>
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
