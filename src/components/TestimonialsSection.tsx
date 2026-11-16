import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  X,
  MessageSquareQuote,
} from 'lucide-react';
import { ServiceCategory, TestimonialItem } from '../types/portfolio';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  onAddTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  onDeleteTestimonial: (id: string) => void;
}

const SERVICES: ServiceCategory[] = [
  'Meta Ads Management',
  'Website Design',
  'Social Media Marketing',
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddTestimonial,
  onDeleteTestimonial,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('');
  const [service, setService] = useState<ServiceCategory>('Meta Ads Management');
  const [quote, setQuote] = useState('');
  const [error, setError] = useState<string | null>(null);

  const safeIndex =
    testimonials.length > 0 ? currentIndex % testimonials.length : 0;
  const currentTestimonial = testimonials[safeIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !quote.trim()) {
      setError('Please enter the client name and their feedback quote.');
      return;
    }
    onAddTestimonial({
      clientName: clientName.trim(),
      clientRole: clientRole.trim() || 'Client',
      service,
      quote: quote.trim(),
    });
    setClientName('');
    setClientRole('');
    setQuote('');
    setError(null);
    setIsModalOpen(false);
    setCurrentIndex(testimonials.length);
  };

  return (
    <section
      id="feedback"
      className="py-16 sm:py-20 bg-white/75 border-b border-[#111111]/8"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (50% -> 6 cols): Editorial Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl bg-[#FFF4CC] p-8 sm:p-10 border border-[#E8C547]/60">
              <div className="rounded-xl bg-white p-7 sm:p-8 border border-[#111111]/10 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-[#111111] text-[#E8C547] flex items-center justify-center mb-5">
                  <MessageSquareQuote className="w-6 h-6" />
                </div>
                <p className="font-display text-xl sm:text-2xl font-bold text-[#111111] leading-snug mb-3">
                  Client Trust Built Through Clear Strategy and Delivery
                </p>
                <p className="text-sm leading-relaxed text-[#4A4A4A] mb-6">
                  Every Meta Ads campaign, website design, and social media plan is delivered with direct communication, transparent reporting, and attention to brand detail.
                </p>
                <div className="pt-4 border-t border-[#111111]/10 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#111111]">
                  <span>Meta Ads Management</span>
                  <span aria-hidden="true" className="text-[#E8C547]">
                    ·
                  </span>
                  <span>Website Design</span>
                  <span aria-hidden="true" className="text-[#E8C547]">
                    ·
                  </span>
                  <span>Social Media Marketing</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (50% -> 6 cols): "Customers Feedback / What Our Customers Say!" */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]/70 mb-2">
              Customers Feedback
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight [text-wrap:balance] mb-4">
              What Our Customers Say!
            </h2>
            <div className="w-16 h-1 bg-[#E8C547] rounded-full mb-7" />

            {testimonials.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#111111]/20 bg-[#FFF4CC]/25 p-7">
                <Quote className="w-7 h-7 text-[#E8C547] mb-3" />
                <p className="text-sm sm:text-base leading-relaxed text-[#3F3F3F] mb-5">
                  Verified client reviews will appear in this showcase as you add real customer feedback from completed projects.
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Verified Feedback</span>
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-[#111111]/12 bg-white p-7 shadow-[0_8px_24px_-12px_rgba(17,17,17,0.12)]">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <Quote className="w-8 h-8 text-[#E8C547] shrink-0" />
                  <button
                    type="button"
                    onClick={() => onDeleteTestimonial(currentTestimonial.id)}
                    aria-label="Delete feedback"
                    className="text-[#666666] hover:text-red-600 transition-colors cursor-pointer p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={currentTestimonial.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-base sm:text-lg leading-relaxed text-[#111111] mb-6"
                  >
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#111111]/10">
                  <div>
                    <p className="font-display text-base font-bold text-[#111111]">
                      {currentTestimonial.clientName}
                    </p>
                    <p className="text-xs text-[#555555]">
                      {currentTestimonial.clientRole} · {currentTestimonial.service}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#111111] bg-[#FFF4CC] hover:bg-[#E8C547] rounded-md transition-colors cursor-pointer"
                    >
                      + Add
                    </button>
                    {testimonials.length > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label="Previous feedback"
                          onClick={() =>
                            setCurrentIndex(
                              (prev) =>
                                (prev - 1 + testimonials.length) %
                                testimonials.length
                            )
                          }
                          className="w-9 h-9 rounded-lg border border-[#111111]/15 hover:bg-[#FFF4CC] flex items-center justify-center cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Next feedback"
                          onClick={() =>
                            setCurrentIndex(
                              (prev) => (prev + 1) % testimonials.length
                            )
                          }
                          className="w-9 h-9 rounded-lg border border-[#111111]/15 hover:bg-[#FFF4CC] flex items-center justify-center cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Add Verified Client Feedback Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-modal-title"
          className="fixed inset-0 z-50 bg-[#111111]/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#111111]/12 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-[#111111] text-white flex items-center justify-between">
              <h3 id="feedback-modal-title" className="font-display text-lg font-bold">
                Add Verified Client Feedback
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-md bg-white/10 hover:bg-[#E8C547] hover:text-[#111111] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="client-name"
                  className="block text-sm font-semibold text-[#111111] mb-1.5"
                >
                  Client Name
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter client's full name"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#111111]/20 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                />
              </div>

              <div>
                <label
                  htmlFor="client-role"
                  className="block text-sm font-semibold text-[#111111] mb-1.5"
                >
                  Business / Role
                </label>
                <input
                  id="client-role"
                  type="text"
                  value={clientRole}
                  onChange={(e) => setClientRole(e.target.value)}
                  placeholder="e.g. Founder, Business Name"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#111111]/20 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                />
              </div>

              <div>
                <label
                  htmlFor="client-service"
                  className="block text-sm font-semibold text-[#111111] mb-1.5"
                >
                  Service Provided
                </label>
                <select
                  id="client-service"
                  value={service}
                  onChange={(e) => setService(e.target.value as ServiceCategory)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#111111]/20 bg-white focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="client-quote"
                  className="block text-sm font-semibold text-[#111111] mb-1.5"
                >
                  Client Feedback
                </label>
                <textarea
                  id="client-quote"
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Paste the exact feedback received from your client"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#111111]/20 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                />
              </div>

              {error && (
                <p role="alert" className="text-xs font-semibold text-red-700">
                  {error}
                </p>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-[#111111] bg-[#FFF4CC] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  Save Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
