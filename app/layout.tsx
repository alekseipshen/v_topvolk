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

import Script from 'next/script';

const GTM_ID = 'GTM-NB5QWM6S'; // Max Appliance Repair GTM Container

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      {/* Tawk.to Live Chat Widget - DISABLED */}
      {/* <Script id="tawk-to-chat" strategy="afterInteractive">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/5aa7c04ad7591465c708845d/default';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();

          // Adjust widget position on mobile to avoid overlapping sticky bar
          Tawk_API.onLoad = function(){
            if (window.innerWidth <= 768) {
              // Move widget up by 80px on mobile
              const widget = document.querySelector('.tawk-widget-wrapper, #tawk-bubble-container, .tawk-button');
              if (widget) {
                widget.style.setProperty('bottom', '80px', 'important');
              }
              
              // Also adjust the chat window
              const chatFrame = document.querySelector('iframe[title*="chat"]');
              if (chatFrame) {
                chatFrame.style.setProperty('bottom', '80px', 'important');
                chatFrame.style.setProperty('max-height', 'calc(100vh - 160px)', 'important');
              }
            }
          };

          // Re-apply on window resize
          window.addEventListener('resize', function() {
            if (Tawk_API && Tawk_API.onLoad) {
              setTimeout(function() {
                if (window.innerWidth <= 768) {
                  const widget = document.querySelector('.tawk-widget-wrapper, #tawk-bubble-container, .tawk-button');
                  if (widget) {
                    widget.style.setProperty('bottom', '80px', 'important');
                  }
                }
              }, 100);
            }
          });
        `}
      </Script> */}
      <body className={inter.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
