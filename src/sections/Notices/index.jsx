import React, { useState } from 'react';
import { Bell, FileText, ArrowRight, X, Download, Calendar, Tag, ShieldCheck, Mail, Sparkles, ExternalLink } from 'lucide-react';
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
    <section className="w-full py-14 sm:py-18 lg:py-20 bg-cream-100 min-h-screen relative" id="notices">
      <div className="max-w-[1240px] w-full mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold mb-4 border border-maroon-900/10 shadow-xs">
            <Bell className="w-4 h-4 text-maroon-900" />
            <span>Official Communications</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
            Notices & Circulars
          </h1>
          <p className="font-body text-charcoal-600 text-base sm:text-lg mt-3">
            Real-time updates, formal invitation circulars, medal lists, and administrative orders for the 3rd Convocation.
          </p>
        </div>

        {/* Main Unified Notice Board Card matching reference layout */}
        <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#E8E2D8] shadow-[0_16px_48px_rgba(94,16,28,0.08)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 mb-12">
          
          {/* Left Maroon Banner (Notice Board Header) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#540D17] to-[#731322] p-8 sm:p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background Aesthetic Ornament Glows */}
            <div className="absolute -right-12 -bottom-12 w-52 h-52 rounded-full bg-gold-500/10 pointer-events-none blur-2xl" />
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

            {/* Top: Icon + Title + Description */}
            <div className="relative z-10">
              {/* Notice Icon Badge */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-8 shadow-sm border border-white/20">
                <Bell className="w-7 h-7 sm:w-8 sm:h-8 text-gold-300" />
              </div>

              {/* Heading */}
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.08] mb-4 tracking-tight">
                Notice<br />Board
              </h2>

              {/* Subtitle */}
              <p className="font-body text-white/85 text-sm sm:text-base leading-relaxed max-w-sm">
                Latest updates and important announcements for Convocation IIIT Bhagalpur.
              </p>
            </div>

            {/* Bottom Status Pill */}
            <div className="mt-8 lg:mt-14 relative z-10">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-body text-xs sm:text-[13px] font-medium shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live • Real-time updates</span>
              </div>
            </div>
          </div>

          {/* Right Column: Notices List */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-3.5 bg-[#FAF8F5]">
            {NOTICES_LIST.map((notice) => (
              <button
                key={notice.id}
                type="button"
                onClick={() => setSelectedNotice(notice)}
                className="group w-full bg-white hover:bg-maroon-050/40 rounded-[20px] p-4 sm:p-4.5 border border-[#ECE6DC] hover:border-maroon-900/30 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
              >
                {/* Left: Icon + Title & Metadata */}
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Document Icon Container */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cream-100 group-hover:bg-maroon-900/10 border border-[#ECE6DC] flex items-center justify-center shrink-0 transition-colors">
                    <FileText className="w-5 h-5 text-charcoal-700 group-hover:text-maroon-900 transition-colors" />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col min-w-0">
                    <span className="font-body font-semibold text-[15px] sm:text-[16px] text-charcoal-900 group-hover:text-maroon-900 truncate transition-colors">
                      {notice.title}
                    </span>

                    <div className="flex items-center gap-2 mt-1">
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

        {/* Secretariat Enquiries Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal-900">
              Have Questions Regarding Official Circulars?
            </h3>
            <p className="font-body text-charcoal-600 text-sm">
              Contact the Convocation Secretariat or Academic Office for clarification on registration, stoles, or medals.
            </p>
          </div>
          <a
            href="mailto:convocation@iiitbh.ac.in?subject=Enquiry%20Regarding%20Convocation%20Notice"
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-pill bg-maroon-050 text-maroon-900 border border-maroon-900/20 font-body font-semibold text-sm hover:bg-maroon-900 hover:text-white transition-all gap-2 shrink-0 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Secretariat</span>
          </a>
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
