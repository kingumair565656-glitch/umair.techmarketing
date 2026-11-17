import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  PenTool,
  SlidersHorizontal,
  Rocket,
  ChevronDown,
} from 'lucide-react';
import { STRATEGIC_STEPS } from '../data/siteContent';

const STEP_ICONS = [
  <Compass key="01" className="w-5 h-5" />,
  <PenTool key="02" className="w-5 h-5" />,
  <SlidersHorizontal key="03" className="w-5 h-5" />,
  <Rocket key="04" className="w-5 h-5" />,
];

export const StrategicApproachSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      id="approach"
      className="py-16 sm:py-20 bg-white/75 border-b border-[#111111]/8"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]/70 mb-2">
                Simple Steps to Success
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight [text-wrap:balance] mb-4">
                Our Strategic Approach
              </h2>
              <div className="w-16 h-1 bg-[#E8C547] rounded-full mb-5" />

              <p className="text-base leading-relaxed text-[#3F3F3F] max-w-[60ch] mb-8">
                Let&apos;s simplify the process for you with clear, step-by-step guidance from start to finish. Every campaign, website, and content plan follows a structured workflow built for clarity and reliable execution.
              </p>
            </motion.div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {STRATEGIC_STEPS.map((step, idx) => {
                const isSelected = openIndex === idx;
                return (
                  <motion.button
                    key={step.stepNumber}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{
                      duration: 0.18,
                      delay: idx * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -2 }}
                    onClick={() => setOpenIndex(idx)}
                    className={`text-left rounded-xl p-6 border transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#111111] ${
                      isSelected
                        ? 'bg-[#FFF4CC] border-[#E8C547] shadow-[0_8px_20px_-10px_rgba(17,17,17,0.16)]'
                        : 'bg-white border-[#111111]/10 hover:border-[#E8C547] hover:bg-[#FFF4CC]/35'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3.5">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#111111] text-[#E8C547]'
                            : 'bg-[#FFF4CC] text-[#111111]'
                        }`}
                      >
                        {STEP_ICONS[idx]}
                      </div>
                      <span className="font-display text-xs font-bold text-[#111111]/60 tabular-nums">
                        Step {step.stepNumber}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-[#111111] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4A4A4A]">
                      {step.shortDescription}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Workflow Card + Interactive Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div className="rounded-xl bg-[#111111] text-white p-6 sm:p-7 border border-[#111111]">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E8C547]">
                  Work Process Breakdown
                </span>
                <span className="text-xs font-medium text-white/70 tabular-nums">
                  01 — 04 Phases
                </span>
              </div>
              <p className="font-display text-lg font-semibold text-white leading-snug">
                Transparent execution from initial planning to launch and ongoing optimization.
              </p>
            </div>

            <div className="rounded-xl border border-[#111111]/12 bg-white divide-y divide-[#111111]/10 overflow-hidden shadow-[0_6px_20px_-10px_rgba(17,17,17,0.08)]">
              {STRATEGIC_STEPS.map((step, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={step.stepNumber}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      className={`w-full px-5 py-4 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer ${
                        isOpen ? 'bg-[#FFF4CC]/75' : 'bg-white hover:bg-[#FFF4CC]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-display text-xs font-bold text-[#111111] bg-[#E8C547] px-2 py-0.5 rounded tabular-nums shrink-0">
                          {step.stepNumber}
                        </span>
                        <span className="font-display text-sm sm:text-base font-semibold text-[#111111] truncate">
                          {step.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#111111] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="px-5 py-4 bg-white border-t border-[#111111]/8"
                        >
                          <p className="text-sm leading-relaxed text-[#3F3F3F]">
                            {step.detailedDescription}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
