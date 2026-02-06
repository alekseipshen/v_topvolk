'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const works = [
  { image: '/assets/works/_01.jpg', thumb: '/assets/works/thumbs/_01.jpg', alt: 'Home Renovation Project 1' },
  { image: '/assets/works/_02.jpg', thumb: '/assets/works/thumbs/_02.jpg', alt: 'Home Renovation Project 2' },
  { image: '/assets/works/_03.jpg', thumb: '/assets/works/thumbs/_03.jpg', alt: 'Home Renovation Project 3' },
  { image: '/assets/works/_04.jpg', thumb: '/assets/works/thumbs/_04.jpg', alt: 'Home Renovation Project 4' },
  { image: '/assets/works/_05.jpg', thumb: '/assets/works/thumbs/_05.jpg', alt: 'Home Renovation Project 5' },
  { image: '/assets/works/_06.jpg', thumb: '/assets/works/thumbs/_06.jpg', alt: 'Home Renovation Project 6' },
  { image: '/assets/works/_07.jpg', thumb: '/assets/works/thumbs/_07.jpg', alt: 'Home Renovation Project 7' },
  { image: '/assets/works/_08.jpg', thumb: '/assets/works/thumbs/_08.jpg', alt: 'Home Renovation Project 8' },
  { image: '/assets/works/_09.jpg', thumb: '/assets/works/thumbs/_09.jpg', alt: 'Home Renovation Project 9' },
  { image: '/assets/works/_10.jpg', thumb: '/assets/works/thumbs/_10.jpg', alt: 'Home Renovation Project 10' },
  { image: '/assets/works/_11.jpg', thumb: '/assets/works/thumbs/_11.jpg', alt: 'Home Renovation Project 11' },
  { image: '/assets/works/_12.jpg', thumb: '/assets/works/thumbs/_12.jpg', alt: 'Home Renovation Project 12' },
  { image: '/assets/works/_13.jpg', thumb: '/assets/works/thumbs/_13.jpg', alt: 'Home Renovation Project 13' },
  { image: '/assets/works/_14.jpg', thumb: '/assets/works/thumbs/_14.jpg', alt: 'Home Renovation Project 14' },
  { image: '/assets/works/_15.jpg', thumb: '/assets/works/thumbs/_15.jpg', alt: 'Home Renovation Project 15' },
];

export default function WorksGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(works.length).fill(false));

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
      setSelectedImage(selectedImage === 0 ? works.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === works.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
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
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {works.map((work, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            style={{ paddingBottom: '100%' }}
            onClick={() => openLightbox(index)}
          >
            {!imageLoaded[index] && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500"></div>
              </div>
            )}
            <img
              src={work.thumb}
              alt={work.alt}
              onLoad={() => handleImageLoad(index)}
              onError={(e) => {
                console.error(`Failed to load thumbnail: ${work.thumb}`);
                e.currentTarget.src = '/placeholder.svg';
              }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              style={{ display: imageLoaded[index] ? 'block' : 'none' }}
            />
            {/* Hover Overlay with Zoom Icon */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center z-10">
              <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              src={works[selectedImage].image}
              alt={works[selectedImage].alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded">
            {selectedImage + 1} / {works.length}
          </div>
        </div>
      )}
    </>
  );
}
