import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ChevronRight } from 'lucide-react';
import InstitutionCrest from '../ui/InstitutionCrest';

/**
 * Sleek, responsive footer component using the institutional inverse maroon theme
 */
export function Footer() {
  return (
    <footer className="w-full bg-[#3F0A11] sm:bg-bg-inverse text-text-on-primary mt-6 sm:mt-10 border-t border-maroon-700/40" id="footer">
      
      {/* Mobile Sleek Major-Information Footer (< md) */}
      <div className="md:hidden px-5 py-7 space-y-5">
        {/* Brand & Edition */}
        <a
          href="https://www.iiitbh.ac.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group focus-visible:outline-none w-fit"
          aria-label="IIIT Bhagalpur Official Website"
        >
          <InstitutionCrest className="w-10 h-10 bg-white rounded-full p-1 shadow-sm shrink-0 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-white leading-tight">
              IIIT Bhagalpur
            </span>
            <span className="font-body text-[11.5px] text-gold-400 font-medium">
              3rd Convocation 2026 • Sabour, Bihar
            </span>
          </div>
        </a>

        {/* Primary Essential Links in a Sleek 2x2 Tap Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-body">
          <Link
            to="/#schedule"
            className="p-2.5 rounded-xl bg-white/5 active:bg-white/10 border border-white/10 text-white/85 flex items-center justify-between"
          >
            <span>Event Schedule</span>
            <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
          </Link>
          <a
            href="https://forms.gle/1nxVrpcRUfgMhH938"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 active:bg-white/10 border border-white/10 text-white/85 flex items-center justify-between"
          >
            <span>Registration</span>
            <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
          </a>
          <Link
            to="/information"
            className="p-2.5 rounded-xl bg-white/5 active:bg-white/10 border border-white/10 text-white/85 flex items-center justify-between"
          >
            <span>Regalia & Rules</span>
            <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
          </Link>
          <Link
            to="/#how-to-reach"
            className="p-2.5 rounded-xl bg-white/5 active:bg-white/10 border border-white/10 text-white/85 flex items-center justify-between"
          >
            <span>Campus Transit</span>
            <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
          </Link>
        </div>

        {/* Direct Action Contact Pills */}
        <div className="flex items-center gap-2 pt-0.5">
          <a
            href="mailto:convocation@iiitbh.ac.in"
            className="flex-1 py-2 px-3 rounded-xl bg-white/5 active:bg-white/10 border border-white/10 text-[11.5px] font-body text-white/90 flex items-center justify-center gap-1.5 truncate"
          >
            <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">Email Secretariat</span>
          </a>
          <a
            href="tel:+916412451005"
            className="flex-1 py-2 px-3 rounded-xl bg-white/5 active:bg-white/10 border border-white/10 text-[11.5px] font-body text-white/90 flex items-center justify-center gap-1.5 shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>+91 641 245 1005</span>
          </a>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-body">
          <span>© {new Date().getFullYear()} IIIT Bhagalpur</span>
          <span>Official Convocation Portal</span>
        </div>
      </div>

      {/* Desktop Full 4-Column Footer (md+) */}
      <div className="hidden md:block w-full max-w-[clamp(1400px,94vw,3600px)] mx-auto px-6 sm:px-10 lg:px-[clamp(24px,3.5vw,120px)] py-[clamp(48px,4.5vw,120px)]">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-[clamp(36px,3.2vw,96px)] pb-[clamp(36px,3.2vw,96px)] border-b border-white/10">
          
          {/* Col 1: Institute Info */}
          <div className="space-y-4 sm:space-y-[clamp(16px,1.2vw,36px)]">
            <a
              href="https://www.iiitbh.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 sm:gap-[clamp(12px,1.0vw,28px)] group focus-visible:outline-none w-fit"
              aria-label="IIIT Bhagalpur Official Website"
            >
              <InstitutionCrest className="w-11 h-11 sm:w-[clamp(44px,3.2vw,88px)] sm:h-[clamp(44px,3.2vw,88px)] bg-white rounded-full p-1 shadow-sm shrink-0 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl sm:text-[clamp(20px,1.5vw,40px)] text-white leading-tight">
                  IIIT Bhagalpur
                </span>
                <span className="font-body text-xs sm:text-[clamp(12px,0.85vw,22px)] text-gold-400 font-medium tracking-wide">
                  3rd Convocation 2026
                </span>
              </div>
            </a>
            <p className="font-body text-sm sm:text-[clamp(14px,1.05vw,26px)] text-white/75 leading-relaxed">
              Indian Institute of Information Technology Bhagalpur is an Institute of National Importance under the Ministry of Education, Government of India.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3.5 sm:space-y-[clamp(14px,1.1vw,32px)]">
            <h3 className="font-body font-bold text-sm sm:text-[clamp(14px,1.05vw,28px)] text-gold-400 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-[clamp(8px,0.6vw,18px)] font-body text-sm sm:text-[clamp(14px,1.0vw,26px)]">
              <li>
                <Link to="/#schedule" className="text-white/80 hover:text-gold-400 transition-colors">
                  Schedule of Events
                </Link>
              </li>
              <li>
                <a
                  href="https://forms.gle/1nxVrpcRUfgMhH938"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-gold-400 transition-colors"
                >
                  Candidate Registration
                </a>
              </li>
              <li>
                <Link to="/accommodation" className="text-white/80 hover:text-gold-400 transition-colors">
                  Accommodation & Hotels
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/80 hover:text-gold-400 transition-colors">
                  Photo & Video Gallery
                </Link>
              </li>
              <li>
                <Link to="/committee" className="text-white/80 hover:text-gold-400 transition-colors">
                  Organizing Committees
                </Link>
              </li>
              <li>
                <Link to="/archive" className="text-white/80 hover:text-gold-400 transition-colors">
                  Graduation Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Guidelines & Protocol */}
          <div className="space-y-3.5 sm:space-y-[clamp(14px,1.1vw,32px)]">
            <h3 className="font-body font-bold text-sm sm:text-[clamp(14px,1.05vw,28px)] text-gold-400 tracking-wider uppercase">
              Guidelines
            </h3>
            <ul className="space-y-2 sm:space-y-[clamp(8px,0.6vw,18px)] font-body text-sm sm:text-[clamp(14px,1.0vw,26px)]">
              <li>
                <Link to="/information" className="text-white/80 hover:text-gold-400 transition-colors">
                  Academic Regalia & Dress Code
                </Link>
              </li>
              <li>
                <Link to="/information" className="text-white/80 hover:text-gold-400 transition-colors">
                  Guest Entry & Seating Protocol
                </Link>
              </li>
              <li>
                <Link to="/information" className="text-white/80 hover:text-gold-400 transition-colors">
                  Medalists & Rank Honors
                </Link>
              </li>
              <li>
                <Link to="/information" className="text-white/80 hover:text-gold-400 transition-colors">
                  Degree in Absentia Dispatch
                </Link>
              </li>
              <li>
                <Link to="/information" className="text-white/80 hover:text-gold-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Secretariat Contact */}
          <div className="space-y-3.5 sm:space-y-[clamp(14px,1.1vw,32px)]">
            <h3 className="font-body font-bold text-sm sm:text-[clamp(14px,1.05vw,28px)] text-gold-400 tracking-wider uppercase">
              Convocation Secretariat
            </h3>
            <div className="space-y-2.5 sm:space-y-[clamp(10px,0.7vw,22px)] font-body text-sm sm:text-[clamp(14px,1.0vw,26px)] text-white/80">
              <div className="flex items-start gap-2.5 sm:gap-[clamp(10px,0.7vw,22px)]">
                <MapPin className="w-4 h-4 sm:w-[clamp(16px,1.1vw,28px)] sm:h-[clamp(16px,1.1vw,28px)] text-gold-400 mt-0.5 shrink-0" />
                <span className="leading-snug">IIIT Bhagalpur Permanent Campus, Sabour, Bihar 813210</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-[clamp(10px,0.7vw,22px)]">
                <Mail className="w-4 h-4 sm:w-[clamp(16px,1.1vw,28px)] sm:h-[clamp(16px,1.1vw,28px)] text-gold-400 shrink-0" />
                <a href="mailto:convocation@iiitbh.ac.in" className="hover:text-gold-400 transition-colors truncate">
                  convocation@iiitbh.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-[clamp(10px,0.7vw,22px)]">
                <Phone className="w-4 h-4 sm:w-[clamp(16px,1.1vw,28px)] sm:h-[clamp(16px,1.1vw,28px)] text-gold-400 shrink-0" />
                <a href="tel:+916412451005" className="hover:text-gold-400 transition-colors">
                  +91 641 245 1005
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Bar */}
        <div className="pt-8 sm:pt-[clamp(28px,2.2vw,64px)] flex items-center justify-between text-xs sm:text-[clamp(12px,0.85vw,22px)] text-white/60 font-body">
          <p>© {new Date().getFullYear()} IIIT Bhagalpur. All Rights Reserved.</p>
          <p className="text-white/50">
            Official Portal for 3rd Convocation
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
