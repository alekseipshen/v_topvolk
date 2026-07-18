'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { defaultWorks, defaultPreviews, type Work, type Preview } from '@/lib/data/gallery';

type WorksGalleryProps = {
  // Optional overrides. When omitted, the generic renovation set is used.
  works?: Work[];
  previews?: Preview[];
};

export default function WorksGallery({ works, previews }: WorksGalleryProps) {
  const allWorks = works ?? defaultWorks;
  const previewWorks = previews ?? defaultPreviews;

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? allWorks.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === allWorks.length - 1 ? 0 : selectedImage + 1);
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      {/* Gallery Grid - Show only 6 preview images */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        {previewWorks.map((work) => (
          <div
            key={work.index}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(work.index)}
          >
            <div className="w-full h-64 overflow-hidden bg-gray-200">
              <img
                src={work.preview}
                alt={allWorks[work.index].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center pointer-events-none">
                <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gold-500 transition z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 text-white hover:text-gold-500 transition z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 text-white hover:text-gold-500 transition z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allWorks[selectedImage].image}
              alt={allWorks[selectedImage].alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded">
            {selectedImage + 1} / {allWorks.length}
          </div>
        </div>
      )}
    </>
  );
}
