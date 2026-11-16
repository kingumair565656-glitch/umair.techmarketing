import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND_INFO, NAV_LINKS } from '../data/siteContent';

export type PageId = 'home' | 'services' | 'pricing' | 'projects' | 'about' | 'contact';

interface HeaderProps {
  currentPage: PageId;
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

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigatePage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: PageId
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigatePage(page);
  };

  return (
    <header className="sticky top-0 z-40 px-3 sm:px-6">
      <div className="mx-auto max-w-[1300px] bg-white border-t-[7px] border-[#E8C547] rounded-b-[15px] shadow-[0_5px_15px_-5px_rgba(17,17,17,0.14)] border-x border-b border-[#111111]/8">
        <div className="flex items-center justify-between gap-8 px-5 sm:px-8 py-3.5">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#/"
            onClick={(e) => handleNavClick(e, 'home')}
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#111111] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E8C547] rounded"
          >
            {BRAND_INFO.brandName}
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7"
          >
            {NAV_LINKS.map((link) => {
              const targetPage = HREF_TO_PAGE[link.href] || 'home';
              const isActive = currentPage === targetPage;
              return (
                <a
                  key={link.href}
                  href={targetPage === 'home' ? '#/' : `#/${targetPage}`}
                  onClick={(e) => handleNavClick(e, targetPage)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E8C547] rounded ${
                    isActive
                      ? 'text-[#111111] font-semibold'
                      : 'text-[#4A4A4A] hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#E8C547] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#/contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] ${
                currentPage === 'contact'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white'
              }`}
            >
              Contact Me
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#111111]/15 text-[#111111] hover:bg-[#FFF4CC] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#111111]/10 px-5 py-4 bg-white rounded-b-[15px]">
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => {
                const targetPage = HREF_TO_PAGE[link.href] || 'home';
                const isActive = currentPage === targetPage;
                return (
                  <a
                    key={link.href}
                    href={targetPage === 'home' ? '#/' : `#/${targetPage}`}
                    onClick={(e) => handleNavClick(e, targetPage)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#FFF4CC] text-[#111111] font-semibold'
                        : 'text-[#333333] hover:bg-[#FFF4CC]/50'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="#/contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="mt-2 inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-[#111111] bg-[#E8C547] rounded-lg"
              >
                Contact Me
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
