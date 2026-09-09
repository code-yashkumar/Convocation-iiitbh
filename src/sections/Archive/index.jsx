import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import { Search, Download, Award } from 'lucide-react';
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
            <option value="2025">2025 (2nd Convocation)</option>
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
        pageSize={10}
        emptyMessage="No student records found matching your query."
      />
    </section>
  );
}

export default ArchiveSection;
