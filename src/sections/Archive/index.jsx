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
    <section className="py-8 sm:py-16 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12" id="archive">
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
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-050 mb-3 border border-maroon-900/10 shadow-xs">
          <span className="font-body text-xs sm:text-sm font-semibold text-maroon-900 uppercase">Institutional Records</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-text-default tracking-tight leading-tight">
          Graduation Archive & Honors
        </h1>
        <p className="font-body text-text-muted mt-3 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
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
            className="w-full pl-10 pr-4 min-h-[2.75rem] rounded-sm bg-bg-surface border border-border text-text-default placeholder:text-charcoal-300 focus-visible:outline-none focus-visible:border-action-primary text-sm"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            aria-label="Filter by graduation year"
            className="min-h-[2.75rem] px-4 rounded-sm bg-bg-surface border border-border text-text-default text-sm focus-visible:outline-none"
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
