import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'Academic Procession & Dignitaries',
    category: 'Ceremony',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
    caption: 'Faculty and Board members arriving at the main auditorium in ceremonial attire.',
  },
  {
    id: 2,
    title: 'Conferment of President Gold Medal',
    category: 'Awards',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    caption: 'Honoring top academic scholars across B.Tech and M.Tech programs.',
  },
  {
    id: 3,
    title: 'Graduating Cohort Celebration',
    category: 'Moments',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
    caption: 'Students throwing mortarboards in celebration of graduation milestone.',
  },
  {
    id: 4,
    title: 'Director Address & Senate Meeting',
    category: 'Ceremony',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    caption: 'Inaugural convocation remarks celebrating the institute growth and research.',
  },
  {
    id: 5,
    title: 'Parents & Family Gatherings',
    category: 'Moments',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop',
    caption: 'Proud families and guardians sharing memories on the institute campus lawn.',
  },
  {
    id: 6,
    title: 'Degree Presentation Stage',
    category: 'Awards',
    url: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?q=80&w=800&auto=format&fit=crop',
    caption: 'Graduates receiving degree scrolls on the main auditorium stage.',
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Ceremony', 'Awards', 'Moments'];

  const filteredImages = activeFilter === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  return (
    <section className="py-16 max-w-container mx-auto px-5 sm:px-10 lg:px-20" id="gallery">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-maroon-050 mb-3">
          <span className="type-label text-maroon-900 uppercase">Visual Memories</span>
        </div>
        <h2 className="type-display-lg text-text-default">Convocation Gallery</h2>
        <p className="type-body-lg text-text-muted mt-2">
          Glimpses from ceremonial traditions, medal distributions, and celebrations.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            className={`min-h-[40px] px-5 rounded-pill font-body text-[14px] font-semibold transition-all focus-visible:outline-none ${
              activeFilter === category
                ? 'bg-action-primary text-text-on-primary shadow-card'
                : 'bg-bg-surface text-text-muted hover:text-text-default border border-border'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImage(img)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedImage(img);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View photo: ${img.title}`}
            className="group relative rounded-md overflow-hidden border border-border shadow-card bg-bg-surface cursor-pointer focus-visible:outline-none"
          >
            <div className="aspect-[4/3] overflow-hidden bg-cream-050">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-reveal"
              />
            </div>
            <div className="p-4 bg-bg-surface">
              <span className="type-label text-maroon-900 text-[11px] uppercase tracking-wider">
                {img.category}
              </span>
              <h3 className="font-body font-semibold text-text-default text-[16px] mt-1 group-hover:text-maroon-900 transition-colors">
                {img.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Detail Modal */}
      <Modal
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title}
      >
        {selectedImage && (
          <div className="space-y-4">
            <div className="rounded-md overflow-hidden border border-border bg-cream-050 aspect-[16/10]">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="type-body-md text-text-muted">{selectedImage.caption}</p>
            <div className="flex justify-end pt-2">
              <Button variant="secondary" size="compact" onClick={() => setSelectedImage(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

export default GallerySection;
