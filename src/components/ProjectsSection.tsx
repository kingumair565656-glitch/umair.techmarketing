import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye } from 'lucide-react';
import { ServiceCategory } from '../types/portfolio';

const CATEGORIES: ('All' | ServiceCategory)[] = [
  'All',
  'Meta Ads Management',
  'Website Design',
  'Social Media Marketing',
];

const DEFAULT_CATEGORIES: ServiceCategory[] = [
  'Meta Ads Management',
  'Website Design',
  'Social Media Marketing',
];

const SHOWCASE_VISUALS: Record<
  ServiceCategory,
  { imageUrl: string; title: string; description: string }
> = {
  'Meta Ads Management': {
    imageUrl: '/src/assets/images/project_meta_ads_preview_1794843018189.jpg',
    title: 'Meta Ads Campaign Showcase',
    description:
      'Campaign strategy, Facebook and Instagram ad placements, and audience targeting visuals crafted for conversion-focused reach.',
  },
  'Website Design': {
    imageUrl:
      '/src/assets/images/project_website_design_preview_1794843020620.jpg',
    title: 'Responsive Website Design Showcase',
    description:
      'Business website layout, landing page hierarchy, and modern UI/UX presentation built for clarity across desktop and mobile.',
  },
  'Social Media Marketing': {
    imageUrl:
      '/src/assets/images/project_social_media_preview_1794843019426.jpg',
    title: 'Social Media Content Showcase',
    description:
      'Cohesive content planning, visual grid direction, and brand growth strategies tailored for consistent audience engagement.',
  },
};

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ServiceCategory>(
    'All'
  );
  const [previewItem, setPreviewItem] = useState<{
    name: string;
    category: ServiceCategory;
    description: string;
    imageUrl: string;
  } | null>(null);

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 bg-[#FFF4CC]/25 border-b border-[#111111]/8"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="font-display text-lg sm:text-xl font-bold text-[#111111]/85 tracking-tight mb-1.5">
            My Portfolio
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight [text-wrap:balance] mb-3">
            Some of My Completed Projects
          </h2>
          <div className="w-16 h-1 bg-[#E8C547] rounded-full mb-3" />
          <p className="text-sm sm:text-base text-[#4A4A4A] max-w-[58ch]">
            Visual project previews across Meta Ads Management, Website Design, and Social Media Marketing.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by service category"
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#111111] text-white'
                    : 'bg-white text-[#333333] border border-[#111111]/12 hover:bg-[#FFF4CC]'
                }`}
              >
                {cat === 'All' ? 'All Projects' : cat}
              </button>
            );
          })}
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEFAULT_CATEGORIES.filter(
            (cat) => selectedCategory === 'All' || selectedCategory === cat
          ).map((cat, idx) => {
            const showcase = SHOWCASE_VISUALS[cat];
            return (
              <motion.article
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.2,
                  delay: idx * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3 }}
                className="group rounded-xl bg-white border border-[#111111]/10 overflow-hidden shadow-[0_6px_20px_-10px_rgba(17,17,17,0.1)] hover:border-[#E8C547] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF4CC]/30 border-b border-[#111111]/8">
                    <img
                      src={showcase.imageUrl}
                      alt={`${showcase.title} — ${cat}`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-6 pb-4">
                    <p className="text-xs font-semibold text-[#111111]/65 mb-1.5">
                      {cat}
                    </p>
                    <h3 className="font-display text-lg font-bold text-[#111111] mb-2">
                      {showcase.title}
                    </h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">
                      {showcase.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 mt-2 border-t border-[#111111]/8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewItem({
                        name: showcase.title,
                        category: cat,
                        description: showcase.description,
                        imageUrl: showcase.imageUrl,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:text-[#111111]/70 transition-colors cursor-pointer"
                  >
                    <span>View Project</span>
                    <Eye className="w-4 h-4 text-[#E8C547]" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Project Lightbox Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-project-title"
            className="fixed inset-0 z-50 bg-[#111111]/80 flex items-center justify-center p-4"
            onClick={() => setPreviewItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 6 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl rounded-2xl bg-white overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 bg-[#111111] text-white flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#E8C547]">
                    {previewItem.category}
                  </p>
                  <h3
                    id="preview-project-title"
                    className="font-display text-lg font-bold"
                  >
                    {previewItem.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  aria-label="Close preview"
                  className="w-9 h-9 rounded-md bg-white/10 hover:bg-[#E8C547] hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#FFF4CC]/25 max-h-[60vh] overflow-hidden flex items-center justify-center border-b border-[#111111]/10">
                <img
                  src={previewItem.imageUrl}
                  alt={previewItem.name}
                  className="max-h-[60vh] w-full object-contain"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-[#3F3F3F] leading-relaxed">
                  {previewItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
