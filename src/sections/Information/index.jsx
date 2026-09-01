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
    <section className="py-8 sm:py-16 w-full max-w-[clamp(1400px,94vw,3600px)] mx-auto px-6 sm:px-10 lg:px-[clamp(24px,3.5vw,120px)]" id="information">
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
      <div className="text-center max-w-[clamp(720px,58vw,1800px)] mx-auto mb-[clamp(36px,3.2vw,96px)]">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-[clamp(16px,1.2vw,36px)] py-1.5 sm:py-[clamp(6px,0.45vw,14px)] rounded-full bg-maroon-050 mb-[clamp(14px,1.1vw,36px)] border border-maroon-900/10 shadow-xs">
          <span className="font-body text-xs sm:text-[clamp(13px,0.95vw,26px)] font-semibold text-maroon-900 uppercase">Guidelines & FAQs</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-[clamp(36px,2.8vw,80px)] leading-[1.2] text-text-default tracking-tight">
          General Instructions & Protocol
        </h1>
        <p className="font-body text-text-muted mt-[clamp(14px,1.1vw,36px)] text-sm sm:text-[clamp(15px,1.1vw,32px)] leading-relaxed max-w-[clamp(600px,48vw,1500px)] mx-auto">
          Essential guidelines for graduating scholars, faculty, and visiting guests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {GUIDELINES.map((guide, idx) => {
          const Icon = guide.icon;
          return (
            <Card key={idx} variant="standard" className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-maroon-050 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-maroon-900 stroke-[1.75]" />
                </div>
                <h3 className="type-display-md text-text-default text-[18px]">
                  {guide.title}
                </h3>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-border">
                {guide.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="type-body-md text-text-muted flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-maroon-900 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default InformationSection;
