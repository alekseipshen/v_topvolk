import Link from 'next/link';
import { BUSINESS_NAME, PHONE_DISPLAY, BUSINESS_EMAIL } from '@/lib/utils';

export const metadata = {
  title: 'Terms of Use | TopVolk Construction',
  description: 'Terms and conditions for using TopVolk Construction website and services.',
  robots: 'noindex, nofollow',
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Terms of Use
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">
              <strong>Last Updated:</strong> April 27, 2026
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the website of {BUSINESS_NAME} ("we," "us," or "our"),
                you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to these terms, please do not use this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Services Description</h2>
              <p>
                {BUSINESS_NAME}, operated by TopVolk Construction LLC, is a licensed home renovation
                contractor serving the greater Seattle, WA area. We provide kitchen remodels, bathroom
                renovations, deck installations, basement finishing, ADU construction, home additions,
                and general contracting services for residential customers.
              </p>
              <p>
                All projects are subject to availability, scheduling, jurisdictional permit requirements,
                and signed scope-of-work agreements before construction begins.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Use of Website</h2>
              <p>You agree to use this website only for lawful purposes and in a way that does not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Infringe upon the rights of others</li>
                <li>Restrict or inhibit anyone else's use of the website</li>
                <li>Transmit any harmful or malicious code</li>
                <li>Collect or harvest personal data about other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Estimates, Bids, and Project Pricing</h2>
              <p>
                All estimates and bids provided through this website or in response to inquiries are
                preliminary. Final project pricing is established only after an in-person consultation,
                site assessment, and signed scope-of-work agreement that defines materials, timeline,
                allowances, change-order procedures, and payment milestones.
              </p>
              <p>
                Permit fees, plan-review costs, and inspection charges from local jurisdictions
                (City of Seattle, King County, Bellevue, Tacoma, etc.) are passed through to the
                customer at cost. Material price changes between estimate and project start may be
                reflected in revised pricing per the signed agreement.
              </p>
              <p>
                We reserve the right to decline any project for any lawful reason, including unsafe
                site conditions, unrealistic budget-to-scope mismatches, or unwillingness to obtain
                required permits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Workmanship Warranty and Liability</h2>
              <p>
                Construction work performed by {BUSINESS_NAME} is covered by our written workmanship
                warranty as specified in each project agreement. Manufacturer warranties on materials
                and fixtures are pass-through from the manufacturer. We are not liable for damage caused
                by normal wear, misuse, or failure to follow recommended maintenance after project
                completion.
              </p>
              <p>
                Our liability is limited to the cost of the construction work performed. We are not
                liable for consequential or incidental damages including loss of use, alternative
                housing, or other indirect costs unless explicitly agreed in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Licensing and Independent Contractor Status</h2>
              <p>
                {BUSINESS_NAME} is a Washington state licensed contractor operating as an independent
                business. We are not affiliated with, authorized by, or endorsed by any material
                supplier, manufacturer, or third-party service mentioned on this website. All brand
                names and trademarks referenced are the property of their respective owners and used
                solely for informational purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, 
                is the property of {BUSINESS_NAME} or its content suppliers and is protected by 
                United States and international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites. We are not responsible for 
                the content, privacy policies, or practices of any third-party websites. Your use 
                of such websites is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of the 
                website after changes are posted constitutes your acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the 
                State of Washington, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Use, please contact us:
              </p>
              <p>
                <strong>{BUSINESS_NAME}</strong><br />
                TopVolk Construction LLC<br />
                Washington<br />
                Phone: <a href={`tel:${PHONE_DISPLAY.replace(/\D/g, '')}`} className="text-gold-500 hover:underline">{PHONE_DISPLAY}</a><br />
                Email: <a href={`mailto:${BUSINESS_EMAIL}`} className="text-gold-500 hover:underline">{BUSINESS_EMAIL}</a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link 
              href="/" 
              className="inline-block px-6 py-3  " style={{ backgroundColor: "#F4B942", color: "#ffffff" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
