import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  Building2,
  Warehouse,
  Layers,
  CheckCircle,
  Clock,
  Users,
  Wrench,
  Ruler,
  BedDouble,
  Bath,
  CalendarDays,
  FileCheck,
  Phone,
  DollarSign,
  KeyRound,
  HeartHandshake,
  TrendingUp,
} from 'lucide-react';
import Hero from '@/components/Hero';
import PromoSection from '@/components/PromoSection';
import Reviews from '@/components/Reviews';
import AduQuoteButton from '@/components/AduQuoteButton';
import AduRoiCalculator from '@/components/AduRoiCalculator';
import { ServiceSchema, BreadcrumbSchema, LocalBusinessSchema, FAQSchema } from '@/components/StructuredData';
import { services, visibleServices } from '@/lib/data/services';
import {
  aduModels,
  aduTypes,
  aduSteps,
  aduIncludes,
  aduPlanComparison,
  aduPreApprovedBenefits,
  aduIncomeWays,
  buildAduFaqs,
  formatPrice,
  formatBedrooms,
} from '@/lib/data/adu';
import { seattleCounties } from '@/lib/data/seattle-counties';
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_NUMBER } from '@/lib/utils';

const SITE_URL = 'https://www.topvolk.org';
const SLUG = 'adu-construction';

// Static route takes precedence over app/services/[service]/page.tsx, so this
// page owns /services/adu-construction while the city combos
// (/services/adu-construction/[city]) keep rendering from the dynamic route.
const service = services.find((s) => s.slug === SLUG)!;

export const metadata: Metadata = {
  title: 'ADU Construction in Seattle — Backyard Cottages, DADU & Garage Conversions',
  description: `Build a detached ADU, backyard cottage or garage conversion in the Seattle area. Seattle pre-approved DADU plans, permits handled, 4–7 months to move-in. Licensed contractor since 2023. Call ${PHONE_DISPLAY} for a free site assessment.`,
  keywords: 'ADU construction Seattle, DADU builder, backyard cottage Seattle, garage conversion ADU, accessory dwelling unit contractor, pre-approved DADU plans',
  alternates: {
    canonical: `${SITE_URL}/services/${SLUG}`,
  },
  openGraph: {
    title: `ADU Construction in Seattle | ${BUSINESS_NAME}`,
    description: 'Detached backyard cottages, attached units and garage conversions. Design, permits and construction from one licensed Seattle contractor.',
    url: `${SITE_URL}/services/${SLUG}`,
    images: [{ url: `${SITE_URL}/assets/adu/one-bedroom-600.jpg`, width: 1400, height: 781, alt: 'One-bedroom detached ADU concept in a Seattle backyard' }],
  },
};

const typeIcons = [Home, Building2, Warehouse, Layers];
const incomeIcons = [DollarSign, KeyRound, HeartHandshake, TrendingUp];

export default function AduConstructionPage() {
  const faqItems = buildAduFaqs();

  return (
    <>
      {/* Structured Data */}
      <ServiceSchema
        name={service.name}
        description={service.description}
        url={`${SITE_URL}/services/${SLUG}`}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Services', url: `${SITE_URL}/services` },
          { name: service.name, url: `${SITE_URL}/services/${SLUG}` },
        ]}
      />
      <LocalBusinessSchema service={service.name} />
      <FAQSchema items={faqItems} />

      <Hero
        title="ADU Construction in Seattle"
        subtitle="Backyard cottages that earn $2,000–$3,200/mo in rent, or a home for family • Design, permits and construction from one team • Free site assessment"
        applianceImage={service.image}
      />

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Add a Second Home to Your Property
            </h2>
            <div className="text-gray-700 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                An accessory dwelling unit turns unused backyard, garage or basement space into a legal,
                independent home that pays you back: a one-bedroom cottage in Seattle rents for about
                $2,000–$2,500 a month, or houses parents or adult children instead of a separate apartment.
                Washington now allows up to two ADUs on most residential lots, and Seattle offers
                pre-approved cottage plans that cut permit time to weeks.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                <strong>{BUSINESS_NAME}</strong> handles the whole project: site assessment, drawings, SDCI or
                city permits, utility connections, construction and every inspection through final approval.
                One contractor, one written timeline, and $100 back for every day we run past it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADU Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ADU Types We Build
            </h2>
            <p className="text-xl text-gray-600">
              Detached, attached or converted — we help you pick the option that fits your lot and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {aduTypes.map((type, index) => {
              const Icon = typeIcons[index % typeIcons.length];
              return (
                <div key={type.name} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="flex justify-center mb-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}
                    >
                      <Icon className="w-10 h-10" style={{ color: '#F4B942' }} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{type.name}</h3>
                  <p className="text-sm font-semibold text-gold-600 mb-3">{type.short}</p>
                  <p className="text-gray-600">{type.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADU Models */}
      <section id="models" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ADU Models &amp; Starting Prices
            </h2>
            <p className="text-xl text-gray-600">
              Four proven configurations for Seattle lots — each one adapted to your parcel, setbacks and finish level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {aduModels.map((model) => (
              <div
                key={model.slug}
                id={`model-${model.slug}`}
                className={`bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden border ${
                  model.popular ? 'border-gold-500' : 'border-gray-200'
                }`}
              >
                <div className="relative w-full h-56 md:h-64 overflow-hidden">
                  <Image
                    src={model.image}
                    alt={model.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {model.popular && (
                    <span
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold text-white shadow"
                      style={{ backgroundColor: '#F4B942' }}
                    >
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{model.name}</h3>
                      <p className="text-sm text-gray-500">{model.tagline}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs uppercase tracking-wide text-gray-500">From</div>
                      <div className="text-2xl font-bold" style={{ color: '#334e64' }}>
                        {formatPrice(model.startingPrice)}
                      </div>
                      <div className="text-xs font-semibold text-gold-600 mt-1">
                        Rents ≈ {formatPrice(model.rentMin)}–{formatPrice(model.rentMax)}/mo
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 my-5">
                    <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                      <Ruler className="w-5 h-5 mx-auto mb-1 text-gold-500" />
                      <div className="font-semibold text-gray-900 text-sm">{model.sqft}</div>
                      <div className="text-xs text-gray-500">sq ft</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                      <BedDouble className="w-5 h-5 mx-auto mb-1 text-gold-500" />
                      <div className="font-semibold text-gray-900 text-sm">{model.bedrooms}</div>
                      <div className="text-xs text-gray-500">bed</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                      <Bath className="w-5 h-5 mx-auto mb-1 text-gold-500" />
                      <div className="font-semibold text-gray-900 text-sm">{model.bathrooms}</div>
                      <div className="text-xs text-gray-500">bath</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                      <CalendarDays className="w-5 h-5 mx-auto mb-1 text-gold-500" />
                      <div className="font-semibold text-gray-900 text-sm">{model.buildTime}</div>
                      <div className="text-xs text-gray-500">build</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{model.description}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-5">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gold-500 font-bold flex-shrink-0">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-gray-500 mb-5">
                    <span className="font-semibold text-gray-700">Ideal for:</span> {model.idealFor}
                  </p>

                  <AduQuoteButton
                    label={`Get Quote for ${model.name}`}
                    model={model.slug}
                    className="w-full px-6 py-3 text-base"
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8 max-w-3xl mx-auto">
            Concept renderings and planning figures for the greater Seattle area. Starting prices are preliminary;
            final pricing depends on site conditions, utility connections and finishes and is set after a free
            site assessment and a signed scope-of-work agreement.
          </p>
        </div>
      </section>

      {/* How an ADU pays for itself */}
      <section id="income" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Turn Your Backyard Into Income
            </h2>
            <p className="text-xl text-gray-600">
              A permitted ADU is the one home improvement that pays you back every month
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {aduIncomeWays.map((way, index) => {
                const Icon = incomeIcons[index % incomeIcons.length];
                return (
                  <div key={way.title} className="bg-white p-6 rounded-lg shadow-md">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}
                    >
                      <Icon className="w-7 h-7" style={{ color: '#F4B942' }} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{way.title}</h3>
                    <p className="text-gray-600 text-sm">{way.description}</p>
                  </div>
                );
              })}

              <div className="sm:col-span-2 bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr style={{ backgroundColor: '#334e64' }} className="text-white">
                      <th className="text-left p-3 md:p-4 font-semibold">Configuration</th>
                      <th className="text-left p-3 md:p-4 font-semibold">Build from</th>
                      <th className="text-left p-3 md:p-4 font-semibold" style={{ color: '#F4B942' }}>Est. rent / mo</th>
                      <th className="text-left p-3 md:p-4 font-semibold hidden sm:table-cell">Per year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aduModels.map((model, index) => (
                      <tr key={model.slug} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 md:p-4 font-semibold text-gray-900">{model.name}</td>
                        <td className="p-3 md:p-4 text-gray-600">{formatPrice(model.startingPrice)}</td>
                        <td className="p-3 md:p-4 text-gray-900 font-medium whitespace-nowrap">
                          {formatPrice(model.rentMin)}–{formatPrice(model.rentMax)}
                        </td>
                        <td className="p-3 md:p-4 text-gray-900 font-medium whitespace-nowrap hidden sm:table-cell">
                          {formatPrice(model.rentMin * 12)}–{formatPrice(model.rentMax * 12)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-3 md:p-4 border-t border-gray-200 text-xs text-gray-500">
                  Rent estimates for new-build units, based on 2026 Seattle rent benchmarks. Actual rent depends on
                  neighborhood, finishes and parking. Gross figures, before taxes and maintenance.
                </div>
              </div>
            </div>

            <AduRoiCalculator />
          </div>
        </div>
      </section>

      {/* Seattle Pre-Approved DADU Plans */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Seattle Pre-Approved DADU Plans
            </h2>
            <p className="text-xl text-gray-600">
              Build from the city&apos;s catalog of pre-reviewed backyard cottage designs and skip months of permitting
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {aduPreApprovedBenefits.map((benefit) => (
                <div key={benefit.title} className="bg-white p-6 rounded-lg shadow-md">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}
                  >
                    <FileCheck className="w-7 h-7" style={{ color: '#F4B942' }} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr style={{ backgroundColor: '#334e64' }} className="text-white">
                    <th className="text-left p-4 font-semibold">&nbsp;</th>
                    <th className="text-left p-4 font-semibold">Custom Design</th>
                    <th className="text-left p-4 font-semibold" style={{ color: '#F4B942' }}>
                      Pre-Approved Plan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {aduPlanComparison.map((row, index) => (
                    <tr key={row.label} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 font-semibold text-gray-900 align-top">{row.label}</td>
                      <td className="p-4 text-gray-600 align-top">{row.custom}</td>
                      <td className="p-4 text-gray-900 font-medium align-top">{row.preApproved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-gray-200 text-sm text-gray-600">
                Pre-approved plans apply within the City of Seattle. In Bellevue, Kirkland, Tacoma, Everett and
                other cities we design to the local code and run the standard review — we handle both paths.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Promo */}
      <PromoSection />

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your ADU in 4 Steps
            </h2>
            <p className="text-xl text-gray-600">
              From the first site visit to the certificate of occupancy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {aduSteps.map((step, index) => (
              <div key={step.title} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4"
                  style={{ backgroundColor: '#F4B942' }}
                >
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Every ADU Includes
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                One line-item estimate covers the whole unit — no surprise add-ons between the drawings and the keys.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aduIncludes.map((item) => (
                  <div key={item} className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
                    <span className="text-gold-500 text-xl font-bold flex-shrink-0 leading-none">✓</span>
                    <span className="font-medium text-gray-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2" style={{ borderColor: '#F4B942' }}>
                Starting Prices
              </h3>
              <ul className="divide-y divide-gray-200">
                {aduModels.map((model) => (
                  <li key={model.slug} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900">{model.name}</div>
                      <div className="text-sm text-gray-500">
                        {model.sqft} sq ft · {formatBedrooms(model.bedrooms)} · {model.bathrooms} bath
                      </div>
                      <div className="text-xs font-semibold text-gold-600">
                        Rents ≈ {formatPrice(model.rentMin)}–{formatPrice(model.rentMax)}/mo
                      </div>
                    </div>
                    <div className="text-lg font-bold whitespace-nowrap" style={{ color: '#334e64' }}>
                      from {formatPrice(model.startingPrice)}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-4">
                Preliminary planning figures. Permit and plan-review fees are passed through at cost. A separate
                water/sewer service line, when you choose one, is quoted separately.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <AduQuoteButton label="Get Free Estimate" className="flex-1 px-6 py-3 text-base" />
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-base text-white transition shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#334e64' }}
                >
                  <Phone size={18} />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Build Your ADU with {BUSINESS_NAME}?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}>
                  <CheckCircle className="w-10 h-10" style={{ color: '#F4B942' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Licensed &amp; Insured</h3>
              <p className="text-gray-600">
                Washington State licensed contractor with full insurance coverage. Every unit is permitted and inspected.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}>
                  <Clock className="w-10 h-10" style={{ color: '#F4B942' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Deadline in the Contract</h3>
              <p className="text-gray-600">
                A written timeline before work starts. We pay $100 for every day past the agreed deadline.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}>
                  <Users className="w-10 h-10" style={{ color: '#F4B942' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Direct Communication</h3>
              <p className="text-gray-600">
                Work directly with Vladislav — no middlemen, clear expectations, honest recommendations on what fits your lot.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}>
                  <Wrench className="w-10 h-10" style={{ color: '#F4B942' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">One Team, Start to Finish</h3>
              <p className="text-gray-600">
                Design, permits, foundation, framing, plumbing, electrical and finishes — 100+ projects completed since 2023.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Reviews />

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              ADU Questions, Answered
            </h2>
            <div className="space-y-6">
              {faqItems.map((faq) => (
                <div key={faq.question} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: '#334e64' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your ADU?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Free site assessment, written preliminary estimate, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AduQuoteButton label="Get Free Estimate" className="px-8 py-4 text-lg" />
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-lg text-white border-2 border-white/30 hover:bg-white/10 transition"
              >
                <Phone className="w-5 h-5" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ADU Construction Service Areas
            </h2>
            <p className="text-xl text-gray-600">
              We build ADUs throughout the greater Seattle area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {seattleCounties.map((county) => (
              <div key={county.slug} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2" style={{ borderColor: '#F4B942' }}>
                  {county.name}
                  <span className="text-base font-normal text-gray-600 ml-2">({county.totalCities} cities)</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {county.cities.map((cityName) => {
                    const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <Link
                        key={citySlug}
                        href={`/services/${SLUG}/${citySlug}`}
                        className="text-gray-700 hover:text-gold-500 transition py-1 text-sm"
                      >
                        {cityName}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Other Services We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {visibleServices
              .filter((s) => s.slug !== SLUG)
              .map((otherService) => (
                <Link
                  key={otherService.slug}
                  href={`/services/${otherService.slug}`}
                  prefetch={false}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group border border-gray-200"
                >
                  {otherService.image && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={otherService.image}
                        alt={otherService.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{otherService.title}</h3>
                    <p className="text-gray-600 mb-4">{otherService.description}</p>
                    <span className="text-gold-500 font-semibold hover:underline">Learn more →</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
