import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

// Section Views
import Hero from './sections/Hero';
import NoticeSection from './sections/Notices';
import ScheduleSection from './sections/Schedule';
import GallerySection from './sections/Gallery';
import ArchiveSection from './sections/Archive';
import RegistrationFormSection from './sections/RegistrationForm';
import InformationSection from './sections/Information';

function HomePage() {
  return (
    <main>
      <Hero />
      <ScheduleSection />
      <GallerySection />
      <RegistrationFormSection />
    </main>
  );
}

/**
 * Subpage wrapper to account for the fixed transparent/glass navbar
 */
function PageWrapper({ children }) {
  return <div className="pt-24 sm:pt-28">{children}</div>;
}

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-charcoal-900 selection:bg-maroon-050 selection:text-maroon-900 font-body">
      <NavBar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notices" element={<PageWrapper><NoticeSection /></PageWrapper>} />
          <Route path="/notice" element={<PageWrapper><NoticeSection /></PageWrapper>} />
          <Route path="/schedule" element={<PageWrapper><ScheduleSection /></PageWrapper>} />
          <Route path="/registration" element={<PageWrapper><RegistrationFormSection /></PageWrapper>} />
          <Route path="/gallery" element={<PageWrapper><GallerySection /></PageWrapper>} />
          <Route path="/archive" element={<PageWrapper><ArchiveSection /></PageWrapper>} />
          <Route path="/information" element={<PageWrapper><InformationSection /></PageWrapper>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
