import React from 'react';
import { motion } from 'motion/react';
import { ABOUT_PILLARS, BRAND_INFO } from '../data/siteContent';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative bg-[#111111] text-white py-16 sm:py-20 overflow-hidden"
    >
      {/* Animated Classic Gold Geometric Dot Matrix */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 28], y: [0, 28] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -inset-8 opacity-[0.09]"
        style={{
          backgroundImage: 'radial-gradient(#E8C547 1.15px, transparent 1.15px)',
          backgroundSize: '28px 28px',
        }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.16, 0.28, 0.16], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[260px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(232,197,71,0.22) 0%, rgba(17,17,17,0) 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1140px] px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[#E8C547] mb-2">
            About {BRAND_INFO.brandName}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance] mb-4">
            Helping Your Business Stand Out and Grow Online
          </h2>
          <div className="w-16 h-1 bg-[#E8C547] rounded-full mx-auto mb-6" />

          <p className="text-base sm:text-lg leading-relaxed text-white/85 max-w-[68ch] mx-auto mb-12">
            Led by <span className="text-[#FFF4CC] font-semibold">{BRAND_INFO.ownerName}</span> ({BRAND_INFO.professionalTitle}), {BRAND_INFO.brandName} brings together paid social strategy, modern website design, and consistent brand storytelling so your business looks credible and reaches the right audience.
          </p>
        </motion.div>

        {/* 3-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {ABOUT_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="rounded-xl bg-white/[0.04] border border-white/12 p-7 hover:border-[#E8C547]/70 transition-colors"
            >
              <div className="font-display text-2xl font-bold text-[#E8C547] mb-3 tabular-nums">
                {pillar.index}.
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2.5">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/75">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
