'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PatternFormat } from 'react-number-format';
import { X } from 'lucide-react';
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

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function LeadFormModal({ isOpen, onClose, defaultService = '' }: LeadFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: defaultService,
    },
  });

  useEffect(() => {
    if (defaultService) {
      setValue('service', defaultService);
    }
  }, [defaultService, setValue]);

  const watchedData = watch();

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

  const handleClose = () => {
    setSubmitStatus('idle');
    reset({ name: '', phone: '', email: '', service: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {submitStatus === 'success' ? 'Thank You!' : 'Get Your Free Estimate'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
          {submitStatus !== 'success' ? (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Fill out the form and we&apos;ll call you back within 15 minutes
              </p>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-1">
                  Service *
                </label>
                <select
                  {...register('service')}
                  id="service"
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
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Your name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="John Smith"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Email (optional) */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
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
                className="w-full text-white py-4 rounded-lg transition font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#F4B942' }}
              >
                {isSubmitting ? 'Submitting...' : 'Get Free Estimate'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                This site is protected by reCAPTCHA and the Google Privacy Policy applies.
              </p>
            </div>
          ) : (
            /* Success State */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Thank You, {watchedData.name}!</h3>
              <p className="text-gray-600">
                We&apos;ll contact you shortly to discuss your project and schedule a visit.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="w-full text-white py-4 rounded-lg transition font-semibold text-lg shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#204560' }}
              >
                Close
              </button>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
              Something went wrong. Please try again or call us directly at (206) 591-1096.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
