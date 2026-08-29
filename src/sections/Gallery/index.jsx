import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Image as ImageIcon,
  Video,
  Sparkles,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Maximize2,
  Calendar,
  MapPin,
  Clock,
  Check,
  Award,
  History,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const GALLERY_COLLECTION = [
  {
    id: 1,
    slug: 'degree-distribution',
    title: 'Degree Distribution Ceremony',
    category: 'Ceremony',
    edition: '2025',
    date: 'October 2025',
    venue: 'Main Auditorium Stage',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop',
    caption: 'Official degree conferment and distribution of B.Tech, M.Tech, and Ph.D. degree scrolls and merit certificates to graduating scholars.',
    featured: true,
    aspect: 'aspect-[16/10]',
  },
  {
    id: 2,
    slug: 'convocation-evening',
    title: 'Convocation Evening',
    category: 'Moments',
    edition: '2025',
    date: 'October 2025',
    venue: 'Institute Lawn Pavilion',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop',
    caption: 'Celebratory convocation evening with cultural performances, student felicitations, and celebratory dinner.',
    featured: true,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 3,
    slug: 'alumni-meet',
    title: 'Alumni Meet',
    category: 'Moments',
    edition: '2025',
    date: 'October 2025',
    venue: 'Campus Guest House Lawn',
    url: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=600&auto=format&fit=crop',
    caption: 'Homecoming assembly connecting distinguished alumni across graduating cohorts with faculty and mentors.',
    featured: false,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 4,
    slug: 'speaker-session',
    title: 'Speaker Session',
    category: 'Dignitaries',
    edition: '2025',
    date: 'October 2025',
    venue: 'Main Lecture Hall',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop',
    caption: 'Visionary keynote address and insights delivered by esteemed guests of honour and institute leadership.',
    featured: false,
    aspect: 'aspect-[16/10]',
  },
];

const CATEGORIES = ['All', 'Ceremony', 'Moments', 'Dignitaries'];

const EDITIONS = [
  { id: 'All Editions', label: 'All Editions' },
  { id: '2026', label: '2026 (Coming Soon)', isComingSoon: true },
  { id: '2025', label: '2025' },
  { id: '2021', label: '2021' },
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeEdition, setActiveEdition] = useState('All Editions');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter gallery items
  const filteredItems = GALLERY_COLLECTION.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesEdition = activeEdition === 'All Editions' || item.edition === activeEdition;
    return matchesCategory && matchesEdition;
  });

  const selectedImage = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  // Handle keyboard navigation in Lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    },
    [selectedImageIndex, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock scroll when lightbox open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedImageIndex]);

  const handleShare = () => {
    if (selectedImage) {
      navigator.clipboard.writeText(window.location.origin + '/gallery#' + selectedImage.id);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section className="w-full py-16 bg-cream-100 min-h-screen relative" id="gallery">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold mb-4 border border-maroon-900/10 shadow-xs">
            <Camera className="w-4 h-4 text-maroon-900" />
            <span>Visual Archives & Memories</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
            Convocation Photo & Video Gallery
          </h1>
          <p className="font-body text-charcoal-600 text-base sm:text-lg mt-3">
            Immortalizing triumphant milestones, academic regalia processions, medal honors, and celebratory joy at IIIT Bhagalpur.
          </p>
        </div>

        {/* Featured Hero Banner: Highlight of the Edition */}
        <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#E8E2D8] shadow-[0_16px_40px_rgba(0,0,0,0.06)] bg-charcoal-950 mb-14 group">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop"
              alt="Grand Academic Procession IIIT Bhagalpur"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none opacity-85"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
            
            {/* Banner Information Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 z-10">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-maroon-900 font-body text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 fill-maroon-900 text-maroon-900" />
                  <span>Official Convocation Gallery Archives</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
                  Grand Academic Processions & Medallion Honors
                </h2>
                <p className="font-body text-white/80 text-xs sm:text-sm max-w-xl">
                  Explore moments across 2025 and 2021 editions. Live 2026 photographs and streaming highlights will go live on 26 September 2026.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="https://drive.google.com/drive/u/3/folders/1R-c4xV0crbNjCzuOWkCi5y2vytPULigu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-pill bg-white hover:bg-maroon-050 text-maroon-900 font-body font-semibold text-sm shadow-md active:scale-95 transition-all gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View High-Res Photo</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`min-h-[38px] px-4 sm:px-5 rounded-pill font-body text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none cursor-pointer ${
                  activeCategory === category
                    ? 'bg-maroon-900 text-white shadow-xs'
                    : 'bg-cream-050 text-charcoal-700 hover:bg-cream-100 hover:text-maroon-900 border border-[#ECE6DC]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Edition / Year Selector with 2026 (Coming Soon) and 2021 */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
            <span className="font-body text-xs text-charcoal-500 font-semibold uppercase tracking-wider hidden sm:inline">
              Edition:
            </span>
            <div className="flex items-center gap-1.5 bg-cream-050 p-1 rounded-pill border border-[#ECE6DC] flex-wrap">
              {EDITIONS.map((edition) => (
                <button
                  key={edition.id}
                  type="button"
                  onClick={() => setActiveEdition(edition.id)}
                  className={`px-3 sm:px-3.5 py-1 rounded-pill text-xs font-body font-medium transition-all cursor-pointer ${
                    activeEdition === edition.id
                      ? 'bg-white text-maroon-900 font-bold shadow-xs border border-maroon-900/20'
                      : 'text-charcoal-600 hover:text-charcoal-900'
                  }`}
                >
                  {edition.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2026 Coming Soon Notice when 2026 edition is selected */}
        {activeEdition === '2026' && (
          <div className="bg-white rounded-[28px] p-8 sm:p-12 border-2 border-dashed border-maroon-900/25 text-center my-8 shadow-sm max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-maroon-050 text-maroon-900 flex items-center justify-center mx-auto mb-4 border border-maroon-900/15">
              <Clock className="w-7 h-7" />
            </div>
            <span className="px-3.5 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-maroon-900 font-body text-xs font-bold uppercase tracking-wider">
              3rd Convocation • 26 September 2026
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900 mt-3">
              2026 Photo & Video Gallery Coming Soon
            </h3>
            <p className="font-body text-charcoal-600 text-sm sm:text-base max-w-lg mx-auto mt-2 leading-relaxed">
              Official high-resolution photography, live streaming archives, and medallion distributions will be published here on <strong>26 September 2026</strong> immediately following the ceremony.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveEdition('All Editions')}
                className="px-6 py-2.5 rounded-pill bg-maroon-900 text-white font-body text-xs sm:text-sm font-semibold hover:bg-maroon-700 transition-colors cursor-pointer"
              >
                Browse 2025 & 2021 Archives
              </button>
            </div>
          </div>
        )}

        {/* Gallery Grid (Responsive Masonry-like Cards) */}
        {filteredItems.length === 0 && activeEdition !== '2026' ? (
          <div className="text-center py-16 bg-white rounded-[24px] border border-[#E8E2D8] p-8">
            <ImageIcon className="w-12 h-12 text-charcoal-300 mx-auto mb-3" />
            <h3 className="font-display font-bold text-xl text-charcoal-800">No photos found</h3>
            <p className="font-body text-charcoal-500 text-sm mt-1">
              Try switching your filter or edition selection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                to={`/gallery/${item.slug}`}
                aria-label={`View photo album: ${item.title}`}
                className="group relative bg-white rounded-[24px] overflow-hidden border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(94,16,28,0.09)] hover:border-maroon-900/40 transition-all duration-300 flex flex-col justify-between cursor-pointer focus-visible:outline-none"
              >
                <div>
                  {/* Image Container with Zoom and Badge */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-100">
                    <img
                      src={item.thumbUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                      <span className="text-white text-xs font-body font-semibold inline-flex items-center gap-1.5 bg-maroon-900/90 px-3.5 py-1 rounded-full backdrop-blur-sm shadow-md">
                        <Camera className="w-3.5 h-3.5" />
                        <span>View Album</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                    {/* Top Category & Edition Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-maroon-900 font-body text-xs font-bold shadow-xs border border-white/50">
                        {item.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-maroon-900/90 backdrop-blur-md text-white font-body text-[11px] font-semibold">
                        {item.edition} Edition
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display font-bold text-lg sm:text-[19px] text-charcoal-900 group-hover:text-maroon-900 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-body text-charcoal-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="px-5 sm:px-6 py-3.5 border-t border-[#ECE6DC] bg-cream-050/60 flex items-center justify-between text-xs text-charcoal-600 font-body">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-maroon-900 shrink-0" />
                    <span className="truncate max-w-[150px]">{item.venue}</span>
                  </div>
                  <div className="flex items-center gap-1 text-maroon-900 font-semibold group-hover:underline shrink-0">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Media Press Kit Download Banner */}
        <div className="mt-16 bg-white rounded-[28px] p-8 sm:p-10 border border-[#E8E2D8] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal-900">
              Official Media & Press Archive
            </h3>
            <p className="font-body text-charcoal-600 text-sm max-w-xl">
              High-resolution print-ready photographs, logo assets, and official press releases for publication and alumni archives.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:media@iiitbh.ac.in?subject=Request%20Convocation%202026%20High-Res%20Media%20Pack"
              className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-pill bg-maroon-900 hover:bg-maroon-700 text-white font-body font-semibold text-sm shadow-sm transition-all gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Request Media Pack (ZIP)</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Modal with Full-Screen & Keyboard Navigation */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-charcoal-950 rounded-[28px] border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-maroon-900 text-white text-xs font-semibold">
                  {selectedImage.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 text-xs font-mono">
                  {selectedImage.edition} Edition
                </span>
                <span className="text-white/60 text-xs font-mono">
                  {selectedImageIndex + 1} / {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Share photo link"
                >
                  {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                </button>
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Open full resolution"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Close preview (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Display */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-contain select-none"
              />

              {/* Prev / Next Navigation Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
                title="Previous photo (←)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) => (prev + 1) % filteredItems.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
                title="Next photo (→)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption & Metadata Footer */}
            <div className="p-6 bg-charcoal-900/90 border-t border-white/10 text-white space-y-2">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {selectedImage.title}
              </h3>
              <p className="font-body text-white/80 text-sm leading-relaxed">
                {selectedImage.caption}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 pt-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  {selectedImage.venue}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  {selectedImage.date}
                </span>
                <span>• Convocation Edition: {selectedImage.edition}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GallerySection;
