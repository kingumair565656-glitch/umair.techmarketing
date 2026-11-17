import React, { useState } from 'react';
import { ArrowUp, Mail, Check } from 'lucide-react';
import { BRAND_INFO, NAV_LINKS } from '../data/siteContent';
import { WhatsAppIcon } from './WhatsAppIcon';

import { PageId } from './Header';

interface FooterProps {
  onNavigatePage: (page: PageId) => void;
}

const HREF_TO_PAGE: Record<string, PageId> = {
  '#home': 'home',
  '#services': 'services',
  '#pricing': 'pricing',
  '#projects': 'projects',
  '#about': 'about',
  '#contact': 'contact',
};

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  const [subEmail, setSubEmail] = useState('');
  const [subError, setSubError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(subEmail.trim())) {
      setSubError('Please enter a valid email address.');
      return;
    }
    setSubError(null);
    setSubscribed(true);
    setSubEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#111111] text-white">
      {/* Main 4-Column Footer matching onlinekrlo.pk 1ee9fcfe */}
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand Summary */}
          <div>
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                onNavigatePage('home');
              }}
              className="font-display text-2xl font-bold text-white tracking-tight inline-block mb-4"
            >
              {BRAND_INFO.brandName}
            </a>
            <p className="text-sm leading-relaxed text-white/75 mb-5">
              Partner with {BRAND_INFO.ownerName} ({BRAND_INFO.brandName}) for Meta Ads Management, Website Design, and Social Media Marketing.
            </p>
            <div className="text-xs font-medium text-[#E8C547]">
              {BRAND_INFO.professionalTitle}
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="font-display text-base font-bold text-white mb-4">
              Useful Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => {
                const targetPage = HREF_TO_PAGE[link.href] || 'home';
                return (
                  <li key={link.href}>
                    <a
                      href={targetPage === 'home' ? '#/' : `#/${targetPage}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigatePage(targetPage);
                      }}
                      className="text-sm text-white/75 hover:text-[#E8C547] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="#/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePage('contact');
                  }}
                  className="text-sm text-white/75 hover:text-[#E8C547] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-display text-base font-bold text-white mb-4">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-white/75">
              <p className="font-semibold text-white">{BRAND_INFO.ownerName}</p>
              <a
                href={BRAND_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/85 hover:text-[#E8C547] transition-colors tabular-nums"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{BRAND_INFO.whatsappDisplay}</span>
              </a>
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-[#E8C547] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#E8C547] shrink-0" />
                <span>{BRAND_INFO.email}</span>
              </a>
              <p className="text-xs text-white/60 leading-relaxed">
                Available for Meta Ads campaigns, business websites, landing pages, and social media growth.
              </p>
            </div>
          </div>

          {/* Column 4: Stay Updated (Newsletter box matching onlinekrlo.pk) */}
          <div>
            <h3 className="font-display text-base font-bold text-white mb-4">
              Updates and Insights
            </h3>
            <p className="text-sm text-white/75 leading-relaxed mb-4">
              Join our mailing list to receive digital marketing insights and project availability updates.
            </p>
            {subscribed ? (
              <div className="rounded-lg bg-white/10 border border-[#E8C547]/50 px-4 py-3 text-xs font-medium text-[#FFF4CC] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E8C547] shrink-0" />
                <span>You have been subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2" noValidate>
                <div className="flex gap-2">
                  <label htmlFor="footer-newsletter" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter"
                    type="email"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full min-w-0 px-3.5 py-2.5 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#E8C547]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 text-sm font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#FFF4CC] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Join
                  </button>
                </div>
                {subError && (
                  <p role="alert" className="text-xs text-[#E8C547]">
                    {subError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip matching onlinekrlo.pk 618b81ff + Back to Top */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-white/70 text-center sm:text-left">
            Copyright &copy; {new Date().getFullYear()} {BRAND_INFO.brandName} · {BRAND_INFO.ownerName}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#FFF4CC] rounded-lg transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
