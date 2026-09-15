import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpRight, CalendarDays, ExternalLink } from 'lucide-react';
import InstitutionCrest from '../ui/InstitutionCrest';

export function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: 'Schedule of Events', to: '/#schedule' },
    { label: 'Candidate Registration', href: 'https://forms.gle/1nxVrpcRUfgMhH938' },
    { label: 'Accommodation & Hotels', to: '/accommodation' },
    { label: 'Photo & Video Gallery', to: '/gallery' },
    { label: 'Organizing Committees', to: '/committee' },
    { label: 'Graduation Archive', to: '/archive' },
  ];

  const guideLinks = [
    { label: 'Academic Regalia & Dress Code', to: '/information' },
    { label: 'Guest Entry & Seating Protocol', to: '/information' },
    { label: 'Medalists & Rank Honors', to: '/information' },
    { label: 'Degree in Absentia Dispatch', to: '/information' },
    { label: 'Frequently Asked Questions', to: '/information' },
  ];

  const LinkItem = ({ item }) =>
    item.href ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-1.5 text-white/60 hover:text-gold-400 transition-colors duration-200 text-sm font-body"
      >
        {item.label}
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </a>
    ) : (
      <Link
        to={item.to}
        className="group flex items-center gap-1.5 text-white/60 hover:text-gold-400 transition-colors duration-200 text-sm font-body"
      >
        {item.label}
        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </Link>
    );

  return (
    <footer
      className="w-full mt-6 sm:mt-10 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #2E0709 0%, #3F0A11 45%, #2A060A 100%)' }}
      id="footer"
    >
      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px)',
        }}
      />

      {/* Gold top accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      {/* ── MOBILE (< md) ── */}
      <div className="md:hidden px-5 pt-8 pb-7 space-y-6 relative z-10">
        {/* Brand */}
        <a
          href="https://www.iiitbh.ac.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group focus-visible:outline-none w-fit"
          aria-label="IIIT Bhagalpur Official Website"
        >
          <InstitutionCrest className="w-11 h-11 bg-white rounded-full p-1 shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-white leading-tight tracking-tight">
              IIIT Bhagalpur
            </span>
            <span className="font-body text-[0.71875rem] text-gold-400 font-medium">
              3rd Convocation 2026
            </span>
          </div>
        </a>

        {/* Event Date Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/6 border border-gold-500/20">
          <CalendarDays className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span className="font-body text-xs text-white/80 font-medium">
            26 September 2026 &nbsp;·&nbsp; Town Hall, Bhagalpur
          </span>
        </div>

        {/* 2×3 Link Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-body">
          {quickLinks.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 active:bg-white/10 active:scale-95 border border-white/8 text-white/80 flex items-center justify-between transition-all duration-200"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="p-2.5 rounded-xl bg-white/5 active:bg-white/10 active:scale-95 border border-white/8 text-white/80 flex items-center justify-between transition-all duration-200"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              </Link>
            )
          )}
        </div>

        {/* Contact Pills */}
        <div className="flex items-center gap-2">
          <a
            href="mailto:convocation@iiitbh.ac.in"
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 active:bg-white/10 active:scale-95 border border-white/8 text-[0.71875rem] font-body text-white/85 flex items-center justify-center gap-1.5 truncate transition-all duration-200"
          >
            <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">Email Secretariat</span>
          </a>
          <a
            href="tel:+916412451005"
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 active:bg-white/10 active:scale-95 border border-white/8 text-[0.71875rem] font-body text-white/85 flex items-center justify-center gap-1.5 transition-all duration-200"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>+91 641 245 1005</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/8 flex items-center justify-between text-[0.6875rem] text-white/35 font-body">
          <span>© {year} IIIT Bhagalpur</span>
          <span>Official Convocation Portal</span>
        </div>
      </div>

      {/* ── DESKTOP (md+) ── */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-14 pb-8 relative z-10">

        {/* Top row: Brand + Event highlight */}
        <div className="flex items-start justify-between gap-8 pb-10 border-b border-white/8">
          <div className="space-y-4 max-w-sm">
            <a
              href="https://www.iiitbh.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 group focus-visible:outline-none w-fit"
              aria-label="IIIT Bhagalpur Official Website"
            >
              <InstitutionCrest className="w-12 h-12 bg-white rounded-full p-1 shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-white leading-tight tracking-tight">
                  IIIT Bhagalpur
                </span>
                <span className="font-body text-xs text-gold-400 font-medium tracking-wide">
                  3rd Convocation 2026
                </span>
              </div>
            </a>
            <p className="font-body text-sm text-white/50 leading-relaxed">
              Indian Institute of Information Technology Bhagalpur — an Institute of National Importance under the Ministry of Education, Govt. of India.
            </p>
          </div>

          {/* Event date card */}
          <div className="flex flex-col items-end gap-2.5 shrink-0">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/6 border border-gold-500/25">
              <CalendarDays className="w-4 h-4 text-gold-400 shrink-0" />
              <div className="flex flex-col items-end">
                <span className="font-body text-[0.65rem] text-gold-400/80 font-semibold tracking-[0.1em] uppercase">Convocation Day</span>
                <span className="font-display font-bold text-white text-sm leading-tight">26 September 2026</span>
              </div>
            </div>
            <span className="font-body text-xs text-white/35 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-gold-500/50 shrink-0" />
              Town Hall, Bhagalpur, Bihar
            </span>
          </div>
        </div>

        {/* 3+1 col link grid */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-12 py-10 border-b border-white/8">

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-body font-semibold text-[0.65rem] text-gold-400/70 tracking-[0.14em] uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}><LinkItem item={item} /></li>
              ))}
            </ul>
          </div>

          {/* Guidelines */}
          <div className="space-y-4">
            <h3 className="font-body font-semibold text-[0.65rem] text-gold-400/70 tracking-[0.14em] uppercase">
              Guidelines
            </h3>
            <ul className="space-y-2.5">
              {guideLinks.map((item) => (
                <li key={item.label}><LinkItem item={item} /></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-body font-semibold text-[0.65rem] text-gold-400/70 tracking-[0.14em] uppercase">
              Convocation Secretariat
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Address */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/8">
                <div className="w-8 h-8 rounded-xl bg-gold-500/12 border border-gold-500/18 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-body text-[0.6rem] text-white/35 uppercase tracking-widest font-semibold">Address</span>
                  <span className="font-body text-[0.8125rem] text-white/70 leading-snug">
                    IIIT Bhagalpur Campus,<br />Sabour, Bihar 813210
                  </span>
                </div>
              </div>

              {/* Email */}
              <a
                href="mailto:convocation@iiitbh.ac.in"
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-gold-500/25 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-xl bg-gold-500/12 border border-gold-500/18 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-body text-[0.6rem] text-white/35 uppercase tracking-widest font-semibold">Email</span>
                  <span className="font-body text-[0.8125rem] text-white/70 group-hover:text-gold-400 transition-colors duration-200 break-all leading-snug">
                    convocation@iiitbh.ac.in
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+916412451005"
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-gold-500/25 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-xl bg-gold-500/12 border border-gold-500/18 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-body text-[0.6rem] text-white/35 uppercase tracking-widest font-semibold">Phone</span>
                  <span className="font-body text-[0.8125rem] text-white/70 group-hover:text-gold-400 transition-colors duration-200">
                    +91 641 245 1005
                  </span>
                </div>
              </a>

              {/* Website */}
              <a
                href="https://www.iiitbh.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-gold-500/25 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-xl bg-gold-500/12 border border-gold-500/18 flex items-center justify-center shrink-0">
                  <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-body text-[0.6rem] text-white/35 uppercase tracking-widest font-semibold">Website</span>
                  <span className="font-body text-[0.8125rem] text-white/70 group-hover:text-gold-400 transition-colors duration-200">
                    www.iiitbh.ac.in
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            © {year} Indian Institute of Information Technology Bhagalpur. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500/40" />
            <p className="font-body text-xs text-white/30">
              Official Portal — 3rd Convocation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
