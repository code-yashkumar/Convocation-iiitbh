import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ChevronRight, Calendar, ExternalLink } from 'lucide-react';
import InstitutionCrest from '../ui/InstitutionCrest';

const EVENT_DATE = new Date('2026-09-26T10:00:00+05:30');

function DaysToEvent() {
  const now = new Date();
  const diff = Math.ceil((EVENT_DATE - now) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return null;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 font-body text-[0.6875rem] font-semibold tracking-wide">
      <Calendar className="w-3 h-3" />
      {diff} day{diff !== 1 ? 's' : ''} to Convocation
    </span>
  );
}

const QUICK_LINKS = [
  { label: 'Schedule of Events', to: '/#schedule' },
  { label: 'Candidate Registration', href: 'https://forms.gle/1nxVrpcRUfgMhH938' },
  { label: 'Accommodation & Hotels', to: '/accommodation' },
  { label: 'Photo & Video Gallery', to: '/gallery' },
  { label: 'Organizing Committees', to: '/committee' },
  { label: 'Graduation Archive', to: '/archive' },
];

const GUIDELINE_LINKS = [
  { label: 'Academic Regalia & Dress Code', to: '/information' },
  { label: 'Guest Entry & Seating Protocol', to: '/information' },
  { label: 'Medalists & Rank Honors', to: '/information' },
  { label: 'Degree in Absentia Dispatch', to: '/information' },
  { label: 'Frequently Asked Questions', to: '/information' },
];

function FooterLink({ to, href, children }) {
  const cls =
    'group flex items-center gap-1.5 text-white/65 hover:text-gold-400 transition-colors duration-150 font-body text-sm leading-snug w-fit';
  const arrow = (
    <ChevronRight className="w-3 h-3 text-gold-500/0 group-hover:text-gold-400/80 transition-all duration-150 -translate-x-1 group-hover:translate-x-0" />
  );
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {arrow}
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-150 -ml-1" />
      </a>
    );
  return (
    <Link to={to} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}

/* ─── Ornamental Divider ─── */
function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/25 to-gold-500/10" />
      <div className="flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-gold-500/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-gold-500/60" />
        <span className="w-1 h-1 rounded-full bg-gold-500/40" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-500/25 to-gold-500/10" />
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="w-full mt-6 sm:mt-10"
      id="footer"
      style={{
        background: 'linear-gradient(160deg, #3F0A11 0%, #2E0709 60%, #1E0405 100%)',
      }}
    >
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      {/* ── Mobile Footer ── */}
      <div className="md:hidden px-5 pt-7 pb-6 space-y-5">
        {/* Brand */}
        <a
          href="https://www.iiitbh.ac.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group focus-visible:outline-none w-fit"
          aria-label="IIIT Bhagalpur Official Website"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 p-0.5 shrink-0 group-hover:scale-105 transition-transform shadow-md">
            <InstitutionCrest className="w-full h-full rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-white leading-tight">
              IIIT Bhagalpur
            </span>
            <span className="font-body text-[0.6875rem] text-gold-400/90 font-medium">
              3rd Convocation 2026 · Sabour, Bihar
            </span>
          </div>
        </a>

        <DaysToEvent />

        {/* Tap Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-body">
          {[
            { label: 'Event Schedule', to: '/#schedule' },
            { label: 'Registration', href: 'https://forms.gle/1nxVrpcRUfgMhH938' },
            { label: 'Regalia & Rules', to: '/information' },
            { label: 'Campus Transit', to: '/#how-to-reach' },
          ].map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 active:bg-white/10 active:scale-95 border border-white/10 text-white/80 flex items-center justify-between transition-all"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="p-2.5 rounded-xl bg-white/5 active:bg-white/10 active:scale-95 border border-white/10 text-white/80 flex items-center justify-between transition-all"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
              </Link>
            )
          )}
        </div>

        {/* Contact Pills */}
        <div className="flex items-center gap-2">
          <a
            href="mailto:convocation@iiitbh.ac.in"
            className="flex-1 py-2 px-3 rounded-xl bg-white/5 active:bg-white/10 active:scale-95 border border-white/10 text-[0.6875rem] font-body text-white/85 flex items-center justify-center gap-1.5 truncate transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">Email Secretariat</span>
          </a>
          <a
            href="tel:+916412451005"
            className="flex-1 py-2 px-3 rounded-xl bg-white/5 active:bg-white/10 active:scale-95 border border-white/10 text-[0.6875rem] font-body text-white/85 flex items-center justify-center gap-1.5 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>+91 641 245 1005</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[0.625rem] text-white/40 font-body">
          <span>© {new Date().getFullYear()} IIIT Bhagalpur</span>
          <span>Official Convocation Portal</span>
        </div>
      </div>

      {/* ── Desktop Footer ── */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-14 pb-0">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

          {/* Col 1 — Institute */}
          <div className="space-y-5 lg:col-span-1">
            <a
              href="https://www.iiitbh.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group focus-visible:outline-none w-fit"
              aria-label="IIIT Bhagalpur Official Website"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 p-0.5 shrink-0 group-hover:scale-105 transition-transform shadow-md">
                <InstitutionCrest className="w-full h-full rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white leading-tight">
                  IIIT Bhagalpur
                </span>
                <span className="font-body text-xs text-gold-400/90 font-medium tracking-wide">
                  3rd Convocation 2026
                </span>
              </div>
            </a>

            <p className="font-body text-sm text-white/55 leading-relaxed">
              Indian Institute of Information Technology Bhagalpur — an Institute of National Importance under the Ministry of Education, Govt. of India.
            </p>

            <DaysToEvent />

            {/* Event Date Chip */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center gap-2 text-white/50 font-body text-xs">
                <Calendar className="w-3.5 h-3.5 text-gold-500/70" />
                <span>26 September 2026 · Town Hall, Bhagalpur</span>
              </div>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="space-y-4">
            <h3 className="font-body font-bold text-[0.6875rem] text-gold-400 tracking-[0.12em] uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink to={l.to} href={l.href}>
                    {l.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Guidelines */}
          <div className="space-y-4">
            <h3 className="font-body font-bold text-[0.6875rem] text-gold-400 tracking-[0.12em] uppercase">
              Guidelines
            </h3>
            <ul className="space-y-2.5">
              {GUIDELINE_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink to={l.to}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Secretariat */}
          <div className="space-y-4">
            <h3 className="font-body font-bold text-[0.6875rem] text-gold-400 tracking-[0.12em] uppercase">
              Convocation Secretariat
            </h3>
            <div className="space-y-3 font-body text-sm">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <span className="text-white/60 leading-snug pt-1">
                  IIIT Bhagalpur Permanent Campus, Sabour, Bihar 813210
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <a
                  href="mailto:convocation@iiitbh.ac.in"
                  className="text-white/60 hover:text-gold-400 transition-colors duration-150"
                >
                  convocation@iiitbh.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <a
                  href="tel:+916412451005"
                  className="text-white/60 hover:text-gold-400 transition-colors duration-150"
                >
                  +91 641 245 1005
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Ornamental Divider */}
        <OrnamentalDivider />

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 border-t border-white/[0.07] text-[0.6875rem] text-white/35 font-body"
        >
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} IIIT Bhagalpur. All Rights Reserved.</span>
            <span className="w-px h-3 bg-white/20" />
            <a
              href="https://www.iiitbh.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              iiitbh.ac.in
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/25">Official Portal · 3rd Convocation 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
