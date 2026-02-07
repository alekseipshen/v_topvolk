'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

// All 15 photos - available in lightbox
const allWorks = [
  { image: '/assets/works/_01.jpg', alt: 'Home Renovation Project 1' },
  { image: '/assets/works/_02.jpg', alt: 'Home Renovation Project 2' },
  { image: '/assets/works/_03.jpg', alt: 'Home Renovation Project 3' },
  { image: '/assets/works/_04.jpg', alt: 'Home Renovation Project 4' },
  { image: '/assets/works/_05.jpg', alt: 'Home Renovation Project 5' },
  { image: '/assets/works/_06.jpg', alt: 'Home Renovation Project 6' },
  { image: '/assets/works/_07.jpg', alt: 'Home Renovation Project 7' },
  { image: '/assets/works/_08.jpg', alt: 'Home Renovation Project 8' },
  { image: '/assets/works/_09.jpg', alt: 'Home Renovation Project 9' },
  { image: '/assets/works/_10.jpg', alt: 'Home Renovation Project 10' },
  { image: '/assets/works/_11.jpg', alt: 'Home Renovation Project 11' },
  { image: '/assets/works/_12.jpg', alt: 'Home Renovation Project 12' },
  { image: '/assets/works/_13.jpg', alt: 'Home Renovation Project 13' },
  { image: '/assets/works/_14.jpg', alt: 'Home Renovation Project 14' },
  { image: '/assets/works/_15.jpg', alt: 'Home Renovation Project 15' },
];

// First 6 photos with preview thumbnails - shown in gallery
const previewWorks = [
  { preview: '/assets/works/_01m.jpg', index: 0 },
  { preview: '/assets/works/_02m.jpg', index: 1 },
  { preview: '/assets/works/_03m.jpg', index: 2 },
  { preview: '/assets/works/_04m.jpg', index: 3 },
  { preview: '/assets/works/_05m.jpg', index: 4 },
  { preview: '/assets/works/_06m.jpg', index: 5 },
];

export default function WorksGallery() {
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={num}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(num - 1)}
          >
            <div className="w-full h-64 overflow-hidden bg-gray-200">
              <img
                src={`/assets/works/_0${num}m.jpg`}
                alt={`Home Renovation Project ${num}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center pointer-events-none">
                <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex items-center justify-center p-4"
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
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded">
            {selectedImage + 1} / {allWorks.length}
          </div>
        </div>
      )}
    </>
  );
}
