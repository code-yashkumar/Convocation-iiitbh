import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Camera,
  MapPin,
  Calendar,
  Eye,
  Pause,
  Play,
  Maximize2
} from 'lucide-react';

const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: 'Grand Academic Procession',
    subtitle: 'Ceremonial entry of Senate members, Board of Governors, and dignitaries.',
    edition: '2025 Edition',
    venue: 'Main Academic Quadrangle',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1400&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'President & Director Gold Medals',
    subtitle: 'Celebrating pinnacle academic distinctions and top departmental honours.',
    edition: '2025 Edition',
    venue: 'Main Lecture Hall',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1400&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Celebratory Mortarboard Toss',
    subtitle: 'Triumphant cap toss by the graduating B.Tech, M.Tech, and Ph.D. scholars.',
    edition: '2025 Edition',
    venue: 'Institute Lawn Pavilion',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Permanent Campus Ceremony Grounds',
    subtitle: 'State-of-the-art campus infrastructure ready for the 3rd Convocation.',
    edition: '2026 Campus',
    venue: 'IIIT Bhagalpur Permanent Campus',
    image: '/assets/iiitbh-campus-schedule.jpg',
  },
  {
    id: 5,
    title: '1st Inaugural Convocation Archive',
    subtitle: 'Historic commencement of the founding batch of IIIT Bhagalpur.',
    edition: '2021 Edition',
    venue: 'Auditorium Hall',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1400&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Alumni Fellowship & Family Reception',
    subtitle: 'Graduates cherishing memorable moments with mentors and proud families.',
    edition: '2025 Edition',
    venue: 'Campus Guest House Lawn',
    image: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=1400&auto=format&fit=crop',
  },
];

export function HomeGalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);
  const totalSlides = CAROUSEL_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto rotation timer (2.5 seconds for faster switching)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 2500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide]);

  // 3D Circular Ring Transformation Calculator
  const getSlideStyle = (index) => {
    let offset = (index - currentIndex) % totalSlides;
    if (offset < -Math.floor(totalSlides / 2)) offset += totalSlides;
    if (offset > Math.floor(totalSlides / 2)) offset -= totalSlides;

    if (offset === 0) {
      // Active center slide
      return {
        transform: 'translate3d(0%, 0, 0px) rotateY(0deg) scale(1)',
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)',
        pointerEvents: 'auto',
      };
    } else if (offset === 1) {
      // Next upcoming photo (Right 3D Ring)
      return {
        transform: 'translate3d(58%, 0, -140px) rotateY(-36deg) scale(0.85)',
        zIndex: 20,
        opacity: 0.72,
        filter: 'brightness(0.72)',
        pointerEvents: 'auto',
      };
    } else if (offset === -1) {
      // Past previous photo (Left 3D Ring)
      return {
        transform: 'translate3d(-58%, 0, -140px) rotateY(36deg) scale(0.85)',
        zIndex: 20,
        opacity: 0.72,
        filter: 'brightness(0.72)',
        pointerEvents: 'auto',
      };
    } else if (offset === 2) {
      // Far right back
      return {
        transform: 'translate3d(98%, 0, -280px) rotateY(-55deg) scale(0.68)',
        zIndex: 10,
        opacity: 0.28,
        filter: 'brightness(0.5)',
        pointerEvents: 'none',
      };
    } else if (offset === -2) {
      // Far left back
      return {
        transform: 'translate3d(-98%, 0, -280px) rotateY(55deg) scale(0.68)',
        zIndex: 10,
        opacity: 0.28,
        filter: 'brightness(0.5)',
        pointerEvents: 'none',
      };
    } else {
      // Deep behind (hidden)
      return {
        transform: 'translate3d(0%, 0, -400px) rotateY(180deg) scale(0.4)',
        zIndex: 0,
        opacity: 0,
        filter: 'brightness(0.2)',
        pointerEvents: 'none',
      };
    }
  };

  const currentSlide = CAROUSEL_SLIDES[currentIndex];

  return (
    <section className="w-full py-16 sm:py-20 bg-cream-100 relative overflow-hidden" id="home-gallery">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold border border-maroon-900/10 shadow-xs">
              <Camera className="w-4 h-4 text-maroon-900" />
              <span>Memories & Milestones</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
              Convocation Gallery
            </h2>
            <p className="font-body text-charcoal-600 text-sm sm:text-base max-w-xl mt-1">
              Interactive 3D showcase of academic processions, medal honours, and historic convocation editions.
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-3 shrink-0">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-pill bg-white hover:bg-maroon-050 text-charcoal-900 hover:text-maroon-900 border border-maroon-900/30 hover:border-maroon-900 shadow-xs font-body font-semibold text-sm transition-all gap-2 cursor-pointer"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3D Circular Ring Carousel Container */}
        <div
          className="relative max-w-[1020px] mx-auto h-[380px] sm:h-[440px] lg:h-[490px] flex items-center justify-center select-none"
          style={{ perspective: '1200px' }}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Slides positioned in 3D circular cylinder space */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {CAROUSEL_SLIDES.map((slide, idx) => {
              const isCenter = idx === currentIndex;
              const style = getSlideStyle(idx);

              return (
                <div
                  key={slide.id}
                  onClick={() => {
                    if (!isCenter) setCurrentIndex(idx);
                  }}
                  style={style}
                  className={`absolute w-[82%] sm:w-[72%] lg:w-[65%] h-[88%] sm:h-[92%] rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#E8E2D8] shadow-[0_20px_50px_rgba(0,0,0,0.18)] bg-charcoal-950 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group`}
                >
                  {/* Photo */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center pointer-events-none group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/95 via-charcoal-950/30 to-transparent pointer-events-none" />

                  {/* Card Details Overlay (Visible prominently on Active Card) */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-8 flex flex-col justify-end transition-opacity duration-500 ${
                      isCenter ? 'opacity-100 pointer-events-auto' : 'opacity-85 pointer-events-none'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-maroon-900 font-body text-xs font-bold uppercase tracking-wider shadow-sm">
                          <Sparkles className="w-3.5 h-3.5 fill-maroon-900 text-maroon-900" />
                          <span>{slide.edition}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-body text-xs hidden sm:inline-flex">
                          <MapPin className="w-3.5 h-3.5 text-gold-400" />
                          <span>{slide.venue}</span>
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight leading-snug">
                        {slide.title}
                      </h3>
                      
                      {isCenter && (
                        <p className="font-body text-white/85 text-xs sm:text-sm max-w-lg leading-relaxed line-clamp-2">
                          {slide.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Active Card Glow Border */}
                  {isCenter && (
                    <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] ring-2 ring-gold-400/40 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous slide in ring"
            className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-maroon-900 flex items-center justify-center border border-maroon-900/20 shadow-lg backdrop-blur-md transition-all active:scale-90 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next slide in ring"
            className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-maroon-900 flex items-center justify-center border border-maroon-900/20 shadow-lg backdrop-blur-md transition-all active:scale-90 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Bottom Pagination & Control Bar */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
            className="w-8 h-8 rounded-full bg-white text-charcoal-700 hover:text-maroon-900 border border-[#ECE6DC] flex items-center justify-center shadow-xs transition-colors cursor-pointer mr-1"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#ECE6DC] shadow-xs">
            {CAROUSEL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Switch to photo ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-7 h-2 bg-maroon-900'
                    : 'w-2 h-2 bg-charcoal-300 hover:bg-charcoal-500'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default HomeGalleryCarousel;
