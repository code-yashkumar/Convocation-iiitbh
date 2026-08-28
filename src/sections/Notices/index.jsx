import React, { useState, useMemo } from 'react';
import {
  Bell,
  FileText,
  ArrowRight,
  Download,
  Calendar,
  Search,
  Sparkles,
  ExternalLink,
  Mail,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Clock,
  Pin,
  Share2,
  Check,
  X
} from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const NOTICES_DATA = [
  {
    id: 'invitation-card',
    title: 'Official Invitation Card & Programme Schedule',
    category: 'Invitation',
    badgeVariant: 'maroon',
    date: '10 September 2026',
    displayDate: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/INV-01',
    isPinned: true,
    description:
      'Official Invitation Card for the 3rd Convocation of IIIT Bhagalpur. All graduating students of B.Tech, M.Tech, and Ph.D. programmes, along with esteemed dignitaries, guests, faculty members, and accompanying parents, are cordially invited to grace the auspicious occasion on 26 September 2026 at the Main Lecture Hall.',
    pdfSize: '1.2 MB',
    issuedBy: 'Office of the Registrar & Convocation Secretariat',
  },
  {
    id: 'registration-date-time',
    title: 'Degree Registration, Fee & Rehearsal Schedule',
    category: 'Schedule',
    badgeVariant: 'primary',
    date: '08 September 2026',
    displayDate: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/REG-02',
    isPinned: true,
    description:
      'Detailed guidelines and portal instructions for degree registration confirmation, ceremonial gown & stole collection timeline, security clearance, and mandatory full-dress rehearsal timings scheduled at the Main Lecture Hall.',
    pdfSize: '450 KB',
    issuedBy: 'Associate Dean (Academic Affairs)',
  },
  {
    id: 'medal-winners',
    title: 'Provisional List of Medal Winners & Rank Holders',
    category: 'Highlight',
    badgeVariant: 'secondary',
    date: '05 September 2026',
    displayDate: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/MED-03',
    isPinned: false,
    description:
      'Provisional announcement of President Gold Medal, Director Gold Medal, Institute Silver Medals, and Departmental Best Project Award recipients for academic and research excellence across all graduating cohorts.',
    pdfSize: '620 KB',
    issuedBy: 'Medals & Awards Finalization Committee',
  },
  {
    id: 'news',
    title: 'Media Briefing & 4K Live Broadcast Advisory',
    category: 'Update',
    badgeVariant: 'neutral',
    date: '03 September 2026',
    displayDate: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/NEWS-04',
    isPinned: false,
    description:
      'Official press advisory regarding media passes, photography zones, and high-definition multi-camera live streaming on YouTube and the institute portal for families unable to attend in person.',
    pdfSize: '380 KB',
    issuedBy: 'Public Relations Office (PRO)',
  },
  {
    id: 'invitation',
    title: 'General Invitation for Alumni & Corporate Partners',
    category: 'General',
    badgeVariant: 'neutral',
    date: '01 September 2026',
    displayDate: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/GEN-05',
    isPinned: false,
    description:
      'General invitation circular for distinguished alumni, founding faculty, advisory board members, and industry recruitment partners to join the 3rd Convocation ceremony and alumni fellowship dinner.',
    pdfSize: '540 KB',
    issuedBy: 'Alumni Relations & International Affairs Section',
  },
  {
    id: 'office-order',
    title: 'Office Order on Committee Duties & Protocols',
    category: 'Important',
    badgeVariant: 'maroon',
    date: '28 August 2026',
    displayDate: 'Sep 2026',
    refNo: 'IIITBH/CONV/2026/OFF-06',
    isPinned: false,
    description:
      'Official administrative office order regarding the constitution of 22 convocation sub-committees, duty assignments for faculty and staff, campus traffic management, and emergency medical protocols.',
    pdfSize: '790 KB',
    issuedBy: 'Office of the Director, IIIT Bhagalpur',
  },
];

const CATEGORIES = ['All Notices', 'Invitation', 'Schedule', 'Highlight', 'Update', 'Important', 'General'];

export function NoticeSection() {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All Notices');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter notices by category and search keyword
  const filteredNotices = useMemo(() => {
    return NOTICES_DATA.filter((notice) => {
      const matchesCategory =
        activeCategory === 'All Notices' || notice.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      return (
        notice.title.toLowerCase().includes(query) ||
        notice.refNo.toLowerCase().includes(query) ||
        notice.description.toLowerCase().includes(query) ||
        notice.category.toLowerCase().includes(query) ||
        notice.issuedBy.toLowerCase().includes(query)
      );
    });
  }, [activeCategory, searchTerm]);

  const handleShareNotice = (notice) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/notices#${notice.id}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const pinnedNotice = NOTICES_DATA.find((n) => n.id === 'invitation-card');

  return (
    <section className="w-full py-16 bg-cream-100 min-h-screen relative" id="notices">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold mb-4 border border-maroon-900/10 shadow-xs">
            <Bell className="w-4 h-4 text-maroon-900" />
            <span>Official Communications</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
            Convocation Notice Board
          </h1>
          <p className="font-body text-charcoal-600 text-base sm:text-lg mt-3">
            Real-time updates, formal invitation circulars, medal winner lists, and administrative orders for the 3rd Convocation.
          </p>
        </div>

        {/* Featured Pinned Announcement Banner */}
        {pinnedNotice && (
          <div className="bg-gradient-to-br from-[#540D17] via-[#66101E] to-[#450A12] rounded-[28px] sm:rounded-[32px] text-white p-8 sm:p-10 lg:p-12 shadow-[0_16px_40px_rgba(84,13,23,0.18)] relative overflow-hidden border border-maroon-700/50 mb-12">
            {/* Background Aesthetic Glows */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gold-500/10 pointer-events-none blur-3xl" />
            <div className="absolute left-1/3 -bottom-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-body text-xs font-semibold uppercase tracking-wide">
                    <Pin className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span>Featured Circular</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white font-mono text-xs">
                    {pinnedNotice.refNo}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live & Active</span>
                  </div>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
                  {pinnedNotice.title}
                </h2>

                <p className="font-body text-white/85 text-sm sm:text-base leading-relaxed max-w-3xl">
                  {pinnedNotice.description}
                </p>

                <div className="flex items-center gap-4 text-xs sm:text-sm text-white/70 font-body pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gold-400" />
                    {pinnedNotice.date}
                  </span>
                  <span>•</span>
                  <span>Issued by: {pinnedNotice.issuedBy}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center lg:items-end">
                <button
                  type="button"
                  onClick={() => setSelectedNotice(pinnedNotice)}
                  className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-pill bg-gold-500 text-charcoal-950 font-body font-bold text-sm shadow-md hover:bg-gold-400 active:scale-95 transition-all gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <FileText className="w-4 h-4 text-charcoal-950" />
                  <span>View Full Circular</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Downloading official PDF for ${pinnedNotice.title} (${pinnedNotice.pdfSize})`)}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-pill bg-white/15 hover:bg-white/25 border border-white/30 text-white font-body font-semibold text-sm transition-all gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF ({pinnedNotice.pdfSize})</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-10 space-y-4">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search circulars by title, reference number (e.g. REG-02), or keywords..."
              className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-cream-050 border border-[#ECE6DC] font-body text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-maroon-900 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-body font-semibold text-maroon-900 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#ECE6DC]">
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const count =
                  cat === 'All Notices'
                    ? NOTICES_DATA.length
                    : NOTICES_DATA.filter((n) => n.category === cat).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`min-h-[36px] px-4 rounded-pill font-body text-xs font-semibold transition-all focus-visible:outline-none cursor-pointer flex items-center gap-1.5 ${
                      activeCategory === cat
                        ? 'bg-maroon-900 text-white shadow-xs'
                        : 'bg-cream-050 text-charcoal-700 hover:bg-cream-100 hover:text-maroon-900 border border-[#ECE6DC]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                        activeCategory === cat
                          ? 'bg-white/20 text-white'
                          : 'bg-cream-200 text-charcoal-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-body text-charcoal-500">
              Showing <strong>{filteredNotices.length}</strong> official circulars
            </span>
          </div>
        </div>

        {/* Grid of Notice Cards */}
        {filteredNotices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[24px] border border-[#E8E2D8] p-8 mb-12">
            <FileText className="w-12 h-12 text-charcoal-300 mx-auto mb-3" />
            <h3 className="font-display font-bold text-xl text-charcoal-800">No circulars matched</h3>
            <p className="font-body text-charcoal-500 text-sm mt-1">
              Try searching with another keyword or resetting the category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                className="group bg-white rounded-[24px] p-6 sm:p-7 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(94,16,28,0.08)] hover:border-maroon-900/30 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Card Header: Category & Ref */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-maroon-050 text-maroon-900 border border-maroon-900/15 font-body text-xs font-semibold">
                      {notice.category}
                    </span>
                    <span className="font-mono text-[11px] text-charcoal-400 font-medium truncate max-w-[140px]">
                      {notice.refNo}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal-900 group-hover:text-maroon-900 transition-colors leading-snug mb-3">
                    {notice.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-charcoal-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                    {notice.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-[#ECE6DC] space-y-3">
                  <div className="flex items-center justify-between text-xs font-body text-charcoal-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-maroon-900" />
                      {notice.date}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-cream-100 border border-border text-[11px] font-mono font-medium text-charcoal-700">
                      {notice.pdfSize} PDF
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-body font-semibold text-maroon-900 group-hover:text-maroon-700 pt-1">
                    <span>Read Circular & Download</span>
                    <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Secretariat Assistance Banner */}
        <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-[#E8E2D8] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs font-semibold mb-1 border border-maroon-900/10">
              <ShieldCheck className="w-3.5 h-3.5 text-maroon-900" />
              <span>Official Helpdesk</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal-900">
              Have Questions Regarding Circulars or Registration?
            </h3>
            <p className="font-body text-charcoal-600 text-sm max-w-xl leading-relaxed">
              For any queries regarding degree eligibility, medal lists, regalia stoles, or special invitations, contact the Convocation Secretariat.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:convocation@iiitbh.ac.in?subject=Enquiry%20Regarding%20Convocation%20Notice"
              className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-pill bg-maroon-900 hover:bg-maroon-700 text-white font-body font-semibold text-sm shadow-sm transition-all gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Secretariat</span>
            </a>
          </div>
        </div>

      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <Modal
          isOpen={!!selectedNotice}
          onClose={() => setSelectedNotice(null)}
          title={selectedNotice.title}
          size="lg"
        >
          <div className="space-y-6">
            {/* Meta row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border text-sm font-body">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-maroon-050 text-maroon-900 font-semibold text-xs border border-maroon-900/15">
                  {selectedNotice.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-charcoal-600 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-maroon-900" />
                  {selectedNotice.date}
                </span>
              </div>
              <span className="font-mono text-xs font-medium text-charcoal-500 bg-cream-100 px-2.5 py-1 rounded-md border border-border">
                Ref: {selectedNotice.refNo}
              </span>
            </div>

            {/* Issued By Header */}
            <div className="p-3.5 rounded-xl bg-cream-050 border border-border flex items-center justify-between text-xs font-body text-charcoal-700">
              <span>Authority: <strong>{selectedNotice.issuedBy}</strong></span>
              <span className="text-maroon-900 font-semibold">3rd Convocation 2026</span>
            </div>

            {/* Detailed Description */}
            <div className="space-y-3">
              <h4 className="font-body text-xs font-bold text-charcoal-500 uppercase tracking-wider">
                Circular Details
              </h4>
              <p className="font-body text-charcoal-800 text-[15px] leading-relaxed">
                {selectedNotice.description}
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:justify-between items-center border-t border-border">
              <button
                type="button"
                onClick={() => handleShareNotice(selectedNotice)}
                className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-charcoal-700 hover:text-maroon-900 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">Link Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Share Circular Link</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
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
                  <span>Download PDF ({selectedNotice.pdfSize})</span>
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default NoticeSection;
