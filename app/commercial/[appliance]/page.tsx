import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { commercialAppliances } from '@/lib/data/appliances';
import { BUSINESS_NAME } from '@/lib/utils';

type Props = {
  params: Promise<{ appliance: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { appliance } = await params;
  // Remove -repair suffix to find appliance
  const cleanSlug = appliance.replace('-repair', '');
  const applianceSlug = `commercial-${cleanSlug}`;
  const applianceData = commercialAppliances.find((a) => a.slug === applianceSlug);

  if (!applianceData) {
    return { title: 'Not Found' };
  }

  return {
    title: `${applianceData.title} in Texas | ${BUSINESS_NAME}`,
    description: `Expert ${applianceData.name.toLowerCase()} repair services in Texas. Same-day commercial service. Call now!`,
  };
}

export async function generateStaticParams() {
  return commercialAppliances.map((appliance) => ({
    appliance: `${appliance.slug.replace('commercial-', '')}-repair`,
  }));
}

// Enable dynamic rendering for on-demand pages
export const dynamicParams = true;

export default async function CommercialAppliancePage({ params }: Props) {
  const { appliance } = await params;
  // Remove -repair suffix to find appliance
  const cleanSlug = appliance.replace('-repair', '');
  const applianceSlug = `commercial-${cleanSlug}`;
  const applianceData = commercialAppliances.find((a) => a.slug === applianceSlug);

  if (!applianceData) {
    notFound();
  }

  return (
    <>
      <Hero
        title={`${applianceData.title} in Texas`}
        subtitle="Commercial appliance repair services for restaurants and businesses"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Professional Commercial Repairs
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                We specialize in commercial appliance repair for restaurants, hotels, and
                businesses throughout Texas. Our technicians are trained to work with
                commercial-grade equipment and understand the urgency of getting your business
                back up and running.
              </p>

              <div className="bg-green-50 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Commercial Service Benefits
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Priority same-day service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>24/7 emergency repairs available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Commercial-grade parts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Preventive maintenance programs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reviews />
    </>
  );
}




