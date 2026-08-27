import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

// Section Views
import Hero from './sections/Hero';
import InformationBar from './sections/InformationBar';
import ScheduleSection from './sections/Schedule';
import GallerySection from './sections/Gallery';
import ArchiveSection from './sections/Archive';
import RegistrationFormSection from './sections/RegistrationForm';
import InformationSection from './sections/Information';

function HomePage() {
  return (
    <main>
      <Hero />
      <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 -mt-8 relative z-20">
        <InformationBar />
      </div>
      <ScheduleSection />
      <GallerySection />
      <RegistrationFormSection />
    </main>
  );
}

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-page text-text-default selection:bg-maroon-050 selection:text-maroon-900">
      <NavBar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<ScheduleSection />} />
          <Route path="/registration" element={<RegistrationFormSection />} />
          <Route path="/gallery" element={<GallerySection />} />
          <Route path="/archive" element={<ArchiveSection />} />
          <Route path="/information" element={<InformationSection />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
