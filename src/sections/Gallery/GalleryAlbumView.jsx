import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Eye,
  Camera,
  Calendar,
  MapPin,
  Check,
  FolderOpen,
  Grid,
  ChevronDown,
  Shuffle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import SEO from '../../components/common/SEO';
import drivePhotosData from '../../data/drivePhotos.json';

// Helper to randomly shuffle an array
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 4 Curated Albums Configuration
export const ALBUMS_CONFIG = {
  'degree-distribution': {
    slug: 'degree-distribution',
    title: 'Degree Distribution Ceremony',
    subtitle: 'Conferment of B.Tech, M.Tech, and Ph.D. degree scrolls, gold medals, and academic distinctions.',
    category: 'Ceremony',
    date: '26 September 2026',
    venue: 'Main Lecture Hall & Dias',
    driveEnvKey: 'VITE_DRIVE_DEGREE_DISTRIBUTION_URL',
    defaultDriveUrl: 'https://drive.google.com/drive/folders/1xAbTfEoEojO-mByrszg85xF73UfMuXk7?usp=drive_link',
    photos: [
      {
        id: 1,
        title: 'Grand Academic Procession & Stage Entry',
        caption: 'Director, Chief Guest, Board of Governors, and Senate arriving on stage in traditional academic stoles.',
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop',
        tag: 'Procession',
      },
      {
        id: 2,
        title: 'President & Director Gold Medal Conferment',
        caption: 'Honouring the highest academic and research distinctions of the graduating batch.',
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
        tag: 'Gold Medals',
      },
      {
        id: 3,
        title: 'B.Tech Engineering Degree Awarding',
        caption: 'Graduating engineers receiving their foundational degree scrolls from the Senate.',
        url: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?q=80&w=1200&auto=format&fit=crop',
        tag: 'B.Tech Conferment',
      },
      {
        id: 4,
        title: 'Ph.D. & M.Tech Research Scholars Felicitations',
        caption: 'Doctoral scholars and postgraduate engineers presented with doctoral hooding & degree honours.',
        url: 'https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?q=80&w=1200&auto=format&fit=crop',
        tag: 'Postgraduate & Ph.D.',
      },
      {
        id: 5,
        title: 'Ceremonial Mortarboard Toss',
        caption: 'Jubilant graduating scholars celebrating their milestone degree achievement.',
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
        tag: 'Celebration',
      },
      {
        id: 6,
        title: 'Institute Silver Medalists Roster',
        caption: 'Departmental rank holders receiving Institute Silver Medals for subject mastery.',
        url: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1200&auto=format&fit=crop',
        tag: 'Silver Medals',
      },
    ],
  },
  'convocation-evening': {
    slug: 'convocation-evening',
    title: 'Convocation Evening',
    subtitle: 'Vibrant cultural performances, celebratory music, student felicitations, and fellowship gala dinner.',
    category: 'Moments',
    date: '26 September 2026',
    venue: 'Institute Lawn Pavilion',
    driveEnvKey: 'VITE_DRIVE_CONVOCATION_EVENING_URL',
    defaultDriveUrl: 'https://drive.google.com/drive/folders/1y3MvFvY2KYi7TogjZeeCPb7u7IBfCsZk?usp=drive_link',
    photos: [
      {
        id: 1,
        title: 'Evening Cultural Lighting & Stage Aura',
        caption: 'Grand illuminated stage setup for the annual convocation cultural showcase.',
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop',
        tag: 'Illumination',
      },
      {
        id: 2,
        title: 'Live Musical & Folk Fusion Ensemble',
        caption: 'Institute cultural club performing traditional Saraswati Vandana and folk musical fusion.',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
        tag: 'Performances',
      },
      {
        id: 3,
        title: 'Graduates Fellowship & Candids',
        caption: 'Classmates reminiscing memories and sharing joyous moments on the central pavilion.',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
        tag: 'Memories',
      },
      {
        id: 4,
        title: 'Dignitaries & Faculty Gala Dinner',
        caption: 'Honouring graduating students alongside their professors and mentors.',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
        tag: 'Gala Dinner',
      },
      {
        id: 5,
        title: 'Night Sky Celebrations',
        caption: 'Illuminated campus landmarks celebrating the triumph of the 3rd Convocation.',
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
        tag: 'Celebration',
      },
      {
        id: 6,
        title: 'Alumni & Faculty Toast',
        caption: 'Raising a toast to future engineering achievements and global leadership.',
        url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop',
        tag: 'Fellowship',
      },
    ],
  },
  'alumni-meet': {
    slug: 'alumni-meet',
    title: 'Alumni Meet',
    subtitle: 'Annual homecoming assembly connecting distinguished alumni across all graduating cohorts with faculty.',
    category: 'Moments',
    date: '26 September 2026',
    venue: 'Campus Guest House Lawn',
    driveEnvKey: 'VITE_DRIVE_ALUMNI_MEET_URL',
    defaultDriveUrl: 'https://drive.google.com/drive/folders/1ic2XwUD-DcSQOB-f8ZjBde01D9OgJWSv?usp=drive_link',
    photos: [
      {
        id: 1,
        title: 'Homecoming Welcome & Registration',
        caption: 'Distinguished alumni returning to the permanent campus of IIIT Bhagalpur.',
        url: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=1600&auto=format&fit=crop',
        tag: 'Homecoming',
      },
      {
        id: 2,
        title: 'Alumni Mentorship & Tech Exchange',
        caption: 'Alumni leaders in tech and startups mentoring graduating seniors and young researchers.',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
        tag: 'Mentorship',
      },
      {
        id: 3,
        title: 'Founding Batch Reunion & Stories',
        caption: '2021 Inaugural batch alumni sharing memories of the campus inception years.',
        url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop',
        tag: 'Reunion',
      },
      {
        id: 4,
        title: 'Dean & Faculty Interactive Session',
        caption: 'Discussing the strategic academic and infrastructure expansion roadmap of IIIT Bhagalpur.',
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
        tag: 'Roundtable',
      },
      {
        id: 5,
        title: 'Alumni Association Charter',
        caption: 'Establishing regional chapters and student scholarship endowments.',
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
        tag: 'Charter',
      },
      {
        id: 6,
        title: 'Commemorative Cohort Photo',
        caption: 'Annual group photograph of alumni across CSE, ECE, and Mechatronics disciplines.',
        url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop',
        tag: 'Group Photo',
      },
    ],
  },
  'speaker-session': {
    slug: 'speaker-session',
    title: 'Speaker Session',
    subtitle: 'Visionary keynote addresses, distinguished guest of honour speeches, and convocation addresses.',
    category: 'Dignitaries',
    date: '26 September 2026',
    venue: 'Main Lecture Hall',
    driveEnvKey: 'VITE_DRIVE_SPEAKER_SESSION_URL',
    defaultDriveUrl: 'https://drive.google.com/drive/folders/1eA9osd542-FO_he4UOJf20EQpviATCKm?usp=drive_link',
    photos: [
      {
        id: 1,
        title: 'Chief Guest Keynote Address',
        caption: 'Eminent leader in academia and science delivering the convocation keynote address.',
        url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1600&auto=format&fit=crop',
        tag: 'Keynote',
      },
      {
        id: 2,
        title: 'Director Annual Report & Address',
        caption: 'Director presenting institutional milestones, NIRF growth, placements, and patent grants.',
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
        tag: 'Annual Report',
      },
      {
        id: 3,
        title: 'Board of Governors Chairman Address',
        caption: 'Visionary message on societal impact, ethical engineering, and indigenous innovation.',
        url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop',
        tag: 'BoG Address',
      },
      {
        id: 4,
        title: 'Senate Conferment Proceedings',
        caption: 'Formal Senate proceedings and approval of degree recipients roster.',
        url: 'https://images.unsplash.com/photo-1560523159-4a9692d222ef?q=80&w=1200&auto=format&fit=crop',
        tag: 'Senate Assembly',
      },
      {
        id: 5,
        title: 'Student Valedictorian Speech',
        caption: 'President Gold Medalist delivering the farewell valedictory reflections.',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
        tag: 'Valedictorian',
      },
      {
        id: 6,
        title: 'Opening Declaration & Vote of Thanks',
        caption: 'Formal closing declarations and vote of thanks by the Registrar.',
        url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
        tag: 'Closing Session',
      },
    ],
  },
};

// Helper to transform Google Drive sharing links to direct embeddable image URLs
export function formatDriveImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  const trimmed = url.trim();

  // If it's a Google Drive file link (e.g. /file/d/ID/view or open?id=ID or uc?id=ID)
  const fileIdMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (fileIdMatch && fileIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
  }

  return trimmed;
}

export function GalleryAlbumView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);
  const [randomSeed, setRandomSeed] = useState(0);
  const [failedIds, setFailedIds] = useState(new Set());

  // Normalize slug to match config
  const normalizedSlug = slug ? slug.toLowerCase().replace(/-ceremony$/, '') : '';
  const album = ALBUMS_CONFIG[normalizedSlug] || ALBUMS_CONFIG['degree-distribution'];

  // Retrieve Google Drive folder link from .env or fallback
  const driveUrl =
    (typeof import.meta !== 'undefined' &&
      import.meta.env &&
      import.meta.env[album.driveEnvKey]) ||
    album.defaultDriveUrl;

  // Check for extracted Google Drive photos from drivePhotos.json
  const extractedDrivePhotos = drivePhotosData && drivePhotosData[normalizedSlug];

  // Check for optional custom photos passed via env (comma-separated URLs)
  const photosEnvKey = album.driveEnvKey ? `${album.driveEnvKey}_PHOTOS` : null;
  const customPhotosRaw =
    photosEnvKey &&
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env[photosEnvKey];

  // Randomize the order of photos on album visit
  const allPhotos = useMemo(() => {
    let list = album.photos;
    if (customPhotosRaw && typeof customPhotosRaw === 'string') {
      const rawList = customPhotosRaw.split(',').map((s) => s.trim()).filter(Boolean);
      if (rawList.length > 0) {
        list = rawList.map((photoUrl, idx) => ({
          id: idx + 1,
          title: album.photos[idx]?.title || `${album.title} - Photo ${idx + 1}`,
          caption: album.photos[idx]?.caption || `${album.title} moment at IIIT Bhagalpur.`,
          url: formatDriveImageUrl(photoUrl),
          tag: album.photos[idx]?.tag || album.category,
        }));
      }
    } else if (extractedDrivePhotos && Array.isArray(extractedDrivePhotos) && extractedDrivePhotos.length > 0) {
      list = extractedDrivePhotos.map((item, idx) => ({
        id: idx + 1,
        title: `${album.title} - Photo ${idx + 1}`,
        caption: `High-resolution photograph from ${album.title} Google Drive album.`,
        url: item.url,
        tag: album.category,
      }));
    }
    return shuffleArray(list);
  }, [normalizedSlug, customPhotosRaw, extractedDrivePhotos, randomSeed, album.photos, album.title, album.category]);

  const handleImageError = useCallback((id) => {
    setFailedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  // Filter out any photos that fail to load
  const photos = useMemo(() => {
    return allPhotos.filter((p) => !failedIds.has(p.id));
  }, [allPhotos, failedIds]);

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      else if (e.key === 'ArrowRight')
        setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
      else if (e.key === 'ArrowLeft')
        setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
    },
    [selectedPhotoIndex, photos.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-cream-100 pt-3 pb-16 sm:pt-4 sm:pb-20">
      <SEO
        title={`${album.title} Photo Album | Convocation Gallery — IIIT Bhagalpur`}
        description={`Explore photographs from the ${album.title} during the Convocation ceremonies at IIIT Bhagalpur.`}
        canonicalUrl={`https://convocation.iiitbh.ac.in/gallery/${album.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": `${album.title} - IIIT Bhagalpur Convocation`,
          "url": `https://convocation.iiitbh.ac.in/gallery/${album.slug}`,
          "description": album.subtitle,
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://convocation.iiitbh.ac.in/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Gallery",
                "item": "https://convocation.iiitbh.ac.in/gallery"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": album.title,
                "item": `https://convocation.iiitbh.ac.in/gallery/${album.slug}`
              }
            ]
          }
        }}
      />
      <div className="max-w-[87.5rem] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Navigation Breadcrumb & Back Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-body font-semibold text-charcoal-700 hover:text-maroon-900 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-maroon-900" />
            <span>Back to All Gallery Albums</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Shuffle Photos Button */}
            <button
              type="button"
              onClick={() => setRandomSeed((prev) => prev + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-pill bg-white hover:bg-cream-050 text-charcoal-800 font-body font-semibold text-xs sm:text-sm border border-[#E8E2D8] shadow-xs hover:text-maroon-900 transition-all cursor-pointer"
              title="Randomize photo order"
            >
              <Shuffle className="w-3.5 h-3.5 text-maroon-900" />
              <span>Shuffle Photos</span>
            </button>

            {/* Drive CTA Link */}
            <a
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-maroon-900 text-white font-body font-semibold text-xs sm:text-sm hover:bg-maroon-700 shadow-sm transition-all cursor-pointer"
            >
              <FolderOpen className="w-4 h-4 text-gold-400" />
              <span>Open Google Drive Album ({photos.length})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Album Header */}
        <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-[#E8E2D8] shadow-[0_8px_30px_rgba(0,0,0,0.03)] mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="px-3.5 py-1 rounded-full bg-maroon-050 text-maroon-900 border border-maroon-900/15 font-body text-xs font-bold uppercase tracking-wider">
              {album.category} Album
            </span>

            <div className="flex items-center gap-3 text-xs font-mono text-charcoal-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-maroon-900" />
                {album.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-maroon-900" />
                {album.venue}
              </span>
            </div>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight leading-tight">
            {album.title}
          </h1>
          <p className="font-body text-charcoal-600 text-base sm:text-lg max-w-3xl mt-2 leading-relaxed">
            {album.subtitle}
          </p>
        </div>

        {/* Editorial Photo Bento Grid matching user's exact proportions with synchronized row heights */}
        <div className="space-y-4 sm:space-y-6 mb-12">
          
          {/* Row 1: Left Landscape (8 cols) + Right Tall Portrait (4 cols) with synchronized height */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            
            {/* Item 1: Wide Landscape (col-span-8) */}
            {photos[0] && (
              <div
                onClick={() => setSelectedPhotoIndex(0)}
                className="md:col-span-8 relative h-[260px] sm:h-[360px] md:h-[420px] lg:h-[480px] rounded-none overflow-hidden border border-[#E8E2D8] shadow-xs group cursor-pointer bg-charcoal-950"
              >
                <img
                  src={photos[0].url}
                  alt={photos[0].title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(photos[0].id)}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>
            )}

            {/* Item 2: Tall Portrait matching height (col-span-4) */}
            {photos[1] && (
              <div
                onClick={() => setSelectedPhotoIndex(1)}
                className="md:col-span-4 relative h-[260px] sm:h-[360px] md:h-[420px] lg:h-[480px] rounded-none overflow-hidden border border-[#E8E2D8] shadow-xs group cursor-pointer bg-charcoal-950"
              >
                <img
                  src={photos[1].url}
                  alt={photos[1].title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(photos[1].id)}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Row 2: 3 Balanced Bottom Cards (4 cols each) with synchronized height */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            
            {/* Item 3: Square/Landscape Photo (col-span-4) */}
            {photos[2] && (
              <div
                onClick={() => setSelectedPhotoIndex(2)}
                className="md:col-span-4 relative h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] rounded-none overflow-hidden border border-[#E8E2D8] shadow-xs group cursor-pointer bg-charcoal-950"
              >
                <img
                  src={photos[2].url}
                  alt={photos[2].title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(photos[2].id)}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>
            )}

            {/* Item 4: Square/Landscape Photo (col-span-4) */}
            {photos[3] && (
              <div
                onClick={() => setSelectedPhotoIndex(3)}
                className="md:col-span-4 relative h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] rounded-none overflow-hidden border border-[#E8E2D8] shadow-xs group cursor-pointer bg-charcoal-950"
              >
                <img
                  src={photos[3].url}
                  alt={photos[3].title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(photos[3].id)}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>
            )}

            {/* Item 5 & 6: Stacked Photos (col-span-4) */}
            <div className="md:col-span-4 flex flex-col gap-4 justify-between h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px]">
              {photos[4] && (
                <div
                  onClick={() => setSelectedPhotoIndex(4)}
                  className="relative flex-1 rounded-none overflow-hidden border border-[#E8E2D8] shadow-xs group cursor-pointer bg-charcoal-950"
                >
                  <img
                    src={photos[4].url}
                    alt={photos[4].title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(photos[4].id)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              )}

              {photos[5] && (
                <div
                  onClick={() => setSelectedPhotoIndex(5)}
                  className="relative flex-1 rounded-none overflow-hidden border border-[#E8E2D8] shadow-xs group cursor-pointer bg-charcoal-950"
                >
                  <img
                    src={photos[5].url}
                    alt={photos[5].title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(photos[5].id)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Extended Photos Stream if Album has more than 6 photos */}
        {photos.length > 6 && (
          <div className="mb-14">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2.5">
                <Grid className="w-5 h-5 text-maroon-900" />
                <h2 className="font-display font-bold text-xl sm:text-2xl text-charcoal-900">
                  All Album Photos ({photos.length})
                </h2>
              </div>

              <span className="text-xs sm:text-sm font-body text-charcoal-500">
                Showing {Math.min(visibleCount, photos.length)} of {photos.length}
              </span>
            </div>

            {/* Grid of sharp square photo cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {photos.slice(6, visibleCount).map((photo, idx) => {
                const actualIndex = idx + 6;
                return (
                  <div
                    key={photo.id || actualIndex}
                    onClick={() => setSelectedPhotoIndex(actualIndex)}
                    className="relative aspect-square rounded-none overflow-hidden border border-[#E8E2D8] shadow-xs group cursor-pointer bg-charcoal-950 hover:border-maroon-900/40 transition-all duration-300"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(photo.id)}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {visibleCount < photos.length && (
              <div className="text-center mt-8">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 24, photos.length))}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-white hover:bg-cream-050 text-maroon-900 font-body font-semibold text-sm border border-[#E8E2D8] shadow-xs hover:border-maroon-900/30 transition-all cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                  <span>Load More Photos ({photos.length - visibleCount} remaining)</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Other Albums Quick Navigation Bar */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal-900">
              Explore More Convocation Albums
            </h3>
            <p className="font-body text-charcoal-600 text-xs sm:text-sm">
              Discover highlights across degree distribution, speaker addresses, alumni reunions, and cultural celebrations.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.values(ALBUMS_CONFIG).map((other) => (
              <Link
                key={other.slug}
                to={`/gallery/${other.slug}`}
                className={`px-4 py-2 rounded-pill font-body text-xs font-semibold transition-all ${
                  other.slug === album.slug
                    ? 'bg-maroon-900 text-white shadow-xs'
                    : 'bg-cream-050 text-charcoal-700 hover:bg-maroon-050 hover:text-maroon-900 border border-[#ECE6DC]'
                }`}
              >
                {other.title}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-charcoal-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 px-6 bg-charcoal-900/80 border-b border-white/10 text-white">
              <span className="font-body font-semibold text-sm">
                Photo {selectedPhotoIndex + 1} of {photos.length}
              </span>
              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Container */}
            <div className="relative flex-1 min-h-[350px] sm:min-h-[480px] bg-black flex items-center justify-center p-2">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto object-contain select-none"
              />

              <button
                type="button"
                onClick={() =>
                  setSelectedPhotoIndex(
                    (prev) => (prev - 1 + photos.length) % photos.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedPhotoIndex((prev) => (prev + 1) % photos.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption */}
            <div className="p-5 bg-charcoal-900 border-t border-white/10 text-white space-y-1.5">
              <h3 className="font-display font-bold text-lg text-white">
                {selectedPhoto.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-white/80">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryAlbumView;
