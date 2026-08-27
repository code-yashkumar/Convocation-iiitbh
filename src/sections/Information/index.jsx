import React from 'react';
import Card from '../../components/ui/Card';
import { BookOpen, UserCheck, Shirt, HelpCircle } from 'lucide-react';

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
    <section className="py-16 max-w-container mx-auto px-5 sm:px-10 lg:px-20" id="information">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-maroon-050 mb-3">
          <span className="type-label text-maroon-900 uppercase">Guidelines & FAQs</span>
        </div>
        <h2 className="type-display-lg text-text-default">General Instructions & Protocol</h2>
        <p className="type-body-lg text-text-muted mt-2">
          Essential guidelines for graduating scholars, faculty, and visiting guests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
