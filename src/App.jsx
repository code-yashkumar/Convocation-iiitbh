import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import AccommodationCTA from './components/common/AccommodationCTA';

// Section Views
import Hero from './sections/Hero';
import DignitariesSection from './sections/Dignitaries';
import NoticeSection from './sections/Notices';
import ScheduleSection from './sections/Schedule';
import AccommodationSection from './sections/Accommodation';
import GallerySection from './sections/Gallery';
import GalleryAlbumView from './sections/Gallery/GalleryAlbumView';
import HomeGalleryCarousel from './sections/Gallery/HomeGalleryCarousel';
import ArchiveSection from './sections/Archive';
import RegistrationFormSection from './sections/RegistrationForm';
import HowToReachSection from './sections/HowToReach';
import InformationSection from './sections/Information';
import CommitteeSection from './sections/Committees';

function HomePage() {
  return (
    <main>
      <Hero />
      <DignitariesSection />
      <ScheduleSection />
      <AccommodationCTA />
      <HomeGalleryCarousel />
      <RegistrationFormSection />
      <HowToReachSection />
    </main>
  );
}

/**
 * Subpage wrapper to account for the fixed transparent/glass navbar
 */
function PageWrapper({ children }) {
  return <div className="pt-[68px] sm:pt-[76px]">{children}</div>;
}

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-charcoal-900 selection:bg-maroon-050 selection:text-maroon-900 font-body">
      <ScrollToTop />
      <NavBar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notices" element={<PageWrapper><NoticeSection /></PageWrapper>} />
          <Route path="/notice" element={<PageWrapper><NoticeSection /></PageWrapper>} />
          <Route path="/accommodation" element={<PageWrapper><AccommodationSection /></PageWrapper>} />
          <Route path="/accommodations" element={<PageWrapper><AccommodationSection /></PageWrapper>} />
          <Route path="/gallery" element={<PageWrapper><GallerySection /></PageWrapper>} />
          <Route path="/gallery/:slug" element={<PageWrapper><GalleryAlbumView /></PageWrapper>} />
          <Route path="/archive" element={<PageWrapper><ArchiveSection /></PageWrapper>} />
          <Route path="/information" element={<PageWrapper><InformationSection /></PageWrapper>} />
          <Route path="/committee" element={<PageWrapper><CommitteeSection /></PageWrapper>} />
          <Route path="/committees" element={<PageWrapper><CommitteeSection /></PageWrapper>} />
          <Route path="/how-to-reach" element={<PageWrapper><HowToReachSection /></PageWrapper>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
