import React from 'react';
import Card from '../../components/ui/Card';
import { BookOpen, UserCheck, Shirt, HelpCircle } from 'lucide-react';
import SEO from '../../components/common/SEO';

const GUIDELINES = [
  {
    icon: Shirt,
    title: 'Academic Regalia & Dress Code',
    items: [
      'Graduates are required to wear formal attire beneath the academic convocation robe.',
      'Male candidates: White/Off-white Kurta Pyjama or formal trousers with full-sleeve shirt.',
      'Female candidates: White/Off-white Saree with border or Salwar Kameez.',
      'Stoles with institutional color code will be distributed upon morning registration.',
    ],
  },
  {
    icon: UserCheck,
    title: 'Guest & Accompanying Parents',
    items: [
      'Each graduating candidate may invite up to 2 registered guests/parents.',
      'Guest invitation passes must be displayed at the main gate for security clearance.',
      'Children below the age of 12 are not permitted inside the ceremonial auditorium hall.',
      'Special accessible seating is available near entrance aisles upon request.',
    ],
  },
  {
    icon: BookOpen,
    title: 'Rehearsal & Protocol',
    items: [
      'Mandatory rehearsal takes place at 09:00 AM in the Main Auditorium.',
      'Candidates who miss the rehearsal will not be permitted to receive degrees on stage.',
      'Mobile phones must remain switched off or in silent mode throughout the ceremony.',
    ],
  },
  {
    icon: HelpCircle,
    title: 'Degree in Absentia & Transcripts',
    items: [
      'Candidates unable to attend in person must mark attendance as "in absentia".',
      'Original degree certificates will be dispatched via registered Speed Post.',
      'Grade cards and provisional certificates can also be collected from the Academic Section.',
    ],
  },
];

export function InformationSection() {
  return (
    <section className="py-8 sm:py-16 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12" id="information">
      <SEO
        title="Guidelines, Academic Regalia & Protocol | 3rd Convocation 2026 — IIIT Bhagalpur"
        description="Essential dress code regulations, ceremonial stole guidelines, guest entry rules, degree in absentia dispatch protocols, and FAQs for IIIT Bhagalpur Convocation."
        canonicalUrl="https://convocation.iiitbh.ac.in/information"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemPage",
          "name": "General Instructions, Guidelines & Convocation Protocol",
          "url": "https://convocation.iiitbh.ac.in/information",
          "description": "Essential protocol and instructions for graduates and guests attending the 3rd Convocation of IIIT Bhagalpur.",
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
                "name": "Information & Guidelines",
                "item": "https://convocation.iiitbh.ac.in/information"
              }
            ]
          }
        }}
      />
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-050 mb-3 border border-maroon-900/10 shadow-xs">
          <span className="font-body text-xs sm:text-sm font-semibold text-maroon-900 uppercase">Guidelines & FAQs</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-text-default tracking-tight leading-tight">
          General Instructions & Protocol
        </h1>
        <p className="font-body text-text-muted mt-3 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Essential guidelines for graduating scholars, faculty, and visiting guests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {GUIDELINES.map((guide, idx) => {
          const Icon = guide.icon;
          return (
            <div
              key={idx}
              className="space-y-4 bg-white rounded-2xl sm:rounded-[1.5rem] p-6 sm:p-8 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(94,16,28,0.07)] hover:-translate-y-1 hover:border-maroon-900/30 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-maroon-050 flex items-center justify-center border border-maroon-900/15 text-maroon-900">
                  <Icon className="w-5 h-5 text-maroon-900 stroke-[1.75]" />
                </div>
                <h3 className="font-display font-bold text-charcoal-900 text-lg sm:text-xl">
                  {guide.title}
                </h3>
              </div>

              <ul className="space-y-2.5 pt-3 border-t border-[#ECE6DC]">
                {guide.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="font-body text-charcoal-600 text-xs sm:text-sm flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-maroon-900 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default InformationSection;
