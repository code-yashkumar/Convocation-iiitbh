import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import { Search, Download, Award, GraduationCap, Calendar, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import SEO from '../../components/common/SEO';

const ARCHIVE_STUDENTS = [
  // 3rd Convocation (2026)
  { id: '1', roll: '2201005CS', name: 'Ankur Dwivedi', degree: 'B.Tech CSE', year: '2026', medal: "President's Gold Medal" },
  { id: '2', roll: '240201007', name: 'Gaurav Singh Rajput', degree: 'M.Tech CSE (AI & Data Science)', year: '2026', medal: "Chairman's Gold Medal" },
  { id: '3', roll: '2201005CS', name: 'Ankur Dwivedi', degree: 'B.Tech CSE', year: '2026', medal: "Director's Gold Medal" },
  { id: '4', roll: '2201163EC', name: 'Rahul Kumar', degree: 'B.Tech ECE', year: '2026', medal: "Director's Gold Medal" },
  { id: '5', roll: '2201196ME', name: 'Shiekh Mahammad Arzu', degree: 'B.Tech MEA', year: '2026', medal: "Director's Gold Medal" },

  // 2nd Convocation (2025) - President's Gold Medal
  { id: '6', roll: '180101004', name: 'Amirul Islam', degree: 'B.Tech CSE (2018-22)', year: '2025', medal: "President's Gold Medal" },
  { id: '7', roll: '1901063', name: 'Shiva Patel', degree: 'B.Tech CSE (2019-23)', year: '2025', medal: "President's Gold Medal" },
  { id: '8', roll: '2001023', name: 'Harsh Rastogi', degree: 'B.Tech CSE (2020-24)', year: '2025', medal: "President's Gold Medal" },
  { id: '9', roll: '2101061CS', name: 'Vinit Kumar Singh', degree: 'B.Tech CSE (2021-25)', year: '2025', medal: "President's Gold Medal" },

  // 2nd Convocation (2025) - Chairman's Gold Medal
  { id: '10', roll: '2102010', name: 'Dibya Bashishtha', degree: 'M.Tech ECE - SPML (2021-23)', year: '2025', medal: "Chairman's Gold Medal" },
  { id: '11', roll: '230202001', name: 'Md Abdulbari Ansari', degree: 'M.Tech ECE - VLSI & ES (2023-25)', year: '2025', medal: "Chairman's Gold Medal" },

  // 2nd Convocation (2025) - Director's Gold Medal
  { id: '12', roll: '180101004', name: 'Amirul Islam', degree: 'B.Tech CSE (2018-22)', year: '2025', medal: "Director's Gold Medal" },
  { id: '13', roll: '180102040', name: 'Suraj Kumar', degree: 'B.Tech ECE (2018-22)', year: '2025', medal: "Director's Gold Medal" },
  { id: '14', roll: '180103011', name: 'Gopesh Krishna Yadav', degree: 'B.Tech MEA (2018-22)', year: '2025', medal: "Director's Gold Medal" },
  { id: '15', roll: '1901063', name: 'Shiva Patel', degree: 'B.Tech CSE (2019-23)', year: '2025', medal: "Director's Gold Medal" },
  { id: '16', roll: '1901046', name: 'Praveen Saraswat', degree: 'B.Tech ECE (2019-23)', year: '2025', medal: "Director's Gold Medal" },
  { id: '17', roll: '1901036', name: 'Ishaan Srivastava', degree: 'B.Tech MEA (2019-23)', year: '2025', medal: "Director's Gold Medal" },
  { id: '18', roll: '2001023', name: 'Harsh Rastogi', degree: 'B.Tech CSE (2020-24)', year: '2025', medal: "Director's Gold Medal" },
  { id: '19', roll: '2001034', name: 'Pushkal Agarwal', degree: 'B.Tech ECE (2020-24)', year: '2025', medal: "Director's Gold Medal" },
  { id: '20', roll: '2001104', name: 'Ankit Kumar', degree: 'B.Tech MEA (2020-24)', year: '2025', medal: "Director's Gold Medal" },
  { id: '21', roll: '2101061CS', name: 'Vinit Kumar Singh', degree: 'B.Tech CSE (2021-25)', year: '2025', medal: "Director's Gold Medal" },
  { id: '22', roll: '2101065EC', name: 'Priyanshu Raj', degree: 'B.Tech ECE (2021-25)', year: '2025', medal: "Director's Gold Medal" },
  { id: '23', roll: '2101201ME', name: 'Priya Mishra', degree: 'B.Tech MEA (2021-25)', year: '2025', medal: "Director's Gold Medal" },
];

function getMedalBadge(medal) {
  if (medal.includes("President")) {
    return {
      bg: 'bg-amber-50 text-amber-950 border-amber-300/80',
      iconColor: 'text-amber-600',
    };
  }
  if (medal.includes("Chairman")) {
    return {
      bg: 'bg-maroon-050 text-maroon-900 border-maroon-900/20',
      iconColor: 'text-maroon-900',
    };
  }
  return {
    bg: 'bg-cream-100 text-charcoal-900 border-[#D9D0C5]',
    iconColor: 'text-gold-600',
  };
}

export function ArchiveSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');

  const filteredData = ARCHIVE_STUDENTS.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(term) ||
      item.roll.toLowerCase().includes(term) ||
      item.degree.toLowerCase().includes(term) ||
      item.medal.toLowerCase().includes(term);
    const matchesYear = selectedYear === 'All' || item.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  const columns = [
    {
      key: 'roll',
      label: 'Roll Number',
      sortable: true,
      render: (val) => (
        <span className="font-mono text-xs font-semibold text-charcoal-700 bg-cream-050 px-2 py-1 rounded-md border border-[#ECE6DC]">
          {val}
        </span>
      ),
    },
    {
      key: 'name',
      label: 'Candidate Name',
      sortable: true,
      render: (val) => (
        <span className="font-display font-bold text-sm text-charcoal-900">
          {val}
        </span>
      ),
    },
    {
      key: 'degree',
      label: 'Program / Degree',
      sortable: true,
      render: (val) => (
        <span className="font-body text-xs sm:text-sm text-charcoal-700 font-medium">
          {val}
        </span>
      ),
    },
    {
      key: 'year',
      label: 'Graduation Year',
      sortable: true,
      render: (val) => (
        <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-charcoal-100 text-charcoal-800">
          {val}
        </span>
      ),
    },
    {
      key: 'medal',
      label: 'Honors / Recognition',
      render: (val) => {
        const medalStyle = getMedalBadge(val);
        return (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-body text-xs font-bold border shadow-2xs ${medalStyle.bg}`}>
            <Award className={`w-3.5 h-3.5 ${medalStyle.iconColor} shrink-0`} />
            <span>{val}</span>
          </span>
        );
      },
    },
  ];

  // Custom high-end Honor Card renderer for mobile view (< 768px: S, M, L screens)
  const renderArchiveCard = (item) => {
    const medalStyle = getMedalBadge(item.medal);

    return (
      <div
        key={item.id}
        className="bg-white rounded-2xl p-4 sm:p-5 border border-[#ECE6DC] shadow-sm hover:shadow-md hover:border-maroon-900/30 transition-all space-y-3 select-none"
      >
        {/* Top Row: Medal Badge on Left, Year Pill on Right */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-body text-xs font-bold border shadow-2xs ${medalStyle.bg}`}
          >
            <Award className={`w-3.5 h-3.5 ${medalStyle.iconColor} shrink-0`} />
            <span className="truncate max-w-[200px] min-[380px]:max-w-none">{item.medal}</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-charcoal-900 text-white font-mono text-[0.6875rem] font-bold shrink-0">
            <Calendar className="w-3 h-3 text-gold-400" />
            <span>{item.year}</span>
          </span>
        </div>

        {/* Middle Section: Candidate Name & Roll Number */}
        <div className="space-y-1 pt-0.5">
          <h3 className="font-display font-bold text-base min-[360px]:text-lg text-charcoal-900 leading-snug tracking-tight">
            {item.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-charcoal-600 bg-cream-050 px-2 py-0.5 rounded-md border border-[#ECE6DC]">
              Roll No: {item.roll}
            </span>
          </div>
        </div>

        {/* Bottom Row: Program / Degree & Convocation Edition */}
        <div className="pt-2.5 flex items-center justify-between gap-2 border-t border-[#ECE6DC]/80">
          <div className="flex items-center gap-1.5 text-xs text-charcoal-700 font-medium">
            <GraduationCap className="w-4 h-4 text-maroon-900 shrink-0" />
            <span className="leading-snug">{item.degree}</span>
          </div>
          <span className="text-[0.6875rem] font-body text-charcoal-400 font-semibold uppercase tracking-wider shrink-0 hidden min-[360px]:inline">
            {item.year === '2026' ? '3rd Convocation' : '2nd Convocation'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section className="pt-6 pb-12 w-full max-w-7xl mx-auto px-4 min-[400px]:px-6 md:px-10 lg:px-12" id="archive">
      <SEO
        title="Graduation Archive & Medal Winners | Convocation Records — IIIT Bhagalpur"
        description="Searchable institutional graduation archive, medal recipients, and degree honors across convocation editions of IIIT Bhagalpur."
        canonicalUrl="https://convocation.iiitbh.ac.in/archive"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "IIIT Bhagalpur Graduation Archive & Medal Honors",
          "url": "https://convocation.iiitbh.ac.in/archive",
          "description": "Historical roll of graduates and medal recipients from IIIT Bhagalpur.",
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
                "name": "Archive",
                "item": "https://convocation.iiitbh.ac.in/archive"
              }
            ]
          }
        }}
      />
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-050 mb-3 border border-maroon-900/10 shadow-xs">
          <Award className="w-3.5 h-3.5 text-maroon-900 shrink-0" />
          <span className="font-body text-xs sm:text-sm font-semibold text-maroon-900 uppercase tracking-wide">
            Roll of Honor &amp; Archives
          </span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal-900 tracking-tight leading-tight">
          Graduation Archive &amp; Honors
        </h1>
        <p className="font-body text-charcoal-600 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Searchable historical directory of medal awardees, program honors, and graduating cohorts across convocation editions of IIIT Bhagalpur.
        </p>
      </div>

      {/* Controls & Search Bar */}
      <div className="space-y-3.5 mb-6">
        {/* Row 1: Search Bar & Export Button */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <label htmlFor="search-archive" className="sr-only">Search graduate directory</label>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" aria-hidden="true" />
            <input
              id="search-archive"
              type="text"
              placeholder="Search by candidate name, roll no, degree..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 min-h-[2.75rem] rounded-xl bg-white border border-[#ECE6DC] text-charcoal-900 placeholder:text-charcoal-400 focus-visible:outline-none focus:border-maroon-900 text-xs sm:text-sm shadow-2xs"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-charcoal-200 hover:bg-charcoal-300 text-charcoal-600 flex items-center justify-center text-xs cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 justify-between md:justify-end">
            <span className="font-body text-xs text-charcoal-500 font-medium">
              Showing <strong className="text-charcoal-900">{filteredData.length}</strong> recipients
            </span>

            <Button
              variant="secondary"
              size="compact"
              iconLeft={<Download className="w-4 h-4" />}
              onClick={() => alert('Graduation list downloaded in PDF format.')}
              className="cursor-pointer whitespace-nowrap"
            >
              Export PDF
            </Button>
          </div>
        </div>

        {/* Row 2: Year Filter Pills (Touch-friendly & horizontal-scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          <span className="font-body text-xs text-charcoal-500 font-semibold uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            Edition:
          </span>
          {[
            { id: 'All', label: 'All Editions', count: ARCHIVE_STUDENTS.length },
            { id: '2026', label: '2026 (3rd Convocation)', count: ARCHIVE_STUDENTS.filter(s => s.year === '2026').length },
            { id: '2025', label: '2025 (2nd Convocation)', count: ARCHIVE_STUDENTS.filter(s => s.year === '2025').length },
          ].map((edition) => (
            <button
              key={edition.id}
              type="button"
              onClick={() => setSelectedYear(edition.id)}
              className={`min-h-[2.25rem] px-3.5 sm:px-4 rounded-pill font-body text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-none cursor-pointer shrink-0 select-none ${
                selectedYear === edition.id
                  ? 'bg-maroon-900 text-white shadow-xs'
                  : 'bg-white text-charcoal-700 hover:bg-cream-100 hover:text-maroon-900 border border-[#ECE6DC]'
              }`}
            >
              {edition.label} ({edition.count})
            </button>
          ))}
        </div>
      </div>

      {/* Data Table with Custom Honor Cards on Mobile & Rich Table on Desktop */}
      <DataTable
        columns={columns}
        data={filteredData}
        pageSize={10}
        renderCard={renderArchiveCard}
        emptyMessage="No graduate or medal awardee records found matching your query."
      />
    </section>
  );
}

export default ArchiveSection;
