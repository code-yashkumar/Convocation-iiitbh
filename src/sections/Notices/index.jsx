import React, { useState } from 'react';
import { FileText, Download, Search, Bell, ExternalLink, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const OFFICIAL_NOTICES = [
  {
    id: 'NOTICE-2026-004',
    title: 'Announcement for 3rd Convocation Ceremony and Degree Registration',
    date: '15 August 2026',
    category: 'Registration',
    badgeVariant: 'primary',
    refNo: 'IIITBH/CONV/2026/01',
    description: 'All graduating students of B.Tech, M.Tech, and Ph.D. programs are hereby informed that the 3rd Convocation will be held on 26 September 2026 in the Main Lecture Hall.',
    fileSize: '420 KB',
  },
  {
    id: 'NOTICE-2026-003',
    title: 'Official Academic Regalia and Dress Code Guidelines for Graduands',
    date: '10 August 2026',
    category: 'Guidelines',
    badgeVariant: 'secondary',
    refNo: 'IIITBH/CONV/2026/02',
    description: 'Prescribed ethnic attire and stole colors for undergraduate, postgraduate, and doctoral degree recipients during the ceremonial procession.',
    fileSize: '680 KB',
  },
  {
    id: 'NOTICE-2026-002',
    title: 'List of Institute Gold Medalists and Departmental Rank Holders',
    date: '05 August 2026',
    category: 'Awards',
    badgeVariant: 'gold',
    refNo: 'IIITBH/CONV/2026/03',
    description: 'Provisional list of academic excellence awardees and President Gold Medal recipients eligible for medal conferment during the ceremony.',
    fileSize: '310 KB',
  },
  {
    id: 'NOTICE-2026-001',
    title: 'Guest Invitation and Accommodation Booking Circular for Parents',
    date: '01 August 2026',
    category: 'General',
    badgeVariant: 'outline',
    refNo: 'IIITBH/CONV/2026/04',
    description: 'Information regarding guest seating passes, campus parking arrangements, and nearby guest accommodation options.',
    fileSize: '512 KB',
  },
];

export function NoticeSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNotices = OFFICIAL_NOTICES.filter((notice) => {
    const matchesQuery =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.refNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || notice.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <section className="w-full py-16 bg-cream-100 min-h-[70vh]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-sm font-semibold mb-4 border border-maroon-900/10">
            <Bell className="w-4 h-4" />
            <span>Official Communications</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
            Convocation Notices & Circulars
          </h2>
          <p className="font-body text-charcoal-600 text-base sm:text-lg mt-3">
            Official announcements, guidelines, and circulars issued by the Convocation Secretariat for the 3rd Convocation.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-border shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-600/70" />
            <input
              type="text"
              placeholder="Search by title or reference number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-pill bg-cream-050 border border-border text-charcoal-900 font-body text-sm focus:outline-none focus:border-maroon-900 transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {['All', 'Registration', 'Guidelines', 'Awards', 'General'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-pill text-xs font-body font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-maroon-900 text-white shadow-sm'
                    : 'bg-cream-050 text-charcoal-600 hover:text-maroon-900 border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notices Grid / List */}
        <div className="space-y-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <Card
                key={notice.id}
                className="p-6 sm:p-7 hover:border-maroon-900/30 transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left notice info */}
                  <div className="space-y-2.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant={notice.badgeVariant}>{notice.category}</Badge>
                      <span className="font-body text-xs font-medium text-charcoal-600/80">
                        Ref: {notice.refNo}
                      </span>
                      <span className="inline-flex items-center gap-1 font-body text-xs text-charcoal-600">
                        <Calendar className="w-3.5 h-3.5 text-maroon-900" />
                        {notice.date}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal-900 leading-snug">
                      {notice.title}
                    </h3>

                    <p className="font-body text-charcoal-600 text-sm leading-relaxed">
                      {notice.description}
                    </p>
                  </div>

                  {/* Right Download / View CTA */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="gap-2"
                      onClick={() => alert(`Downloading official notice: ${notice.title}`)}
                    >
                      <Download className="w-4 h-4 text-maroon-900" />
                      <span>PDF ({notice.fileSize})</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-border">
              <FileText className="w-12 h-12 text-charcoal-600/40 mx-auto mb-3" />
              <h3 className="font-display font-semibold text-lg text-charcoal-900">
                No Notices Found
              </h3>
              <p className="font-body text-sm text-charcoal-600 mt-1">
                No circulars match your current search or category filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default NoticeSection;
