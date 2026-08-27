import React, { useState } from 'react';
import { Building, MapPin, Phone, Star, Compass, ExternalLink, Mail, Hotel } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const NEARBY_HOTELS = [
  {
    id: 'hotel-vaibhav',
    name: 'Hotel Vaibhav',
    category: 'Recommended',
    rating: '4.1',
    reviews: '720+ reviews',
    distance: '12 min from Bhagalpur Junction',
    address: 'Near Petrol Pump, M.G Road, Kacheri Chowk, Tilkamanjhi - 812001',
    phone: '+91 7947429764',
    altPhone: '+91 9264459010',
    email: null,
    priceRange: '₹1,800 – ₹3,200 / night',
    amenities: ['AC Rooms', 'Free Wi-Fi', '24/7 Room Service', 'Power Backup', 'Free Parking'],
    discountCode: 'IIITBH2026',
    discountNote: '10% Special Tariff for Convocation Attendees',
  },
  {
    id: 'hotel-ganges-courtyard',
    name: 'Hotel Ganges Courtyard',
    category: 'Premium Stay',
    rating: '4.3',
    reviews: '950+ reviews',
    distance: 'Barari Industrial Area, Bhagalpur',
    address: 'FM Mall and Cinema, Barari Industrial Area, Bhagalpur - 812003',
    phone: '+91 8409806683',
    altPhone: '+91 9031015853',
    email: 'courtyardganges@gmail.com',
    priceRange: '₹2,400 – ₹4,000 / night',
    amenities: ['Free Wi-Fi', 'Multi-Cuisine Restaurant', 'AC Rooms', 'Mall & Cinema Access', 'Free Parking'],
    discountCode: 'IIITBH2026',
    discountNote: '15% Discount with Convocation Pass',
  },
  {
    id: 'hotel-rajhans',
    name: 'Hotel Rajhans',
    category: 'Partner Hotel',
    rating: '4.2',
    reviews: '1.2k+ reviews',
    distance: 'Kachari Chowk, MG Road',
    address: 'Kachari Chowk, MG Road, Bhagalpur India, 812001',
    phone: '+91 9308189201',
    altPhone: '+91 641 240 9411',
    email: 'info@hotelrajhansinternational.com',
    priceRange: '₹2,500 – ₹4,200 / night',
    amenities: ['Free Wi-Fi', 'Complimentary Breakfast', 'AC Rooms', 'Multi-Cuisine Restaurant', 'Free Parking'],
    discountCode: 'IIITBH2026',
    discountNote: 'Special Tariff for Alumni & Visiting Families',
  },
  {
    id: 'chinmaye-inn',
    name: 'Chinmaye Inn',
    category: 'Comfort Lodging',
    rating: '4.1',
    reviews: '850+ reviews',
    distance: 'RBSR Road, Near 9 Pizza Hut',
    address: 'RBSR Road, Near 9 Pizza Hut, Bhagalpur - 812002',
    phone: '+91 8877222233',
    altPhone: null,
    email: 'info@chinmaye.in',
    priceRange: '₹2,000 – ₹3,500 / night',
    amenities: ['High-speed Wi-Fi', '24/7 Front Desk', 'Elevator', 'Doctor on Call', 'Hot Water'],
    discountCode: 'IIITBH2026',
    discountNote: '10% Discount for Graduating Students',
  },
  {
    id: 'roop-vihar',
    name: 'Roop Vihar',
    category: 'Budget Friendly',
    rating: '3.9',
    reviews: '410+ reviews',
    distance: 'Barari Rd, Parghari',
    address: 'Barari Rd, Parghari, Bhagalpur, Bihar 813210',
    phone: '+91 7947110793',
    altPhone: null,
    email: null,
    priceRange: '₹1,200 – ₹2,200 / night',
    amenities: ['Attached Baths', 'Free Wi-Fi', 'Luggage Storage', '24h Front Desk', 'Room Service'],
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
  };

  return (
    <section className="w-full py-16 bg-cream-100 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-050 text-maroon-900 font-body text-xs sm:text-sm font-semibold mb-4 border border-maroon-900/10 shadow-xs">
            <Hotel className="w-4 h-4 text-maroon-900" />
            <span>Alumni & Guest Hospitality</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight">
            Accommodation & Nearby Hotels
          </h1>
          <p className="font-body text-charcoal-600 text-base sm:text-lg mt-3">
            Handpicked lodging options, partner hotel tariffs, and campus guest house details for alumni, parents, and guests.
          </p>
        </div>

        {/* Campus Guest House Notice Banner */}
        <div className="bg-white rounded-[24px] border border-[#E8E2D8] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-maroon-050 text-maroon-900 flex items-center justify-center shrink-0 border border-maroon-900/15">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-xl text-charcoal-900">
                  IIIT Bhagalpur Campus Guest House
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  Limited Rooms
                </span>
              </div>
              <p className="font-body text-charcoal-600 text-sm mt-1 max-w-2xl">
                On-campus guest rooms are reserved for visiting dignitaries, keynote speakers, and immediate family of medalists on a first-come, first-served basis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="mailto:guesthouse@iiitbh.ac.in?subject=Convocation%20Guest%20House%20Enquiry"
              className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-pill bg-maroon-900 text-white font-body font-semibold text-sm shadow-sm hover:bg-maroon-700 transition-all gap-2 w-full md:w-auto"
            >
              <Mail className="w-4 h-4" />
              <span>Enquire Guest House</span>
            </a>
          </div>
        </div>

        {/* Nearby Verified Hotels Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
                Recommended Hotels & Lodging in Bhagalpur
              </h2>
              <p className="font-body text-charcoal-600 text-sm sm:text-base mt-1">
                Verified hotels situated within 15–20 minutes drive from IIIT Bhagalpur campus.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {NEARBY_HOTELS.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(94,16,28,0.08)] hover:border-maroon-900/30 transition-all duration-300 flex flex-col justify-between"
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
                      <span className="text-xs sm:text-sm">{hotel.address}</span>
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
