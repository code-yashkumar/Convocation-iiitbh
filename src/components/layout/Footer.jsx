import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import InstitutionCrest from '../ui/InstitutionCrest';

/**
 * Footer component using the institutional inverse maroon theme
 */
export function Footer() {
  return (
    <footer className="w-full bg-bg-inverse text-text-on-primary mt-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Institute Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <InstitutionCrest className="w-11 h-11 bg-white rounded-full p-1 shadow-sm" />
              <span className="font-display font-bold text-xl text-white">
                IIIT Bhagalpur
              </span>
            </div>
            <p className="type-body-sm text-white/80">
              Indian Institute of Information Technology Bhagalpur is an Institute of National Importance under the Ministry of Education, Government of India.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="type-label text-gold-500 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 type-body-sm">
              <li>
                <Link to="/#schedule" className="hover:text-gold-500 transition-colors">
                  Convocation Schedule
                </Link>
              </li>
              <li>
                <Link to="/#registration" className="hover:text-gold-500 transition-colors">
                  Degree Registration
                </Link>
              </li>
              <li>
                <Link to="/accommodation" className="hover:text-gold-500 transition-colors">
                  Hotel & Accommodation
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold-500 transition-colors">
                  Photo & Video Gallery
                </Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-gold-500 transition-colors">
                  Past Convocations Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Guidelines & Protocol */}
          <div className="space-y-4">
            <h3 className="type-label text-gold-500 tracking-wider uppercase">
              Guidelines
            </h3>
            <ul className="space-y-2 type-body-sm">
              <li>
                <Link to="/information" className="hover:text-gold-500 transition-colors">
                  Academic Regalia Protocol
                </Link>
              </li>
              <li>
                <Link to="/information" className="hover:text-gold-500 transition-colors">
                  Guest & Parent Seating
                </Link>
              </li>
              <li>
                <Link to="/information" className="hover:text-gold-500 transition-colors">
                  Medalists & Awards
                </Link>
              </li>
              <li>
                <Link to="/information" className="hover:text-gold-500 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Venue */}
          <div className="space-y-4">
            <h3 className="type-label text-gold-500 tracking-wider uppercase">
              Convocation Secretariat
            </h3>
            <div className="space-y-3 type-body-sm text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 mt-1 shrink-0" />
                <span>BCE Campus, Sabour, Bhagalpur, Bihar 813210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="mailto:convocation@iiitbh.ac.in" className="hover:text-gold-500">
                  convocation@iiitbh.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 641 245 1005</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 type-body-sm text-white/60">
          <p>© {new Date().getFullYear()} IIIT Bhagalpur. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with institutional design system tokens
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
