'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PatternFormat } from 'react-number-format';
import { services } from '@/lib/data/services';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .refine((val) => {
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.length === 10;
    }, 'Please enter a complete 10-digit phone number'),
  email: z.string().email('Please enter a valid email').or(z.literal('')).optional(),
  service: z.string().min(1, 'Please select a service'),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  defaultService?: string;
}

export default function LeadForm({ defaultService = '' }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: defaultService,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const cleanedPhone = data.phone.replace(/\D/g, '');
      const serviceName = services.find(s => s.slug === data.service)?.title || data.service;

      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: cleanedPhone,
          email: data.email || '',
          message: `Service: ${serviceName}`,
          service: data.service,
          recaptchaToken: 'bypass',
        }),
      });

      if (response.ok) {
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'lead_submitted',
            lead_data: {
              email: data.email || '',
              phone: cleanedPhone,
              service: data.service,
              source: 'Website - TopVolk Construction',
            },
          });
        }
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Your Free Estimate
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form and we&apos;ll call you back within 15 minutes
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Service */}
            <div>
              <label htmlFor="inline-service" className="block text-sm font-semibold text-gray-700 mb-1">
                Service *
              </label>
              <select
                {...register('service')}
                id="inline-service"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-600 text-xs mt-1">{errors.service.message}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="inline-name" className="block text-sm font-semibold text-gray-700 mb-1">
                Your name *
              </label>
              <input
                {...register('name')}
                type="text"
                id="inline-name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Smith"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="inline-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                Phone *
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PatternFormat
                    {...field}
                    format="(###) ###-####"
                    mask="_"
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Email (optional) */}
            <div>
              <label htmlFor="inline-email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                {...register('email')}
                type="email"
                id="inline-email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg transition font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50"
              style={{ backgroundColor: '#F4B942', color: '#ffffff' }}
            >
              {isSubmitting ? 'Submitting...' : 'Get Free Estimate'}
            </button>

            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Thank you! We&apos;ll contact you shortly.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                Something went wrong. Please try again or call us directly.
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              This site is protected by reCAPTCHA and the Google Privacy Policy applies.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
