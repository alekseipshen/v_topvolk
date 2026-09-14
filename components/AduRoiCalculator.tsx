'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { aduModels, formatPrice, paybackYears } from '@/lib/data/adu';
import AduQuoteButton from '@/components/AduQuoteButton';

/**
 * Simple rental-income calculator: pick a configuration, adjust the expected
 * monthly rent, see annual income, 10-year income and simple payback.
 * Gross figures only (no financing, taxes or vacancy) — stated on the card.
 */
export default function AduRoiCalculator() {
  const [slug, setSlug] = useState(aduModels[1].slug);
  const model = aduModels.find((m) => m.slug === slug) ?? aduModels[1];
  const defaultRent = Math.round((model.rentMin + model.rentMax) / 2 / 50) * 50;
  const [rentBySlug, setRentBySlug] = useState<Record<string, number>>({});
  const rent = rentBySlug[slug] ?? defaultRent;

  const annual = rent * 12;
  const tenYear = annual * 10;
  const payback = paybackYears(model.startingPrice, rent);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)' }}
        >
          <TrendingUp className="w-7 h-7" style={{ color: '#F4B942' }} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">ADU Income Calculator</h3>
          <p className="text-sm text-gray-500">Pick a configuration and adjust the rent to your neighborhood</p>
        </div>
      </div>

      <label htmlFor="adu-roi-model" className="block text-sm font-semibold text-gray-700 mb-1">
        Configuration
      </label>
      <select
        id="adu-roi-model"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-gold-500"
      >
        {aduModels.map((m) => (
          <option key={m.slug} value={m.slug}>
            {m.name} — from {formatPrice(m.startingPrice)}
          </option>
        ))}
      </select>

      <div className="flex items-baseline justify-between mb-1">
        <label htmlFor="adu-roi-rent" className="text-sm font-semibold text-gray-700">
          Expected monthly rent
        </label>
        <span className="text-xl font-bold" style={{ color: '#334e64' }}>
          {formatPrice(rent)}/mo
        </span>
      </div>
      <input
        id="adu-roi-rent"
        type="range"
        min={1000}
        max={4000}
        step={50}
        value={rent}
        onChange={(e) => setRentBySlug({ ...rentBySlug, [slug]: Number(e.target.value) })}
        className="w-full accent-[#F4B942] mb-1"
      />
      <p className="text-xs text-gray-500 mb-6">
        Seattle-area estimate for this size: {formatPrice(model.rentMin)}–{formatPrice(model.rentMax)}/mo
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
          <div className="text-lg md:text-xl font-bold text-gray-900">{formatPrice(annual)}</div>
          <div className="text-xs text-gray-500">per year</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
          <div className="text-lg md:text-xl font-bold text-gray-900">{formatPrice(tenYear)}</div>
          <div className="text-xs text-gray-500">over 10 years</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
          <div className="text-lg md:text-xl font-bold" style={{ color: '#334e64' }}>
            {payback.toFixed(1)} yrs
          </div>
          <div className="text-xs text-gray-500">simple payback</div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-5">
        Gross rent against the starting build price of {formatPrice(model.startingPrice)}. Excludes financing,
        vacancy, taxes and maintenance. Starting prices are preliminary and confirmed after a free site assessment.
      </p>

      <AduQuoteButton label="Get My ADU Estimate" model={`roi_${slug}`} className="w-full px-6 py-3 text-base" />
    </div>
  );
}
