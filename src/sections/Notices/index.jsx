import React, { useState, useEffect, useMemo } from 'react';
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
  X,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SEO from '../../components/common/SEO';
import { trackCustomEvent } from '../../utils/telemetry';
import defaultNoticesData from '../../data/notices.json';

// Helper to fetch and parse notices from Google Sheets
async function fetchNoticesFromGoogleSheet(sheetUrl) {
  if (!sheetUrl || typeof sheetUrl !== 'string') return null;
  const trimmed = sheetUrl.trim();

  // Format A: Standard Google Sheet URL (https://docs.google.com/spreadsheets/d/ID/...)
  const sheetIdMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (sheetIdMatch && sheetIdMatch[1]) {
    const sheetId = sheetIdMatch[1];
    const gidMatch = trimmed.match(/[#&?]gid=([0-9]+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json${gidParam}`;

    try {
      const res = await fetch(gvizUrl);
      const text = await res.text();
      const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
      if (jsonMatch && jsonMatch[1]) {
        const gvizData = JSON.parse(jsonMatch[1]);
        const table = gvizData.table;
        if (table && table.rows && table.rows.length > 0) {
          const cols = (table.cols || []).map((c) => (c?.label || '').toLowerCase().trim());

          return table.rows
            .map((row, idx) => {
              const cells = row.c || [];
              const getVal = (colKeyword, fallbackIdx) => {
                const matchedIdx = cols.findIndex((c) => c.includes(colKeyword.toLowerCase()));
                const targetIdx = matchedIdx !== -1 ? matchedIdx : fallbackIdx;
                const cell = cells[targetIdx];
                if (!cell) return '';
                return cell.f !== undefined
                  ? String(cell.f).trim()
                  : cell.v !== null && cell.v !== undefined
                  ? String(cell.v).trim()
                  : '';
              };

              const title = getVal('title', 0);
              const category = getVal('category', 1) || 'General';
              const date = getVal('date', 2) || '';
              const refNo = getVal('ref', 3) || `IIITBH/CONV/2026/NOT-${idx + 1}`;
              const description = getVal('description', 4) || '';
              const issuedBy = getVal('issued', 5) || 'Office of the Registrar';
              const pdfUrl = getVal('pdf', 6) || getVal('link', 6) || '';
              const isPinnedRaw = getVal('pin', 7);
              const isPinned =
                isPinnedRaw === true ||
                (typeof isPinnedRaw === 'string' &&
                  ['true', '1', 'yes', 'y', 'pinned'].includes(isPinnedRaw.trim().toLowerCase()));

              return {
                id: `notice-${idx + 1}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`,
                title,
                category,
                date,
                refNo,
                isPinned,
                description,
                issuedBy,
                pdfUrl,
              };
            })
            .filter((n) => n.title && n.title.length > 0);
        }
      }
    } catch {
      // Fallback
    }
  }

  // Format B: Google Apps Script Webhook or JSON API
  if (trimmed.includes('script.google.com') || trimmed.endsWith('.json')) {
    try {
      const res = await fetch(trimmed);
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map((n) => ({
          ...n,
          isPinned:
            n.isPinned === true ||
            (typeof n.isPinned === 'string' &&
              ['true', '1', 'yes', 'y', 'pinned'].includes(n.isPinned.trim().toLowerCase())),
        }));
      }
      if (data && Array.isArray(data.notices)) {
        return data.notices.map((n) => ({
          ...n,
          isPinned:
            n.isPinned === true ||
            (typeof n.isPinned === 'string' &&
              ['true', '1', 'yes', 'y', 'pinned'].includes(n.isPinned.trim().toLowerCase())),
        }));
      }
    } catch {
      // Fallback
    }
  }

  return null;
}

export function NoticeSection() {
  const [notices, setNotices] = useState(defaultNoticesData);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All Notices');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve Google Sheet Link from .env
  const sheetEnvUrl =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    (import.meta.env.VITE_NOTICES_SHEET_URL || import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL);

  useEffect(() => {
    if (sheetEnvUrl) {
      setIsLoading(true);
      fetchNoticesFromGoogleSheet(sheetEnvUrl)
        .then((fetchedNotices) => {
          if (fetchedNotices && Array.isArray(fetchedNotices) && fetchedNotices.length > 0) {
            setNotices(fetchedNotices);
            setIsLiveConnected(true);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [sheetEnvUrl]);

  // Dynamic category list based on active notices
  const categories = useMemo(() => {
    const unique = Array.from(new Set(notices.map((n) => n.category).filter(Boolean)));
    return ['All Notices', ...unique];
  }, [notices]);

  // Filter notices by category, search keyword, and sort pinned notices first
  const filteredNotices = useMemo(() => {
    const list = notices.filter((notice) => {
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

    // Pinned notices appear first in list
    return list.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
  }, [notices, activeCategory, searchTerm]);

  const handleShareNotice = (notice) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/notices#${notice.id}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    trackCustomEvent('share_notice', {
      notice_id: notice.id,
      notice_title: notice.title,
      notice_ref: notice.refNo,
    });
  };

  const handleDownloadPdf = (notice) => {
    trackCustomEvent('download_notice_pdf', {
      notice_id: notice.id,
      notice_title: notice.title,
      notice_ref: notice.refNo,
    });
    if (notice.pdfUrl && notice.pdfUrl.trim().length > 0) {
      window.open(notice.pdfUrl.trim(), '_blank');
    } else {
      alert(`Downloading official PDF for: ${notice.title}`);
    }
  };

  // Find specifically marked pinned notice (if any)
  const pinnedNotice = notices.find((n) => n.isPinned === true);

  return (
    <section className="w-full py-16 bg-cream-100 min-h-screen relative" id="notices">
      <SEO
        title="Official Notices & Circulars | 3rd Convocation 2026 — IIIT Bhagalpur"
        description="Official convocation notices, degree registration guidelines, medal lists, and ceremony circulars issued by IIIT Bhagalpur Convocation Secretariat."
        canonicalUrl="https://convocation.iiitbh.ac.in/notices"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Convocation Notice Board & Official Circulars",
          "url": "https://convocation.iiitbh.ac.in/notices",
          "description": "Official convocation circulars and announcements for IIIT Bhagalpur 3rd Convocation 2026.",
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
                "name": "Notices & Circulars",
                "item": "https://convocation.iiitbh.ac.in/notices"
              }
            ]
          }
        }}
      />
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold border border-maroon-900/10 shadow-xs">
              <Bell className="w-4 h-4 text-maroon-900 shrink-0" />
              <span>Official Communications</span>
            </div>

            {isLiveConnected && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-body text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Google Sheet Synced</span>
              </div>
            )}
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight leading-tight">
            Convocation Notice Board
          </h1>
          <p className="font-body text-charcoal-600 text-sm sm:text-lg mt-3 max-w-2xl mx-auto leading-relaxed">
            Real-time updates, formal invitation circulars, medal winner lists, and administrative orders for the 3rd Convocation.
          </p>
        </div>

        {/* Featured Pinned Announcement Banner (Only renders when isPinned is true) */}
        {pinnedNotice && (
          <div className="bg-gradient-to-br from-[#540D17] via-[#66101E] to-[#450A12] rounded-[1.5rem] sm:rounded-[2rem] text-white p-6 sm:p-10 lg:p-12 shadow-[0_16px_40px_rgba(84,13,23,0.18)] relative overflow-hidden border border-maroon-700/50 mb-8 sm:mb-12">
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
                  className="inline-flex items-center justify-center min-h-[3rem] px-7 rounded-pill bg-gold-500 text-charcoal-950 font-body font-bold text-sm shadow-md hover:bg-gold-400 active:scale-95 transition-all gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <FileText className="w-4 h-4 text-charcoal-950" />
                  <span>View Full Circular</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(pinnedNotice)}
                  className="inline-flex items-center justify-center min-h-[3rem] px-6 rounded-pill bg-white/15 hover:bg-white/25 border border-white/30 text-white font-body font-semibold text-sm transition-all gap-2 cursor-pointer w-full sm:w-auto whitespace-nowrap"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="bg-white rounded-[1.5rem] p-5 sm:p-6 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-10 space-y-4">
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

          {/* Category Filter Pills (Horizontal touch-scroll on mobile) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#ECE6DC]">
            <div className="overflow-x-auto no-scrollbar flex items-center gap-2 pb-1 sm:pb-0 -mx-1 px-1">
              {categories.map((cat) => {
                const count =
                  cat === 'All Notices'
                    ? notices.length
                    : notices.filter((n) => n.category === cat).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`min-h-[2.25rem] px-3.5 sm:px-4 rounded-pill font-body text-xs font-semibold transition-all focus-visible:outline-none cursor-pointer flex items-center gap-1.5 shrink-0 select-none ${
                      activeCategory === cat
                        ? 'bg-maroon-900 text-white shadow-xs'
                        : 'bg-cream-050 text-charcoal-700 hover:bg-cream-100 hover:text-maroon-900 border border-[#ECE6DC]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[0.6875rem] px-1.5 py-0.2 rounded-full ${
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

            <span className="text-xs font-body text-charcoal-500 shrink-0">
              Showing <strong>{filteredNotices.length}</strong> official circulars
            </span>
          </div>
        </div>

        {/* Grid of Notice Cards */}
        {filteredNotices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[1.5rem] border border-[#E8E2D8] p-8 mb-12">
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
                className={`group bg-white rounded-[1.5rem] p-6 sm:p-7 border hover:border-maroon-900 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(94,16,28,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  notice.isPinned
                    ? 'border-maroon-900/60 bg-gradient-to-b from-maroon-050/30 via-white to-white shadow-[0_6px_24px_rgba(94,16,28,0.07)]'
                    : 'border-[#E8E2D8]'
                }`}
              >
                <div>
                  {/* Card Header: Category, Pinned Badge & Ref */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-maroon-050 text-maroon-900 border border-maroon-900/15 font-body text-xs font-semibold">
                        {notice.category}
                      </span>
                      {notice.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-maroon-900 text-white font-body text-[0.6875rem] font-bold uppercase tracking-wider shadow-xs">
                          <Pin className="w-3 h-3 fill-white text-white" />
                          <span>Pinned</span>
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[0.6875rem] text-charcoal-400 font-medium truncate max-w-[8.125rem]">
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
                    <span className="px-2.5 py-0.5 rounded-md bg-cream-100 border border-border text-[0.6875rem] font-mono font-medium text-charcoal-700">
                      PDF Document
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
        <div className="bg-white rounded-[1.75rem] p-8 sm:p-10 border border-[#E8E2D8] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between gap-6">
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
              className="inline-flex items-center justify-center min-h-[2.875rem] px-6 rounded-pill bg-maroon-900 hover:bg-maroon-700 text-white font-body font-semibold text-sm shadow-sm transition-all gap-2 cursor-pointer"
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
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-maroon-050 text-maroon-900 font-semibold text-xs border border-maroon-900/15">
                  {selectedNotice.category}
                </span>
                {selectedNotice.isPinned && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-maroon-900 text-white font-body text-xs font-bold uppercase tracking-wider shadow-xs">
                    <Pin className="w-3 h-3 fill-white text-white" />
                    <span>Featured Pinned Circular</span>
                  </span>
                )}
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
              <p className="font-body text-charcoal-800 text-[0.9375rem] leading-relaxed">
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
                  iconLeft={<Download className="w-4 h-4 shrink-0" />}
                  className="whitespace-nowrap px-6 shrink-0"
                  onClick={() => handleDownloadPdf(selectedNotice)}
                >
                  <span className="whitespace-nowrap">Download PDF</span>
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
