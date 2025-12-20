import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function ImageCarousel({
  images,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showNavigation = true,
  width = '100%',
  height = 'auto',
  className = '',
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-play navigation (doesn't pause auto-play)
  const autoPlayNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Manual navigation (pauses auto-play)
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    pauseAutoPlay();
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    pauseAutoPlay();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    pauseAutoPlay();
  };

  const pauseAutoPlay = () => {
    // Clear any existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    setIsAutoPlayPaused(true);
    // Resume auto-play after 10 seconds
    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoPlayPaused(false);
      pauseTimeoutRef.current = null;
    }, 10000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (autoPlay && images.length > 1 && !isAutoPlayPaused) {
      const interval = setInterval(autoPlayNext, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length, isAutoPlayPaused]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        margin: '2rem auto',
        overflow: 'hidden',
        borderRadius: '8px',
      }}
    >
      {/* Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {showNavigation && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {/* Indicator Dots */}
      {showIndicators && images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 2,
          }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: currentIndex === index ? '24px' : '10px',
                height: '10px',
                borderRadius: '5px',
                border: 'none',
                background: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

