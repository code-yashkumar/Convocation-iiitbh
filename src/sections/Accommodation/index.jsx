import React, { useState } from 'react';
import { Building, MapPin, Phone, Star, Compass, ExternalLink, Mail, Hotel, ShieldCheck, Sparkles } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SEO from '../../components/common/SEO';
import { trackCustomEvent } from '../../utils/telemetry';

const NEARBY_HOTELS = [
  {
    id: 'hotel-vaibhav',
    name: 'Hotel Vaibhav',
    category: 'Recommended',
    rating: '4.0',
    reviews: '720+ verified reviews',
    distance: '12 min (~4.8 km) from Bhagalpur Junction',
    address: 'Near Petrol Pump, M.G Road, Kacheri Chowk, Tilkamanjhi, Bhagalpur - 812001',
    phone: '+91 7947429764',
    altPhone: '+91 92644 59010',
    email: null,
    priceRange: '₹2,800 – ₹4,200 / night',
    amenities: ['AC Rooms', 'Free Wi-Fi', 'On-site Restaurant', '24/7 Front Desk', 'Free Private Parking', 'Terrace'],
    discountCode: 'IIITBH2026',
    discountNote: '10% Special Tariff for Convocation Attendees',
  },
  {
    id: 'hotel-ganges-courtyard',
    name: 'Hotel Ganges Courtyard',
    category: 'Premium Stay',
    rating: '4.2',
    reviews: '950+ verified reviews',
    distance: 'FM Mall Complex, Barari Industrial Estate',
    address: 'FM Mall and Cinema, Barari Industrial Area, Bhagalpur - 812003',
    phone: '+91 8409806683',
    altPhone: '+91 9031015853',
    email: 'courtyardganges@gmail.com',
    priceRange: '₹3,000 – ₹5,800 / night',
    amenities: ['King-size Beds', 'Free High-Speed Wi-Fi', 'Multi-Cuisine Dining', 'In-Room Safe', 'Mall & Cinema Access', 'Free Parking'],
    discountCode: 'IIITBH2026',
    discountNote: '15% Discount with Convocation Pass',
  },
  {
    id: 'hotel-rajhans-international',
    name: 'Hotel Rajhans International',
    category: 'Partner Hotel',
    rating: '4.2',
    reviews: '1.2k+ verified reviews',
    distance: 'Kachari Chowk, Central Bhagalpur (~5.2 km)',
    address: 'Kachari Chowk, M.G. Road, Bhagalpur, Bihar - 812001',
    phone: '+91 9308189201',
    altPhone: '+91 641 240 9411',
    email: 'info@hotelrajhansinternational.com',
    priceRange: '₹3,790 – ₹5,190 / night',
    amenities: ['Fine Dining Restaurant', 'Free Wi-Fi', '24/7 Security & CCTV', 'Station Pick-up/Drop', 'Grooming Saloon & Parlour', 'Free Parking'],
    discountCode: 'IIITBH2026',
    discountNote: 'Special Tariff for Alumni & Visiting Families',
  },
  {
    id: 'chinmaye-inn',
    name: 'Chinmaye Inn',
    category: 'Comfort Lodging',
    rating: '4.3',
    reviews: '850+ verified reviews',
    distance: 'R.B.S.R. Road (~4.5 km from Campus)',
    address: 'R.B.S.R. Path (Near 9 Pizza Hut), Khanjarpur Block, Bhagalpur - 812001',
    phone: '+91 8877222233',
    altPhone: null,
    email: 'info@chinmaye.in',
    priceRange: '₹2,600 – ₹3,500 / night',
    amenities: ['"Kesaria" Rooftop Dining', 'Free Wi-Fi', '24-Hour Front Desk', '5 Banquet Halls', 'Elevator', 'Tea/Coffee Maker'],
    discountCode: 'IIITBH2026',
    discountNote: '10% Discount for Graduating Students',
  },
  {
    id: 'roop-vihar-resorts',
    name: 'Roop Vihar Resorts',
    category: 'Resort & Stays',
    rating: '4.1',
    reviews: '580+ verified reviews',
    distance: 'Barari Road, Parghari (~4.2 km from Campus)',
    address: 'R.H. Lane, near Housing Board Chowk, Barari Road, Parghari, Bhagalpur - 813210',
    phone: '+91 7631005599',
    altPhone: '+91 7947110793',
    email: 'res.hotelroopvihar@gmail.com',
    priceRange: '₹2,499 – ₹4,999 / night',
    amenities: ['Swimming Pool', 'Multi-Cuisine Fine Dining & Cafe', 'Banquet & Lawns', 'Free Wi-Fi', '24/7 Power Backup', 'Room Service'],
    discountCode: 'IIITBHCONV',
    discountNote: 'Express Check-in for Alumni & Parents',
  },
];

const TRANSIT_INFO = [
  {
    title: 'Bhagalpur Junction (BGP)',
    type: 'Railway Station',
    distance: '4.5 km',
    details: 'Auto-rickshaws and app-based cabs available 24/7. Travel time approx 15–20 minutes to the campus.',
  },
  {
    title: 'Deoghar International Airport (DGH)',
    type: 'Nearest Airport',
    distance: '115 km',
    details: 'Direct taxi services available. Approximately 2.5 to 3 hours travel time via NH 333.',
  },
  {
    title: 'Patna Airport (PAT)',
    type: 'Alternative Airport',
    distance: '235 km',
    details: 'Connected via regular intercity express trains and highway state transport coaches.',
  },
];

export function AccommodationSection() {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
    trackCustomEvent('copy_hotel_discount_code', { promo_code: code });
  };

  return (
    <section className="w-full py-16 bg-cream-100 min-h-screen">
      <SEO
        title="Accommodation & Nearby Hotels | 3rd Convocation 2026 — IIIT Bhagalpur"
        description="Verified lodging directory, campus guest house reservation guidelines, and partner hotel tariffs in Bhagalpur with discount codes for convocation alumni, parents, and guests."
        canonicalUrl="https://convocation.iiitbh.ac.in/accommodation"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemPage",
          "name": "Accommodation & Nearby Hotels Directory",
          "url": "https://convocation.iiitbh.ac.in/accommodation",
          "description": "Hospitality and lodging options for guests attending the 3rd Convocation of IIIT Bhagalpur.",
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
                "name": "Accommodation",
                "item": "https://convocation.iiitbh.ac.in/accommodation"
              }
            ]
          }
        }}
      />
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-[11.5px] sm:text-sm font-semibold mb-3 sm:mb-4 border border-maroon-900/10 shadow-xs whitespace-nowrap">
            <Hotel className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-maroon-900 shrink-0" />
            <span>Alumni & Guest Hospitality</span>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
            Accommodation & Nearby Hotels
          </h1>
          <p className="font-body text-charcoal-600 text-sm sm:text-lg mt-2 sm:mt-3">
            Handpicked lodging options, partner hotel tariffs, and campus guest house details for alumni, parents, and guests attending the 3rd Convocation.
          </p>
        </div>

        {/* Campus Guest House Notice Banner */}
        <div className="bg-white rounded-[22px] sm:rounded-[24px] border border-[#E8E2D8] p-5 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-8 sm:mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-maroon-050 text-maroon-900 flex items-center justify-center shrink-0 border border-maroon-900/15">
              <Building className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal-900">
                  IIIT Bhagalpur Campus Guest House
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-semibold whitespace-nowrap">
                  Limited Rooms
                </span>
              </div>
              <p className="font-body text-charcoal-600 text-xs sm:text-sm mt-1 max-w-2xl">
                On-campus guest rooms are reserved for visiting dignitaries, keynote speakers, and immediate family of medalists on a first-come, first-served basis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="mailto:guesthouse@iiitbh.ac.in?subject=Convocation%20Guest%20House%20Enquiry"
              className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-pill bg-maroon-900 text-white font-body font-semibold text-xs sm:text-sm shadow-sm hover:bg-maroon-700 transition-all gap-2 w-full md:w-auto text-center whitespace-nowrap"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Enquire Guest House</span>
            </a>
          </div>
        </div>

        {/* Nearby Verified Hotels Grid */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="font-display font-bold text-xl sm:text-3xl text-charcoal-900">
                Recommended Hotels & Lodging in Bhagalpur
              </h2>
              <p className="font-body text-charcoal-600 text-xs sm:text-base mt-1">
                Verified hotels situated within 15–20 minutes drive from IIIT Bhagalpur campus.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {NEARBY_HOTELS.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-[22px] sm:rounded-[24px] p-5 sm:p-8 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(94,16,28,0.08)] hover:border-maroon-900/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Category Badge & Rating */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-maroon-050 text-maroon-900 border border-maroon-900/15 font-body text-xs font-semibold">
                      {hotel.category}
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{hotel.rating}</span>
                      <span className="text-amber-700/60 font-normal">({hotel.reviews})</span>
                    </div>
                  </div>

                  {/* Hotel Name & Price */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal-900 leading-snug">
                    {hotel.name}
                  </h3>
                  <div className="text-maroon-900 font-body font-bold text-sm sm:text-base mt-1">
                    {hotel.priceRange}
                  </div>

                  {/* Distance & Address */}
                  <div className="space-y-2 mt-4 text-sm font-body text-charcoal-600">
                    <div className="flex items-start gap-2 text-charcoal-900 font-medium">
                      <Compass className="w-4 h-4 text-maroon-900 mt-0.5 shrink-0" />
                      <span>{hotel.distance}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-charcoal-400 mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm leading-relaxed">{hotel.address}</span>
                    </div>
                  </div>

                  {/* Amenities Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {hotel.amenities.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-md bg-cream-050 border border-[#ECE6DC] text-charcoal-700 font-body text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Convocation Discount Box */}
                  <div className="mt-5 p-3.5 rounded-xl bg-maroon-050/60 border border-maroon-900/15 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="font-body text-xs font-semibold text-maroon-900">
                        {hotel.discountNote}
                      </span>
                      <span className="font-mono text-[11px] text-charcoal-600 mt-0.5">
                        Code: <span className="font-bold text-maroon-900">{hotel.discountCode}</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(hotel.discountCode)}
                      className="px-3 py-1 rounded-pill bg-white border border-maroon-900/20 text-maroon-900 font-body text-xs font-medium hover:bg-maroon-900 hover:text-white transition-colors"
                    >
                      {copiedCode === hotel.discountCode ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-6 border-t border-[#ECE6DC] mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <a
                      href={`tel:${hotel.phone}`}
                      className="inline-flex items-center gap-1.5 text-charcoal-900 hover:text-maroon-900 font-body font-semibold text-xs sm:text-sm transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-maroon-900" />
                      <span>{hotel.phone}</span>
                    </a>
                    {hotel.altPhone && (
                      <a
                        href={`tel:${hotel.altPhone}`}
                        className="inline-flex items-center gap-1.5 text-charcoal-600 hover:text-maroon-900 font-body text-xs transition-colors"
                      >
                        <span>{hotel.altPhone}</span>
                      </a>
                    )}
                    {hotel.email && (
                      <a
                        href={`mailto:${hotel.email}`}
                        className="inline-flex items-center gap-1.5 text-charcoal-600 hover:text-maroon-900 font-body text-xs transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-maroon-900" />
                        <span>{hotel.email}</span>
                      </a>
                    )}
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(hotel.name + ' ' + hotel.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-pill bg-cream-100 hover:bg-maroon-900 hover:text-white text-charcoal-800 font-body text-xs font-medium transition-all"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transit & Travel Guide */}
        <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-[#E8E2D8] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
              Travel & Transportation Guide
            </h2>
            <p className="font-body text-charcoal-600 text-sm sm:text-base mt-1">
              How to reach IIIT Bhagalpur campus from key railheads and airports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRANSIT_INFO.map((transit) => (
              <div key={transit.title} className="p-5 rounded-2xl bg-cream-050 border border-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs font-semibold">
                      {transit.type}
                    </span>
                    <span className="font-mono text-xs font-bold text-maroon-900">
                      {transit.distance}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-charcoal-900">
                    {transit.title}
                  </h4>
                  <p className="font-body text-charcoal-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {transit.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default AccommodationSection;
