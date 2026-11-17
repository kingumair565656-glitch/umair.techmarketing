import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone, Monitor, Share2, ArrowRight, Check } from 'lucide-react';
import { SERVICES_LIST } from '../data/siteContent';
import { ServiceCategory } from '../types/portfolio';

interface ServicesSectionProps {
  onSelectServiceForContact: (service: ServiceCategory) => void;
  onViewPricing: (service: ServiceCategory) => void;
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'meta-ads': <Megaphone className="w-6 h-6" />,
  'website-design': <Monitor className="w-6 h-6" />,
  'social-media': <Share2 className="w-6 h-6" />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForContact,
  onViewPricing,
}) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="py-16 sm:py-20 bg-[#FFF4CC]/35 border-b border-[#111111]/8"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (7 of 12 cols): Staggered Service Flip/Interactive Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES_LIST.map((service, index) => {
              const isFlipped = activeCardId === service.id;
              const isThirdSpan = index === 2;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.03,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -3 }}
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') setActiveCardId(service.id);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === 'mouse') setActiveCardId(null);
                  }}
                  className={`group relative rounded-xl border border-[#111111]/10 transition-colors duration-200 overflow-hidden ${
                    isThirdSpan ? 'sm:col-span-2' : ''
                  } ${
                    isFlipped
                      ? 'bg-[#111111] text-white shadow-[0_14px_30px_-10px_rgba(17,17,17,0.28)]'
                      : 'bg-white text-[#111111] shadow-[0_6px_20px_-8px_rgba(17,17,17,0.1)]'
                  }`}
                >
                  <div className="p-7 sm:p-8 flex flex-col justify-between h-full min-h-[250px]">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                            isFlipped
                              ? 'bg-[#E8C547] text-[#111111]'
                              : 'bg-[#FFF4CC] text-[#111111]'
                          }`}
                        >
                          {SERVICE_ICONS[service.id]}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveCardId(isFlipped ? null : service.id)
                          }
                          className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                            isFlipped
                              ? 'bg-white/10 text-[#E8C547] hover:bg-white/20'
                              : 'bg-[#FFF4CC]/70 text-[#111111] hover:bg-[#E8C547]'
                          }`}
                        >
                          {isFlipped ? 'Overview' : 'Deliverables'}
                        </button>
                      </div>

                      <h3
                        className={`font-display text-lg font-bold tracking-tight mb-2.5 ${
                          isFlipped ? 'text-[#E8C547]' : 'text-[#111111]'
                        }`}
                      >
                        {service.shortTitle}
                      </h3>

                      <AnimatePresence mode="wait" initial={false}>
                        {!isFlipped ? (
                          <motion.p
                            key="summary"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.16 }}
                            className="text-sm leading-relaxed text-[#4A4A4A]"
                          >
                            {service.summary}
                          </motion.p>
                        ) : (
                          <motion.ul
                            key="items"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.16 }}
                            className="space-y-2 mt-3"
                          >
                            {service.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-center gap-2.5 text-sm text-white/95"
                              >
                                <Check className="w-4 h-4 text-[#E8C547] shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="pt-5 mt-5 border-t border-current/10 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onViewPricing(service.category)}
                        className={`text-xs font-semibold underline-offset-4 hover:underline cursor-pointer ${
                          isFlipped
                            ? 'text-[#FFF4CC]'
                            : 'text-[#4A4A4A] hover:text-[#111111]'
                        }`}
                      >
                        View Pricing
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectServiceForContact(service.category)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                          isFlipped
                            ? 'text-[#E8C547] hover:text-white'
                            : 'text-[#111111] hover:text-[#111111]/70'
                        }`}
                      >
                        <span>Request Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column (5 of 12 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pl-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]/70 mb-2">
              What UmairTech Delivers
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight leading-tight [text-wrap:balance] mb-4">
              Services Provided For You
            </h2>
            <div className="w-16 h-1 bg-[#E8C547] rounded-full mb-6" />

            <p className="text-base leading-relaxed text-[#3F3F3F] mb-5">
              UmairTech partners with growing businesses to build a strong online presence that attracts attention and converts visitors into customers.
            </p>
            <p className="text-base leading-relaxed text-[#3F3F3F] mb-8">
              From targeted Meta Ads campaigns and responsive website design to consistent social media management, every service is structured around clarity, visual quality, and real business goals.
            </p>

            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                onSelectServiceForContact('Meta Ads Management');
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white rounded-lg transition-colors duration-200"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
