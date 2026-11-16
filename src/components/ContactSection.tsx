import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, Send, X } from 'lucide-react';
import { BRAND_INFO } from '../data/siteContent';
import { ServiceCategory } from '../types/portfolio';

interface ContactSectionProps {
  preselectedService: ServiceCategory;
  preselectedPackage: string | null;
  onClearPackage: () => void;
}

const SERVICE_OPTIONS: ServiceCategory[] = [
  'Meta Ads Management',
  'Website Design',
  'Social Media Marketing',
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedService,
  preselectedPackage,
  onClearPackage,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState<ServiceCategory>(preselectedService);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    setService(preselectedService);
  }, [preselectedService]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(BRAND_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!emailPattern.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!message.trim()) {
      setError('Please share a brief overview of your project.');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  const packageLine = preselectedPackage ? ` (${preselectedPackage})` : '';
  const mailtoHref = `mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(
    `${service}${packageLine} Inquiry — ${name || 'New Project'}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nService: ${service}${
      preselectedPackage ? `\nSelected Package: ${preselectedPackage}` : ''
    }\n\n${message}`
  )}`;

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 bg-[#FFF4CC]/35"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]/70 mb-2">
              Get In Touch
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight [text-wrap:balance] mb-4">
              Let&apos;s Work On Your Next Project
            </h2>
            <div className="w-16 h-1 bg-[#E8C547] rounded-full mb-5" />

            <p className="text-base leading-relaxed text-[#3F3F3F] mb-8">
              Looking for support with Meta Ads Management, Website Design, or Social Media Marketing? Send your project details and {BRAND_INFO.ownerName} will get back to you promptly.
            </p>

            <div className="rounded-xl bg-white border border-[#111111]/10 p-6 space-y-5 shadow-[0_6px_20px_-10px_rgba(17,17,17,0.08)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1">
                  Brand and Specialist
                </p>
                <p className="font-display text-base font-bold text-[#111111]">
                  {BRAND_INFO.ownerName} · {BRAND_INFO.brandName}
                </p>
                <p className="text-sm text-[#4A4A4A]">
                  {BRAND_INFO.professionalTitle}
                </p>
              </div>

              <div className="pt-4 border-t border-[#111111]/10">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2">
                  Direct Email
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] hover:underline"
                  >
                    <Mail className="w-4 h-4 text-[#E8C547]" />
                    <span>{BRAND_INFO.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-[#FFF4CC] hover:bg-[#E8C547] text-[#111111] rounded-md transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-[#111111]/10 p-7 sm:p-9 shadow-[0_10px_30px_-12px_rgba(17,17,17,0.12)]">
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#FFF4CC] text-[#111111] flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#111111] mb-2">
                    Inquiry Ready to Send
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A4A4A] max-w-[44ch] mx-auto mb-6">
                    Thank you, {name}. Your {service} inquiry has been prepared for {BRAND_INFO.ownerName}. You can also launch your email client directly below.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Email Client</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="px-5 py-3 text-sm font-semibold text-[#111111] bg-[#FFF4CC] hover:bg-[#FFF4CC]/70 rounded-lg transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {preselectedPackage && (
                    <div className="rounded-lg bg-[#FFF4CC] border border-[#E8C547] px-4 py-2.5 flex items-center justify-between gap-3">
                      <p className="text-xs sm:text-sm font-semibold text-[#111111]">
                        Selected Plan: {service} — {preselectedPackage}
                      </p>
                      <button
                        type="button"
                        onClick={onClearPackage}
                        aria-label="Clear selected package"
                        className="p-1 text-[#111111]/70 hover:text-[#111111] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-semibold text-[#111111] mb-1.5"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="w-full px-4 py-3 text-sm rounded-lg border border-[#111111]/20 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-semibold text-[#111111] mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 text-sm rounded-lg border border-[#111111]/20 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-sm font-semibold text-[#111111] mb-1.5"
                    >
                      Service Needed
                    </label>
                    <select
                      id="contact-service"
                      value={service}
                      onChange={(e) =>
                        setService(e.target.value as ServiceCategory)
                      }
                      className="w-full px-4 py-3 text-sm rounded-lg border border-[#111111]/20 bg-white focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-[#111111] mb-1.5"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your business, goals, and timeline..."
                      className="w-full px-4 py-3 text-sm rounded-lg border border-[#111111]/20 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-semibold text-red-700">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>

                    <span className="text-xs text-[#666666]">
                      Direct response via {BRAND_INFO.email}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
