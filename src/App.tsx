/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { MotionConfig, AnimatePresence, motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { ClassicCursor } from './components/ClassicCursor';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Header, PageId } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { AboutSection } from './components/AboutSection';
import { StrategicApproachSection } from './components/StrategicApproachSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import {
  DEFAULT_PRICING_PLANS,
  ServicePricingMap,
} from './data/siteContent';
import {
  ServiceCategory,
  TestimonialItem,
} from './types/portfolio';

const STORAGE_KEYS = {
  profilePhoto: 'umairtech_profile_photo_v1',
  testimonials: 'umairtech_testimonials_v1',
  pricing: 'umairtech_pricing_v1',
};

const VALID_PAGES: PageId[] = [
  'home',
  'services',
  'pricing',
  'projects',
  'about',
  'contact',
];

const PAGE_TITLES: Record<Exclude<PageId, 'home'>, { title: string; subtitle: string }> = {
  services: {
    title: 'Services and Packages',
    subtitle: 'Meta Ads Management, Website Design, and Social Media Marketing built for measurable business growth.',
  },
  pricing: {
    title: 'Service Pricing',
    subtitle: 'Clear, transparent packages across all three of my core digital marketing and web design services.',
  },
  projects: {
    title: 'My Portfolio',
    subtitle: 'Browse actual completed client work across Meta Ads Management, Website Design, and Social Media Marketing.',
  },
  about: {
    title: 'About UmairTech',
    subtitle: 'Led by Muhammad Umair — combining paid social strategy, clean web design, and consistent brand growth.',
  },
  contact: {
    title: 'Contact Me',
    subtitle: 'Share your project goals to get started with Meta Ads, Website Design, or Social Media Marketing.',
  },
};

function parseHashToPage(): PageId {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (VALID_PAGES.includes(hash as PageId)) {
    return hash as PageId;
  }
  return 'home';
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => parseHashToPage());

  const [profilePhoto, setProfilePhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.profilePhoto);
    } catch {
      return null;
    }
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() =>
    loadFromStorage<TestimonialItem[]>(STORAGE_KEYS.testimonials, [])
  );

  const [pricingPlans, setPricingPlans] = useState<ServicePricingMap>(() =>
    loadFromStorage<ServicePricingMap>(
      STORAGE_KEYS.pricing,
      DEFAULT_PRICING_PLANS
    )
  );

  const [pricingFilter, setPricingFilter] = useState<'All' | ServiceCategory>(
    'All'
  );
  const [preselectedService, setPreselectedService] =
    useState<ServiceCategory>('Meta Ads Management');
  const [preselectedPackage, setPreselectedPackage] = useState<string | null>(
    null
  );

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(parseHashToPage());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    try {
      if (profilePhoto) {
        localStorage.setItem(STORAGE_KEYS.profilePhoto, profilePhoto);
      } else {
        localStorage.removeItem(STORAGE_KEYS.profilePhoto);
      }
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [profilePhoto]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.testimonials,
        JSON.stringify(testimonials)
      );
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.pricing, JSON.stringify(pricingPlans));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [pricingPlans]);

  const handleNavigatePage = useCallback((page: PageId) => {
    if (page === 'services' || page === 'pricing') {
      setPricingFilter('All');
    }
    setCurrentPage(page);
    const targetHash = page === 'home' ? '#/' : `#/${page}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectServiceForContact = useCallback(
    (service: ServiceCategory) => {
      setPreselectedService(service);
      setPreselectedPackage(null);
      handleNavigatePage('contact');
    },
    [handleNavigatePage]
  );

  const handleViewPricing = useCallback(
    (service: ServiceCategory) => {
      setPricingFilter(service);
      handleNavigatePage('pricing');
    },
    [handleNavigatePage]
  );

  const handleSelectPackage = useCallback(
    (service: ServiceCategory, packageName: string) => {
      setPreselectedService(service);
      setPreselectedPackage(packageName);
      handleNavigatePage('contact');
    },
    [handleNavigatePage]
  );

  const handleAddTestimonial = (item: Omit<TestimonialItem, 'id'>) => {
    const newTestimonial: TestimonialItem = {
      ...item,
      id: `test_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    };
    setTestimonials((prev) => [...prev, newTestimonial]);
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
  };

  const pageMeta = currentPage !== 'home' ? PAGE_TITLES[currentPage] : null;

  return (
    <MotionConfig reducedMotion="user">
      <ClassicCursor />
      <div className="relative min-h-screen flex flex-col text-[#111111]">
        <BackgroundCanvas />
        <Header currentPage={currentPage} onNavigatePage={handleNavigatePage} />

        <main className="relative z-10 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
        {/* Inner Page Header Banner (matches onlinekrlo.pk inner pages when not on Home) */}
        {pageMeta && (
          <section className="bg-[#111111] text-white py-12 sm:py-16 border-b border-white/10">
            <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs sm:text-sm text-white/70 mb-4"
              >
                <a
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigatePage('home');
                  }}
                  className="hover:text-[#E8C547] transition-colors"
                >
                  Home
                </a>
                <ChevronRight className="w-3.5 h-3.5 text-[#E8C547]" />
                <span className="text-[#E8C547] font-semibold">
                  {pageMeta.title}
                </span>
              </nav>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                {pageMeta.title}
              </h1>
              <p className="text-sm sm:text-base text-white/80 max-w-[62ch] leading-relaxed">
                {pageMeta.subtitle}
              </p>
            </div>
          </section>
        )}

        {/* HOME PAGE ONLY (Default initial view matching onlinekrlo.pk homepage) */}
        {currentPage === 'home' && (
          <>
            <HeroSection
              profilePhoto={profilePhoto}
              onUpdateProfilePhoto={setProfilePhoto}
              onNavigatePage={handleNavigatePage}
            />

            <ServicesSection
              onSelectServiceForContact={handleSelectServiceForContact}
              onViewPricing={handleViewPricing}
            />

            <AboutSection />

            <StrategicApproachSection />

            <ProjectsSection />

            <TestimonialsSection
              testimonials={testimonials}
              onAddTestimonial={handleAddTestimonial}
              onDeleteTestimonial={handleDeleteTestimonial}
            />
          </>
        )}

        {/* SERVICES PAGE (Shows all 3 services + pricing for all services) */}
        {currentPage === 'services' && (
          <>
            <ServicesSection
              onSelectServiceForContact={handleSelectServiceForContact}
              onViewPricing={(service) => setPricingFilter(service)}
            />
            <PricingSection
              selectedServiceFilter={pricingFilter}
              onChangeServiceFilter={setPricingFilter}
              pricingPlans={pricingPlans}
              onUpdatePricingPlans={setPricingPlans}
              onSelectPackage={handleSelectPackage}
            />
          </>
        )}

        {/* PRICING PAGE (Shows pricing for all 3 services) */}
        {currentPage === 'pricing' && (
          <PricingSection
            selectedServiceFilter={pricingFilter}
            onChangeServiceFilter={setPricingFilter}
            pricingPlans={pricingPlans}
            onUpdatePricingPlans={setPricingPlans}
            onSelectPackage={handleSelectPackage}
          />
        )}

        {/* PROJECTS PAGE */}
        {currentPage === 'projects' && <ProjectsSection />}

        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
          <>
            <AboutSection />
            <StrategicApproachSection />
            <TestimonialsSection
              testimonials={testimonials}
              onAddTestimonial={handleAddTestimonial}
              onDeleteTestimonial={handleDeleteTestimonial}
            />
          </>
        )}

        {/* CONTACT PAGE */}
        {currentPage === 'contact' && (
          <ContactSection
            preselectedService={preselectedService}
            preselectedPackage={preselectedPackage}
            onClearPackage={() => setPreselectedPackage(null)}
          />
        )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigatePage={handleNavigatePage} />
        <WhatsAppFloat />
      </div>
    </MotionConfig>
  );
}
