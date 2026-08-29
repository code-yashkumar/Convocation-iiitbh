import React, { useState, useEffect, useRef } from 'react';
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
  Play
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

  // Next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  // Previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  // Auto-rotation timer (every 4 seconds)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const currentSlide = CAROUSEL_SLIDES[currentIndex];

  return (
    <section className="w-full py-16 sm:py-20 bg-cream-100 relative overflow-hidden" id="home-gallery">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold border border-maroon-900/10 shadow-xs">
              <Camera className="w-4 h-4 text-maroon-900" />
              <span>Memories & Milestones</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
              Convocation Gallery
            </h2>
            <p className="font-body text-charcoal-600 text-sm sm:text-base max-w-xl mt-1">
              Glimpses of academic processions, gold medal honours, and joyous memories from past convocations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-pill bg-white hover:bg-maroon-050 text-charcoal-900 hover:text-maroon-900 border border-maroon-900/30 hover:border-maroon-900 shadow-xs font-body font-semibold text-sm transition-all gap-2 cursor-pointer"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Carousel Showcase Container */}
        <div
          className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#E8E2D8] shadow-[0_16px_48px_rgba(94,16,28,0.08)] bg-charcoal-950 aspect-[16/10] sm:aspect-[16/8] lg:aspect-[21/9] w-full group"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Slides Render */}
          {CAROUSEL_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center select-none scale-100 group-hover:scale-105 transition-transform duration-1000"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent" />
            </div>
          ))}

          {/* Slide Details Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-none">
            <div className="max-w-2xl space-y-2.5 pointer-events-auto">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-maroon-900 font-body text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 fill-maroon-900 text-maroon-900" />
                  <span>{currentSlide.edition}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-body text-xs">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>{currentSlide.venue}</span>
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
                {currentSlide.title}
              </h3>
              <p className="font-body text-white/85 text-xs sm:text-sm max-w-xl leading-relaxed">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* View In Gallery CTA Button */}
            <div className="pointer-events-auto flex items-center gap-3 shrink-0">
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center min-h-[44px] px-5 sm:px-6 rounded-pill bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md text-white font-body font-semibold text-xs sm:text-sm transition-all gap-2 cursor-pointer shadow-sm"
              >
                <Eye className="w-4 h-4" />
                <span>View Photo Archive</span>
              </Link>
            </div>
          </div>

          {/* Navigation Controls: Prev & Next Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-maroon-900/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all shadow-md active:scale-95 cursor-pointer opacity-90 hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-maroon-900/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all shadow-md active:scale-95 cursor-pointer opacity-90 hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Progress Indicator Dots */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
              className="text-white hover:text-gold-400 transition-colors mr-1 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {CAROUSEL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-gold-400'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/90'
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
