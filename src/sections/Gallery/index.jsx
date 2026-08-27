import React, { useState, useEffect, useCallback } from 'react';
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
  Filter,
  Check,
  PlayCircle,
  Layers,
  Award
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const GALLERY_COLLECTION = [
  {
    id: 1,
    title: 'Grand Academic Procession of Board & Senate',
    category: 'Ceremony',
    edition: '2026',
    date: '26 September 2026',
    venue: 'Academic Corridor to Main Lecture Hall',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
    caption: 'The Board of Governors, Senate Members, and Chief Guest leading the ceremonial entrance in traditional Indian regalia.',
    featured: true,
    aspect: 'aspect-[16/10]',
  },
  {
    id: 2,
    title: 'Conferment of President’s Gold Medal',
    category: 'Awards',
    edition: '2026',
    date: '26 September 2026',
    venue: 'Main Lecture Hall Auditorium',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop',
    caption: 'Top graduating scholar receiving the prestigious Institute Gold Medal for outstanding academic and research excellence.',
    featured: true,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 3,
    title: 'Graduating Cohort Jubilation & Cap Toss',
    category: 'Moments',
    edition: '2026',
    date: '26 September 2026',
    venue: 'Central Courtyard Lawn',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
    caption: 'Graduates erupt in joyous cheers, celebrating years of dedication, companionship, and engineering excellence.',
    featured: false,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 4,
    title: 'Inaugural Lamp Lighting & Vedic Invocation',
    category: 'Ceremony',
    edition: '2026',
    date: '26 September 2026',
    venue: 'Main Lecture Hall Stage',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
    caption: 'Chief Guest and Director invoking auspicious beginnings with the ceremonial Deep Prajwalan.',
    featured: false,
    aspect: 'aspect-[16/10]',
  },
  {
    id: 5,
    title: 'Distinguished Keynote Address to Graduates',
    category: 'Dignitaries',
    edition: '2026',
    date: '26 September 2026',
    venue: 'Main Lecture Hall',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop',
    caption: 'Eminent Chief Guest inspiring the new cohort on technological leadership and nation-building.',
    featured: false,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 6,
    title: 'Proud Families & Parents on Institute Green',
    category: 'Moments',
    edition: '2026',
    date: '26 September 2026',
    venue: 'Campus Green Meadows',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=600&auto=format&fit=crop',
    caption: 'Guardians and loved ones capturing timeless memories with their graduating scholars.',
    featured: false,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 7,
    title: 'Degree Scroll Presentation on Dias',
    category: 'Awards',
    edition: '2025',
    date: 'October 2025',
    venue: 'Auditorium Stage',
    url: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?q=80&w=600&auto=format&fit=crop',
    caption: 'B.Tech, M.Tech, and Ph.D. degree conferment by Senate leadership during the 2nd Convocation.',
    featured: false,
    aspect: 'aspect-[16/10]',
  },
  {
    id: 8,
    title: 'Convocation Robes & Traditional Angavastram',
    category: 'Ceremony',
    edition: '2025',
    date: 'October 2025',
    venue: 'Robing Lounge, Academic Block',
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop',
    caption: 'Handcrafted ceremonial stoles representing the academic heritage of IIIT Bhagalpur.',
    featured: false,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 9,
    title: 'Alumni Reunion & Faculty Fellowship Lunch',
    category: 'Moments',
    edition: '2025',
    date: 'October 2025',
    venue: 'Institute Lawn Pavilion',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    thumbUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop',
    caption: 'Distinguished faculty members and graduates sharing camaraderie and future visions.',
    featured: false,
    aspect: 'aspect-[4/3]',
  },
];

const CATEGORIES = ['All', 'Ceremony', 'Awards', 'Moments', 'Dignitaries'];
const EDITIONS = ['All Editions', '2026', '2025'];

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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-body text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span>Featured Collection • 3rd Convocation</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
                  Grand Academic Procession & Medallion Honors
                </h2>
                <p className="font-body text-white/80 text-xs sm:text-sm max-w-xl">
                  High-definition captures of the ceremonial assembly, robes conferment, and degree distributions.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(0)}
                  className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-pill bg-white hover:bg-maroon-050 text-maroon-900 font-body font-semibold text-sm shadow-md active:scale-95 transition-all gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View High-Res Photo</span>
                </button>
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

          {/* Edition / Year Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="font-body text-xs text-charcoal-500 font-semibold uppercase tracking-wider hidden sm:inline">
              Edition:
            </span>
            <div className="flex items-center gap-1.5 bg-cream-050 p-1 rounded-pill border border-[#ECE6DC]">
              {EDITIONS.map((edition) => (
                <button
                  key={edition}
                  type="button"
                  onClick={() => setActiveEdition(edition)}
                  className={`px-3 py-1 rounded-pill text-xs font-body font-medium transition-all ${
                    activeEdition === edition
                      ? 'bg-white text-maroon-900 font-bold shadow-xs border border-maroon-900/20'
                      : 'text-charcoal-600 hover:text-charcoal-900'
                  }`}
                >
                  {edition}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid (Responsive Masonry-like Cards) */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[24px] border border-[#E8E2D8] p-8">
            <ImageIcon className="w-12 h-12 text-charcoal-300 mx-auto mb-3" />
            <h3 className="font-display font-bold text-xl text-charcoal-800">No photos found</h3>
            <p className="font-body text-charcoal-500 text-sm mt-1">
              Try switching your filter or edition selection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedImageIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedImageIndex(idx);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View photo: ${item.title}`}
                className="group relative bg-white rounded-[24px] overflow-hidden border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(94,16,28,0.08)] hover:border-maroon-900/30 transition-all duration-300 flex flex-col justify-between cursor-pointer focus-visible:outline-none"
              >
                <div>
                  {/* Image Container with Zoom and Badge */}
                  <div className={`relative ${item.aspect} w-full overflow-hidden bg-cream-100`}>
                    <img
                      src={item.thumbUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                      <span className="text-white text-xs font-body font-medium inline-flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Click to Enlarge</span>
                      </span>
                    </div>

                    {/* Top Category Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-maroon-900 font-body text-xs font-bold shadow-xs border border-white/40">
                        {item.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-maroon-900/85 backdrop-blur-md text-white font-body text-[11px] font-semibold">
                        {item.edition}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-charcoal-900 group-hover:text-maroon-900 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-body text-charcoal-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="px-6 py-4 border-t border-[#ECE6DC] bg-cream-050/50 flex items-center justify-between text-xs text-charcoal-500 font-body">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-maroon-900" />
                    <span className="truncate max-w-[170px]">{item.venue}</span>
                  </div>
                  <div className="flex items-center gap-1 text-charcoal-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
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
              className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-pill bg-maroon-900 hover:bg-maroon-700 text-white font-body font-semibold text-sm shadow-sm transition-all gap-2"
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
                <span className="text-white/60 text-xs font-mono">
                  {selectedImageIndex + 1} / {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  title="Share photo link"
                >
                  {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                </button>
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  title="Open full resolution"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-sm transition-all"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-sm transition-all"
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
