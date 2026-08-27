import React, { useState } from 'react';
import { Bell, FileText, ArrowRight, X, Download, Calendar, Tag, ShieldCheck } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

const NOTICES_LIST = [
  {
    id: 'invitation-card',
    title: 'Invitation Card',
    category: 'Invitation',
    date: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/INV-01',
    description:
      'Official Invitation Card for the 3rd Convocation of IIIT Bhagalpur. All graduating students, esteemed dignitaries, guests, and parents are cordially invited to grace the auspicious occasion on 26 September 2026 at the Main Lecture Hall.',
    pdfSize: '1.2 MB',
  },
  {
    id: 'registration-date-time',
    title: 'Registration Date and Time',
    category: 'Schedule',
    date: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/REG-02',
    description:
      'Detailed timeline and portal instructions for online registration, fee submission, gown collection schedule, and rehearsal timings for B.Tech, M.Tech, and Ph.D. degree recipients.',
    pdfSize: '450 KB',
  },
  {
    id: 'medal-winners',
    title: 'Medal Winners',
    category: 'Highlight',
    date: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/MED-03',
    description:
      'Provisional list of President Gold Medal, Director Gold Medal, Institute Silver Medals, and Departmental Rank Holders for academic excellence across graduating batches.',
    pdfSize: '620 KB',
  },
  {
    id: 'news',
    title: 'News',
    category: 'Update',
    date: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/NEWS-04',
    description:
      'Media release and press coverage for the upcoming 3rd Convocation ceremony. Information regarding live streaming links, photography passes, and campus entry guidelines.',
    pdfSize: '380 KB',
  },
  {
    id: 'invitation',
    title: 'Invitation',
    category: 'General',
    date: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/GEN-05',
    description:
      'General invitation circular for alumni, industry partners, faculty, and staff members to participate in the ceremonial convocation proceedings.',
    pdfSize: '540 KB',
  },
  {
    id: 'office-order',
    title: 'Office Order',
    category: 'Important',
    date: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/OFF-06',
    description:
      'Official administrative order regarding constitution of convocation sub-committees, duty allocations, security protocols, and vehicle parking management.',
    pdfSize: '790 KB',
  },
];

export function NoticeSection() {
  const [selectedNotice, setSelectedNotice] = useState(null);

  return (
    <section className="w-full py-12 lg:py-16 bg-cream-100 min-h-[75vh] flex items-center justify-center">
      <div className="max-w-[1100px] w-full mx-auto px-6 sm:px-10">
        
        {/* Main Unified Notice Board Card */}
        <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#E8E2D8] shadow-[0_12px_40px_rgba(94,16,28,0.08)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Maroon Banner (Notice Board Header) */}
          <div className="lg:col-span-4 bg-maroon-900 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background Accent Ornament */}
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full bg-maroon-700/30 pointer-events-none" />

            {/* Top: Icon + Title + Description */}
            <div className="relative z-10">
              {/* Notice Icon Badge */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-6 shadow-sm border border-white/20">
                <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              {/* Heading */}
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-4">
                Notice<br />Board
              </h2>

              {/* Subtitle */}
              <p className="font-body text-white/85 text-sm sm:text-[15px] leading-relaxed">
                Latest updates and important announcements for Convocation IIIT Bhagalpur.
              </p>
            </div>

            {/* Bottom Status Pill */}
            <div className="mt-8 lg:mt-12 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-body text-xs sm:text-[13px] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live • Real-time updates</span>
              </div>
            </div>
          </div>

          {/* Right Column: Notices List */}
          <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-3.5 bg-cream-050/30">
            {NOTICES_LIST.map((notice) => (
              <button
                key={notice.id}
                type="button"
                onClick={() => setSelectedNotice(notice)}
                className="group w-full bg-white hover:bg-maroon-050/40 rounded-[20px] p-4 sm:p-4.5 border border-[#ECE6DC] hover:border-maroon-900/30 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4 text-left focus:outline-none"
              >
                {/* Left: Icon + Title & Metadata */}
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Document / Menu Icon Container */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cream-100 group-hover:bg-maroon-900/10 border border-[#ECE6DC] flex items-center justify-center shrink-0 transition-colors">
                    <FileText className="w-5 h-5 text-charcoal-700 group-hover:text-maroon-900 transition-colors" />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col min-w-0">
                    <span className="font-body font-semibold text-[15px] sm:text-[16px] text-charcoal-900 group-hover:text-maroon-900 truncate transition-colors">
                      {notice.title}
                    </span>

                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-cream-100 group-hover:bg-maroon-100/70 text-charcoal-700 group-hover:text-maroon-900 font-body text-[11px] sm:text-[12px] font-medium transition-colors">
                        {notice.category}
                      </span>
                      <span className="text-charcoal-400 text-xs">•</span>
                      <span className="font-body text-charcoal-600 text-[12px]">
                        {notice.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Arrow Icon */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-charcoal-400 group-hover:text-maroon-900 group-hover:translate-x-1 transition-all shrink-0">
                  <ArrowRight className="w-5 h-5 stroke-[2]" />
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <Modal
          isOpen={!!selectedNotice}
          onClose={() => setSelectedNotice(null)}
          title={selectedNotice.title}
          size="md"
        >
          <div className="space-y-5">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 pb-3 border-b border-border text-sm">
              <span className="px-3 py-1 rounded-full bg-maroon-050 text-maroon-900 font-body font-semibold text-xs border border-maroon-900/15">
                {selectedNotice.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-charcoal-600 font-body text-xs">
                <Calendar className="w-3.5 h-3.5 text-maroon-900" />
                {selectedNotice.date}
              </span>
              <span className="text-charcoal-500 font-body text-xs ml-auto">
                Ref: {selectedNotice.refNo}
              </span>
            </div>

            {/* Description */}
            <p className="font-body text-charcoal-800 text-[15px] leading-relaxed">
              {selectedNotice.description}
            </p>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:justify-end border-t border-border">
              <Button
                variant="ghost"
                onClick={() => setSelectedNotice(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="gap-2"
                onClick={() => alert(`Downloading official PDF for ${selectedNotice.title} (${selectedNotice.pdfSize})`)}
              >
                <Download className="w-4 h-4" />
                <span>Download Notice ({selectedNotice.pdfSize})</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default NoticeSection;
