import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import AccommodationCTA from './components/common/AccommodationCTA';
import SEO from './components/common/SEO';
import GoogleAnalytics from './components/common/GoogleAnalytics';

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
      <SEO
        title="3rd Convocation 2026 | IIIT Bhagalpur Official Portal"
        description="Official Convocation Portal of Indian Institute of Information Technology Bhagalpur (IIIT Bhagalpur). 3rd Convocation ceremony scheduled for 26 September 2026."
        canonicalUrl="https://convocation.iiitbh.ac.in/"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "EducationalOrganization",
              "@id": "https://www.iiitbh.ac.in/#organization",
              "name": "Indian Institute of Information Technology Bhagalpur",
              "alternateName": "IIIT Bhagalpur",
              "url": "https://www.iiitbh.ac.in",
              "logo": "https://convocation.iiitbh.ac.in/assets/iiitbh-logo.png"
            },
            {
              "@type": "WebSite",
              "@id": "https://convocation.iiitbh.ac.in/#website",
              "url": "https://convocation.iiitbh.ac.in/",
              "name": "IIIT Bhagalpur 3rd Convocation 2026",
              "description": "Official Convocation Portal of Indian Institute of Information Technology Bhagalpur"
            },
            {
              "@type": "Event",
              "@id": "https://convocation.iiitbh.ac.in/#event",
              "name": "3rd Convocation of IIIT Bhagalpur",
              "description": "Conferment of degrees to graduating B.Tech, M.Tech, and Ph.D. scholars at IIIT Bhagalpur.",
              "startDate": "2026-09-26T10:00:00+05:30",
              "endDate": "2026-09-26T15:00:00+05:30",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": "Main Lecture Hall, IIIT Bhagalpur Campus",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Sabour",
                  "addressLocality": "Bhagalpur",
                  "addressRegion": "Bihar",
                  "postalCode": "813210",
                  "addressCountry": "IN"
                }
              }
            }
          ]
        }}
      />
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
      <GoogleAnalytics />
      <NavBar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notices" element={<PageWrapper><NoticeSection /></PageWrapper>} />
          <Route path="/notice" element={<Navigate to="/notices" replace />} />
          <Route path="/accommodation" element={<PageWrapper><AccommodationSection /></PageWrapper>} />
          <Route path="/accommodations" element={<Navigate to="/accommodation" replace />} />
          <Route path="/gallery" element={<PageWrapper><GallerySection /></PageWrapper>} />
          <Route path="/gallery/:slug" element={<PageWrapper><GalleryAlbumView /></PageWrapper>} />
          <Route path="/archive" element={<PageWrapper><ArchiveSection /></PageWrapper>} />
          <Route path="/information" element={<PageWrapper><InformationSection /></PageWrapper>} />
          <Route path="/committee" element={<PageWrapper><CommitteeSection /></PageWrapper>} />
          <Route path="/committees" element={<Navigate to="/committee" replace />} />
          <Route path="/how-to-reach" element={<PageWrapper><HowToReachSection /></PageWrapper>} />
          {/* Catch-all route to avoid broken links / 404 indexing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
