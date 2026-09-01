import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import { Search, Download, Award } from 'lucide-react';
import Button from '../../components/ui/Button';
import SEO from '../../components/common/SEO';

const ARCHIVE_STUDENTS = [
  { id: '1', roll: '220101001', name: 'Aarav Sharma', degree: 'B.Tech CSE', year: '2026', medal: 'Institute Gold Medal' },
  { id: '2', roll: '220101015', name: 'Ananya Verma', degree: 'B.Tech ECE', year: '2026', medal: 'Director Silver Medal' },
  { id: '3', roll: '220102008', name: 'Rohan Gupta', degree: 'B.Tech Mechatronics', year: '2026', medal: 'Best Project Award' },
  { id: '4', roll: '220101032', name: 'Ishita Patel', degree: 'B.Tech CSE', year: '2026', medal: 'Academic Distinction' },
  { id: '5', roll: '240201002', name: 'Dr. Vivek Kumar', degree: 'Ph.D. CSE', year: '2026', medal: 'Best Thesis Award' },
  { id: '6', roll: '230101004', name: 'Pooja Singh', degree: 'M.Tech CSE', year: '2026', medal: 'First Rank' },
  { id: '7', roll: '210101010', name: 'Aditya Mishra', degree: 'B.Tech CSE', year: '2025', medal: 'President Gold Medal' },
  { id: '8', roll: '210102004', name: 'Sneha Roy', degree: 'B.Tech ECE', year: '2025', medal: 'Institute Silver Medal' },
];

export function ArchiveSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');

  const filteredData = ARCHIVE_STUDENTS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.degree.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === 'All' || item.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  const columns = [
    { key: 'roll', label: 'Roll Number', sortable: true },
    { key: 'name', label: 'Candidate Name', sortable: true },
    { key: 'degree', label: 'Program / Degree', sortable: true },
    { key: 'year', label: 'Graduation Year', sortable: true },
    {
      key: 'medal',
      label: 'Honors / Recognition',
      render: (val) => (
        <span className="inline-flex items-center gap-1.5 text-maroon-900 font-medium">
          <Award className="w-4 h-4 text-gold-500 shrink-0" />
          <span>{val}</span>
        </span>
      ),
    },
  ];

  return (
    <section className="py-8 sm:py-16 w-full max-w-[clamp(1400px,94vw,3600px)] mx-auto px-6 sm:px-10 lg:px-[clamp(24px,3.5vw,120px)]" id="archive">
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
      <div className="text-center max-w-[clamp(720px,58vw,1800px)] mx-auto mb-[clamp(36px,3.2vw,96px)]">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-[clamp(16px,1.2vw,36px)] py-1.5 sm:py-[clamp(6px,0.45vw,14px)] rounded-full bg-maroon-050 mb-[clamp(14px,1.1vw,36px)] border border-maroon-900/10 shadow-xs">
          <span className="font-body text-xs sm:text-[clamp(13px,0.95vw,26px)] font-semibold text-maroon-900 uppercase">Institutional Records</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-[clamp(36px,2.8vw,80px)] leading-[1.2] text-text-default tracking-tight">
          Graduation Archive & Honors
        </h1>
        <p className="font-body text-text-muted mt-[clamp(14px,1.1vw,36px)] text-sm sm:text-[clamp(15px,1.1vw,32px)] leading-relaxed max-w-[clamp(600px,48vw,1500px)] mx-auto">
          Directory of graduates, degree recipients, and medal awardees across convocation editions.
        </p>
      </div>

      {/* Controls & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <label htmlFor="search-archive" className="sr-only">Search graduate directory</label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" aria-hidden="true" />
          <input
            id="search-archive"
            type="text"
            placeholder="Search by name, roll no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 min-h-[44px] rounded-sm bg-bg-surface border border-border text-text-default placeholder:text-charcoal-300 focus-visible:outline-none focus-visible:border-action-primary text-[14px]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            aria-label="Filter by graduation year"
            className="min-h-[44px] px-4 rounded-sm bg-bg-surface border border-border text-text-default text-[14px] focus-visible:outline-none"
          >
            <option value="All">All Convocation Years</option>
            <option value="2026">2026 (3rd Convocation)</option>
            <option value="2025">2025 (4th Convocation)</option>
          </select>

          <Button
            variant="secondary"
            size="compact"
            iconLeft={<Download className="w-4 h-4" />}
            onClick={() => alert('Graduation list downloaded in PDF format.')}
          >
            Export List
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pageSize={5}
        emptyMessage="No student records found matching your query."
      />
    </section>
  );
}

export default ArchiveSection;
