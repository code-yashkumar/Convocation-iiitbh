import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  UserCheck,
  Shield,
  Layers,
  Award,
  Sparkles,
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import SEO from '../../components/common/SEO';

const COMMITTEES_DATA = [
  {
    id: 1,
    name: 'Coordination Committee',
    category: 'Executive & Core',
    convener: {
      name: 'Dr. Dheeraj Kr. Sinha',
      role: 'Convener',
      designation: 'Registrar',
    },
    coConvener: {
      name: 'Dr. Himadri Nayak',
      role: 'Co-Convener',
      designation: 'AD (Academic Affair)',
    },
    members: [
      { name: 'Dr. Chandan Kumar Jha', designation: 'Faculty In-charge, Academic (UG)' },
      { name: 'Dr. Subarna Roy', designation: 'BSH' },
      { name: 'Mr. Adarsh Behera', designation: 'Technical Officer' },
      { name: 'Mr. Nilesh Kumar Bhardwaj', designation: 'Assistant Librarian' },
    ],
  },
  {
    id: 2,
    name: 'Reception of Dignitaries & VIP Committee',
    category: 'Protocol & Hospitality',
    convener: {
      name: 'Dr. Pradeep Kr Biswal',
      role: 'Convener',
      designation: 'AD (D&P)',
    },
    members: [
      { name: 'Dr. Om Prakash Singh', designation: 'Asst. Prof., CSE' },
      { name: 'Dr. Bijendra Sangar', designation: 'ECE' },
      { name: 'Dr. Prabhat Kumar Vidyarthi', designation: 'ECE' },
    ],
  },
  {
    id: 3,
    name: 'Preparing Text of Address by Chief Guest / Chairman / Director',
    category: 'Ceremonial & Academic',
    convener: {
      name: 'Dr. Dheeraj Kr. Sinha',
      role: 'Convener',
      designation: 'PRO',
    },
    members: [
      { name: 'Dr. Prasanta Sarkar', designation: 'Professor, ECE' },
      { name: 'Dr. Suraj', designation: 'Asst. Prof., ECE' },
      { name: 'Mr. Sourav Biswas', designation: 'TPO' },
      { name: 'Mr. Rajan Kumar', designation: 'JTS (outsourced), ECE' },
    ],
  },
  {
    id: 4,
    name: 'Arrangement of Full Dress Rehearsal',
    category: 'Ceremonial & Academic',
    convener: {
      name: 'Dr. Thejaswini M.',
      role: 'Convener',
      designation: 'AD (R&D)',
    },
    members: [
      { name: 'Dr. Satheeshkumar Kanakannavar', designation: 'Asst. Prof., MAE' },
      { name: 'Dr. Tameshwer Nath', designation: 'Asst. Prof., MAE' },
      { name: 'Dr. Swati Kumari', designation: 'CSE' },
      { name: 'Dr. Rounak Biswas', designation: 'BSH' },
    ],
  },
  {
    id: 5,
    name: 'Venue Preparation & Decoration',
    category: 'Infrastructure & Venue',
    convener: {
      name: 'Dr. Chetan Barde',
      role: 'Convener',
      designation: 'Asst. Prof., ECE',
    },
    members: [
      { name: 'Mr. Adarsh Kumar Behera', designation: 'TO' },
      { name: 'Mr. Hemant Kumar', designation: 'JTS, ECE' },
      { name: 'Mr. Bajrangbali', designation: 'JT, CSE' },
    ],
  },
  {
    id: 6,
    name: 'Preparation of Degree / Merit Certificates / Folder / Student Registration & Enquiry / Degree Distribution',
    category: 'Degrees & Conferment',
    convener: {
      name: 'Dr. Himadri Nayak',
      role: 'Convener',
      designation: 'AD (Academic Affair)',
    },
    coConvener: {
      name: 'Mrs. Abhilasha Bharti',
      role: 'Co-Convener',
      designation: 'AR (Academic)',
    },
    members: [
      { name: 'Dr. Chandan Kumar Jha', designation: 'Faculty In-charge, Academic (UG)' },
      { name: 'Dr. Sumit Raj', designation: 'CSE' },
      { name: 'Dr. Om Prakash Singh', designation: 'Asst. Prof., CSE' },
      { name: 'Dr. Chetan Barde', designation: 'Asst. Prof., ECE' },
      { name: 'Dr. Bhanu Priya', designation: 'ECE' },
      { name: 'Dr. Subhayu Ghosh', designation: 'CSE' },
      { name: 'Mr. Love Pandey', designation: 'JTS, CSE' },
      { name: 'Mr. Rajan Kumar', designation: 'JTS (outsourced), ECE' },
    ],
  },
  {
    id: 7,
    name: 'Finalization of Prize / Medal Recipients & Preparation of Medals',
    category: 'Degrees & Conferment',
    convener: {
      name: 'Dr. Himadri Nayak',
      role: 'Convener',
      designation: 'AD (Academic Affair)',
    },
    members: [
      { name: 'Dr. Dheeraj Kumar Sinha', designation: 'AD (SW)' },
      { name: 'Dr. Pradeep Kumar Biswal', designation: 'HoD, CSE' },
      { name: 'Dr. Sanjay Kumar', designation: 'Head, ECE' },
      { name: 'Dr. Abhinav Gautam', designation: 'Head, MAE' },
    ],
  },
  {
    id: 8,
    name: 'Printing of Brochure and Invitation Cards & Subsequent Dispatch / Distribution',
    category: 'Publicity & Media',
    convener: {
      name: 'Dr. Dheeraj Kr. Sinha',
      role: 'Convener',
      designation: 'PRO',
    },
    members: [
      { name: 'Dr. Pankaj Kumar Tiwari', designation: 'HoD, BSH' },
      { name: 'Mr. Imran Hussain', designation: 'JT, ECE' },
      { name: 'Dr. Pankaj Kr. Tiwari', designation: 'Asst. Prof., BSH' },
      { name: 'Dr. Suraj', designation: 'Asst. Prof., ECE' },
      { name: 'Dr. Subarna Roy', designation: 'BSH' },
      { name: 'Mr. Nilesh Kr. Bhardwaj', designation: 'Assistant Librarian' },
      { name: 'Mr. Hemant Kumar', designation: 'JTS, ECE' },
      { name: 'Mr. Rajan Singh', designation: 'JT, MAE' },
    ],
  },
  {
    id: 9,
    name: 'Arrangement of Academic Costumes',
    category: 'Ceremonial & Academic',
    convener: {
      name: 'Dr. Abhinav Gautam',
      role: 'Convener',
      designation: 'Head, MAE',
    },
    members: [
      { name: 'Dr. Thejaswini M.', designation: 'BSH' },
      { name: 'Dr. Poonam Yadav', designation: 'BSH' },
      { name: 'Dr. Chetan Barde', designation: 'Asst. Prof., ECE' },
      { name: 'Mr. Nilesh Kumar Bhardwaj', designation: 'Asst. Lib.' },
      { name: 'Mr. Uttam Kumar', designation: 'BSH' },
      { name: 'Dr. Mithilesh Kumar', designation: 'JT (outsourced), CSE' },
    ],
  },
  {
    id: 10,
    name: 'Press Note in News Papers',
    category: 'Publicity & Media',
    convener: {
      name: 'Dr. Dheeraj Kr. Sinha',
      role: 'Convener',
      designation: 'PRO',
    },
    members: [
      { name: 'Prof. Prasanta Sarkar', designation: 'ECE' },
      { name: 'Dr. Suraj', designation: 'Asst. Prof., ECE' },
      { name: 'Mr. Saurav Kumar', designation: 'JT, MAE' },
    ],
  },
  {
    id: 11,
    name: 'Hospitality & Catering Committee',
    category: 'Protocol & Hospitality',
    convener: {
      name: 'Dr. Sanjay Kumar',
      role: 'Convener',
      designation: 'Cultural Coordinator',
    },
    members: [
      { name: 'Dr. Prakash Ranjan', designation: 'Asst. Prof., ECE' },
      { name: 'Dr. Chetan Barde', designation: 'Asst. Prof., ECE' },
      { name: 'Dr. Prabhat Kumar Vidyarthi', designation: 'ECE' },
      { name: 'Dr. Poonam Yadav', designation: 'BSH' },
      { name: 'Dr. Bhanu Priya', designation: 'ECE' },
      { name: 'Dr. Mehul Kumar', designation: 'CSE' },
    ],
  },
  {
    id: 12,
    name: 'Stay of Students and Guests',
    category: 'Protocol & Hospitality',
    convener: {
      name: 'Dr. Prakash Ranjan',
      role: 'Convener',
      designation: 'HAB Coordinator',
    },
    members: [
      { name: 'Dr. Tameshwer Nath', designation: 'Warden KBH Hostel' },
      { name: 'Dr. Chetan Barde', designation: 'Warden KBH Hostel' },
      { name: 'Dr. Purnendu Kr. Mandal', designation: 'Warden off-campus Hostel' },
      { name: 'Dr. Thejaswini M.', designation: 'Faculty, IIIT Bhagalpur' },
    ],
  },
  {
    id: 13,
    name: 'Transport Committee',
    category: 'Logistics & Security',
    convener: {
      name: 'Dr. Tameshwer Nath',
      role: 'Convener',
      designation: 'F/I Transport',
    },
    members: [
      { name: 'Mr. Akshay Agarwal', designation: 'AR (GA)' },
      { name: 'Dr. Prabhat Kumar Vidyarthi', designation: 'ECE' },
      { name: 'Dr. Suneel Kumar', designation: 'CSE' },
    ],
  },
  {
    id: 14,
    name: 'Seating Arrangement Committee',
    category: 'Infrastructure & Venue',
    convener: {
      name: 'Dr. Purnendu Kr. Mandal',
      role: 'Convener',
      designation: 'Asst. Prof., MAE',
    },
    members: [
      { name: 'Dr. Dilip Kumar Choubey', designation: 'Asst. Prof., CSE' },
      { name: 'Dr. Uttam Kumar', designation: 'BSH' },
      { name: 'Dr. Suneel Kumar', designation: 'CSE' },
      { name: 'Dr. P. V. Bharadwaj Bayari', designation: 'CSE' },
      { name: 'Dr. Sachindra Bharti', designation: 'ECE' },
    ],
  },
  {
    id: 15,
    name: 'Disciplinary Committee',
    category: 'Executive & Core',
    convener: {
      name: 'Dr. Dheeraj Kr. Sinha',
      role: 'Convener',
      designation: 'AD (SW)',
    },
    members: [
      { name: 'All Heads of Departments (HoDs)', designation: 'IIIT Bhagalpur' },
    ],
  },
  {
    id: 16,
    name: 'Saraswati Vandana, Vande Mataram, Rashtriya Geet, National Anthem, Anchoring, Stage Management & Chair Arrangement Committee',
    category: 'Ceremonial & Academic',
    convener: {
      name: 'Dr. Sanjay Kumar',
      role: 'Convener',
      designation: 'Cultural Coordinator',
    },
    members: [
      { name: 'Dr. Swati Kumari', designation: 'CSE' },
      { name: 'Ms. Abhilasha Bharti', designation: 'AR (Academic, SW)' },
      { name: 'Dr. Anita Chandra', designation: 'CSE' },
      { name: 'Dr. Bhanu Priya', designation: 'ECE' },
      { name: 'Dr. Poonam Yadav', designation: 'BSH' },
      { name: 'Mr. Saurav Kumar', designation: 'JT, MAE' },
      { name: 'Mr. Rohit', designation: 'JT (outsourced), MAE' },
    ],
  },
  {
    id: 17,
    name: 'Display of Proceeding',
    category: 'Technical & Media',
    convener: {
      name: 'Dr. Dilip Kr. Choubey',
      role: 'Convener',
      designation: 'F/I CC',
    },
    members: [
      { name: 'Mr. Love Pandey', designation: 'JTS, CSE' },
      { name: 'Mr. Bajaranbali', designation: 'JT, CSE' },
      { name: 'Mr. Sanjeev Kumar', designation: 'Technician (outsourced), CC' },
      { name: 'Dr. Om Prakash Singh', designation: 'Asst. Prof., CSE' },
    ],
  },
  {
    id: 18,
    name: 'Video Coverage & Photography Committee',
    category: 'Publicity & Media',
    convener: {
      name: 'Dr. Sanjay Kumar',
      role: 'Convener',
      designation: 'Cultural Coordinator',
    },
    members: [
      { name: 'Mr. Nilesh Kumar Bhardwaj', designation: 'Asst. Lib.' },
      { name: 'Mr. Rajan Kumar', designation: 'JTS (outsourced), ECE' },
      { name: 'Two Student Representatives', designation: 'Nominated by the Convener' },
    ],
  },
  {
    id: 19,
    name: 'Alumni Relations Committee',
    category: 'Executive & Core',
    convener: {
      name: 'Dr. Prakash Ranjan',
      role: 'Convener',
      designation: 'AD (IR)',
    },
    members: [
      { name: 'Dr. Chetan Barde', designation: 'Asst. Prof., ECE' },
      { name: 'Dr. Vinay Kumar', designation: 'MAE' },
      { name: 'Mr. Sourav Biswas', designation: 'TPO' },
      { name: 'Dr. Bhanu Priya', designation: 'ECE' },
      { name: 'Mr. Hemant Tiwari', designation: 'JTS, ECE' },
    ],
  },
  {
    id: 20,
    name: 'Security / Parking & Traffic Control / NCC Cadet Deployment',
    category: 'Logistics & Security',
    convener: {
      name: 'Dr. Prakash Ranjan',
      role: 'Convener',
      designation: 'F/I Security',
    },
    members: [
      { name: 'Dr. Tameshwer Nath', designation: 'F/I NCC' },
      { name: 'Dr. Sachindra Bharti', designation: 'ECE' },
      { name: 'Dr. Vinay Kumar', designation: 'MAE' },
      { name: 'Mr. Rohit Kumar', designation: 'JT (outsourced), MAE' },
      { name: 'Mr. Mithilesh Kumar', designation: 'JT (outsourced), CSE' },
    ],
  },
  {
    id: 21,
    name: 'Campus Face-Lifting / Electrification & Furniture / PA System / Projection System / Overall Venue Management',
    category: 'Infrastructure & Venue',
    members: [
      { name: 'Dr. Suraj', designation: 'F/I Electrical works' },
      { name: 'Dr. Abhinav Gautam', designation: 'F/I Civil works' },
      { name: 'Dr. Sunil Kumar Singh', designation: 'F/I Horticulture & Sanitation' },
      { name: 'Mr. Adarsh Kumar Behera', designation: 'TO' },
      { name: 'Mr. Sanjeev Kumar', designation: 'Technician (outsourced), CC' },
      { name: 'Mr. Hemant Tiwari', designation: 'JTS, ECE' },
      { name: 'All Electricians & Maintenance Staff', designation: 'Estate & Works Section' },
    ],
  },
  {
    id: 22,
    name: 'Medical Assistance Committee',
    category: 'Logistics & Security',
    convener: {
      name: 'Dr. Sanjay Kumar',
      role: 'Convener',
      designation: 'F/I Medical Services',
    },
    members: [
      { name: 'Team of Institute & City Doctors', designation: 'Medical Officers' },
      { name: 'Supporting Paramedical & Ambulance Staff', designation: 'Health Center' },
    ],
  },
];

const CATEGORIES = [
  'All',
  'Executive & Core',
  'Ceremonial & Academic',
  'Degrees & Conferment',
  'Protocol & Hospitality',
  'Infrastructure & Venue',
  'Publicity & Media',
  'Logistics & Security',
];

export function CommitteeSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter committees based on search term and category
  const filteredCommittees = useMemo(() => {
    return COMMITTEES_DATA.filter((committee) => {
      const matchesCategory = activeCategory === 'All' || committee.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      const inTitle = committee.name.toLowerCase().includes(query);
      const inConvener =
        committee.convener &&
        (committee.convener.name.toLowerCase().includes(query) ||
          committee.convener.designation.toLowerCase().includes(query));
      const inCoConvener =
        committee.coConvener &&
        (committee.coConvener.name.toLowerCase().includes(query) ||
          committee.coConvener.designation.toLowerCase().includes(query));
      const inMembers = committee.members.some(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.designation.toLowerCase().includes(query)
      );

      return inTitle || inConvener || inCoConvener || inMembers;
    });
  }, [searchTerm, activeCategory]);

  return (
    <section className="w-full py-16 bg-cream-100 min-h-screen relative" id="committees">
      <SEO
        title="Organizing & Steering Committees | 3rd Convocation 2026 — IIIT Bhagalpur"
        description="Official roster of 22 specialized organizing committees, conveners, faculty, and staff coordinators managing the 3rd Convocation of IIIT Bhagalpur."
        canonicalUrl="https://convocation.iiitbh.ac.in/committee"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "Convocation Organizing & Steering Committees",
          "url": "https://convocation.iiitbh.ac.in/committee",
          "description": "22 institutional committees constituted for the successful organization of the 3rd Convocation.",
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
                "name": "Organizing Committees",
                "item": "https://convocation.iiitbh.ac.in/committee"
              }
            ]
          }
        }}
      />
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-28">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-maroon-900/10 shadow-xs">
            <Users className="w-4 h-4 text-maroon-900" />
            <span>Institutional Governance</span>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
            Organizing Committees
          </h1>
          <p className="font-body text-charcoal-600 text-sm sm:text-lg mt-2 sm:mt-3">
            Official roster of 40+ faculty conveners, administrative officers, and committee members across 22 specialized task forces for the 3rd Convocation.
          </p>
        </div>

        {/* Executive Stats Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl sm:rounded-[24px] p-4.5 sm:p-6 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-maroon-050 text-maroon-900 flex items-center justify-center shrink-0 border border-maroon-900/15">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-charcoal-900">22 Committees</div>
              <div className="font-body text-xs text-charcoal-600 mt-0.5">Specialized Task Forces</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-[24px] p-4.5 sm:p-6 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gold-500/20 text-maroon-900 flex items-center justify-center shrink-0 border border-gold-500/30">
              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-charcoal-900">40+ Members</div>
              <div className="font-body text-xs text-charcoal-600 mt-0.5">Faculty & Staff Appointees</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-[24px] p-4.5 sm:p-6 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-charcoal-900">Full Preparedness</div>
              <div className="font-body text-xs text-charcoal-600 mt-0.5">26 September 2026</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-[22px] sm:rounded-[24px] p-4 sm:p-6 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-8 sm:mb-10 space-y-3.5 sm:space-y-4">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 sm:w-5 sm:h-5 text-charcoal-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by faculty name, designation, or committee..."
              className="w-full pl-11 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl bg-cream-050 border border-[#ECE6DC] font-body text-xs sm:text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-maroon-900 focus:bg-white transition-all"
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

          {/* Category Filter Pills (Horizontal scroll on mobile) */}
          <div className="overflow-x-auto no-scrollbar flex items-center gap-1.5 sm:gap-2 pt-2 border-t border-[#ECE6DC] -mx-1 px-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`min-h-[34px] px-3.5 sm:px-4 rounded-pill font-body text-xs font-semibold transition-all focus-visible:outline-none cursor-pointer shrink-0 select-none ${
                  activeCategory === category
                    ? 'bg-maroon-900 text-white shadow-xs'
                    : 'bg-cream-050 text-charcoal-700 hover:bg-cream-100 hover:text-maroon-900 border border-[#ECE6DC]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Committees Grid (2 Columns on Large Displays) */}
        {filteredCommittees.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[24px] border border-[#E8E2D8] p-8">
            <Users className="w-12 h-12 text-charcoal-300 mx-auto mb-3" />
            <h3 className="font-display font-bold text-xl text-charcoal-800">No committee members matched</h3>
            <p className="font-body text-charcoal-500 text-sm mt-1">
              Try searching with another keyword or selecting "All" category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredCommittees.map((committee) => (
              <div
                key={committee.id}
                className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(94,16,28,0.06)] hover:border-maroon-900/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Category Badge & Committee Number */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-maroon-050 text-maroon-900 border border-maroon-900/15 font-body text-xs font-semibold">
                      {committee.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-charcoal-400">
                      #{String(committee.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Committee Name */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal-900 leading-snug">
                    {committee.id}. {committee.name}
                  </h3>

                  {/* Conveners Box */}
                  <div className="mt-5 space-y-2.5">
                    {committee.convener && (
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-maroon-050/80 to-cream-050 border border-maroon-900/15 flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <span className="font-body text-[11px] font-bold text-maroon-900 uppercase tracking-wider">
                            Convener
                          </span>
                          <h4 className="font-display font-bold text-base text-charcoal-900">
                            {committee.convener.name}
                          </h4>
                        </div>
                        <span className="font-body text-xs font-semibold text-charcoal-700 bg-white px-2.5 py-1 rounded-md border border-maroon-900/10 shrink-0">
                          {committee.convener.designation}
                        </span>
                      </div>
                    )}

                    {committee.coConvener && (
                      <div className="p-3.5 rounded-xl bg-cream-050 border border-[#ECE6DC] flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <span className="font-body text-[11px] font-bold text-charcoal-700 uppercase tracking-wider">
                            Co-Convener
                          </span>
                          <h4 className="font-display font-bold text-base text-charcoal-900">
                            {committee.coConvener.name}
                          </h4>
                        </div>
                        <span className="font-body text-xs font-semibold text-charcoal-700 bg-white px-2.5 py-1 rounded-md border border-border shrink-0">
                          {committee.coConvener.designation}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Committee Members List */}
                  <div className="mt-5">
                    <h4 className="font-body text-xs font-bold text-charcoal-500 uppercase tracking-wider mb-2.5">
                      Members
                    </h4>
                    <div className="space-y-2">
                      {committee.members.map((member, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-cream-050/60 border border-[#ECE6DC] text-xs sm:text-sm font-body"
                        >
                          <span className="font-semibold text-charcoal-900">
                            {member.name}
                          </span>
                          <span className="text-charcoal-600 text-xs font-medium text-right shrink-0 ml-2">
                            {member.designation}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer indicator */}
                <div className="mt-6 pt-4 border-t border-[#ECE6DC] flex items-center justify-between text-xs text-charcoal-500 font-body">
                  <span>IIIT Bhagalpur 3rd Convocation Secretariat</span>
                  <span className="font-semibold text-maroon-900">{committee.members.length + (committee.convener ? 1 : 0) + (committee.coConvener ? 1 : 0)} Personnel</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default CommitteeSection;
