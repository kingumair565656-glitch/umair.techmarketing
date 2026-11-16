import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Pencil, X, RotateCcw } from 'lucide-react';
import {
  DEFAULT_PRICING_PLANS,
  PricingTier,
  ServicePricingMap,
} from '../data/siteContent';
import { ServiceCategory } from '../types/portfolio';

interface PricingSectionProps {
  selectedServiceFilter: 'All' | ServiceCategory;
  onChangeServiceFilter: (filter: 'All' | ServiceCategory) => void;
  pricingPlans: ServicePricingMap;
  onUpdatePricingPlans: (updated: ServicePricingMap) => void;
  onSelectPackage: (service: ServiceCategory, packageName: string) => void;
}

const ALL_SERVICES: ServiceCategory[] = [
  'Meta Ads Management',
  'Website Design',
  'Social Media Marketing',
];

const SERVICE_DESCRIPTIONS: Record<ServiceCategory, string> = {
  'Meta Ads Management':
    'Campaign Strategy, Facebook and Instagram Ads, Audience Targeting and Optimization.',
  'Website Design':
    'Business Websites, Landing Pages, Responsive Design and UI/UX.',
  'Social Media Marketing':
    'Content Strategy, Social Media Management, Content Planning and Brand Growth.',
};

export const PricingSection: React.FC<PricingSectionProps> = ({
  selectedServiceFilter,
  onChangeServiceFilter,
  pricingPlans,
  onUpdatePricingPlans,
  onSelectPackage,
}) => {
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  const [editingService, setEditingService] = useState<ServiceCategory | null>(
    null
  );
  const [draftPlans, setDraftPlans] = useState<ServicePricingMap>(pricingPlans);

  const visibleServices =
    selectedServiceFilter === 'All' ? ALL_SERVICES : [selectedServiceFilter];

  const openEditor = (service: ServiceCategory) => {
    setDraftPlans(JSON.parse(JSON.stringify(pricingPlans)) as ServicePricingMap);
    setEditingService(service);
  };

  const handleDraftPriceChange = (
    tierId: string,
    field: 'pricePkr' | 'priceUsd',
    value: string
  ) => {
    if (!editingService) return;
    setDraftPlans((prev) => ({
      ...prev,
      [editingService]: prev[editingService].map((tier) =>
        tier.id === tierId ? { ...tier, [field]: value } : tier
      ),
    }));
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePricingPlans(draftPlans);
    setEditingService(null);
  };

  const handleResetDefaults = () => {
    onUpdatePricingPlans(DEFAULT_PRICING_PLANS);
    setDraftPlans(DEFAULT_PRICING_PLANS);
    setEditingService(null);
  };

  return (
    <section
      id="pricing"
      className="py-16 sm:py-20 bg-white/75 border-b border-[#111111]/8"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]/70 mb-2">
              Service Packages
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight [text-wrap:balance] mb-3">
              Pricing For All My Services
            </h2>
            <div className="w-16 h-1 bg-[#E8C547] rounded-full mb-3" />
            <p className="text-sm sm:text-base text-[#4A4A4A] max-w-[62ch]">
              Transparent packages across Meta Ads Management, Website Design, and Social Media Marketing.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            <div
              role="group"
              aria-label="Select currency"
              className="inline-flex items-center p-1 rounded-lg bg-[#FFF4CC] border border-[#E8C547]/60"
            >
              <button
                type="button"
                onClick={() => setCurrency('PKR')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  currency === 'PKR'
                    ? 'bg-[#111111] text-white'
                    : 'text-[#111111] hover:bg-[#E8C547]/40'
                }`}
              >
                PKR (₨)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  currency === 'USD'
                    ? 'bg-[#111111] text-white'
                    : 'text-[#111111] hover:bg-[#E8C547]/40'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>

        {/* Service Filter Tabs (Defaults to All Services so ALL 3 services' pricing shows together) */}
        <div
          role="tablist"
          aria-label="Filter pricing by service"
          className="flex flex-wrap items-center gap-2.5 mb-12"
        >
          {(['All', ...ALL_SERVICES] as ('All' | ServiceCategory)[]).map(
            (filterOption) => {
              const isActive = selectedServiceFilter === filterOption;
              return (
                <button
                  key={filterOption}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onChangeServiceFilter(filterOption)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#E8C547] text-[#111111] shadow-xs'
                      : 'bg-[#FFF4CC]/45 text-[#333333] border border-[#111111]/10 hover:bg-[#FFF4CC]'
                  }`}
                >
                  {filterOption === 'All' ? 'All Services' : filterOption}
                </button>
              );
            }
          )}
        </div>

        {/* Stacked Pricing Sections for Every Visible Service (matching onlinekrlo.pk/pricing/) */}
        <div className="space-y-16">
          {visibleServices.map((service) => {
            const tiers: PricingTier[] =
              pricingPlans[service] || DEFAULT_PRICING_PLANS[service];

            return (
              <div key={service} className="scroll-mt-28">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 mb-7 border-b border-[#111111]/10">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mb-1.5">
                      {service}
                    </h3>
                    <p className="text-sm text-[#4A4A4A]">
                      {SERVICE_DESCRIPTIONS[service]}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openEditor(service)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#111111] bg-white border border-[#111111]/15 hover:border-[#E8C547] hover:bg-[#FFF4CC]/50 rounded-lg transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit Rates</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
                  {tiers.map((tier, idx) => {
                    const isFeatured = Boolean(tier.featured);
                    const displayPrice =
                      currency === 'PKR' ? tier.pricePkr : tier.priceUsd;
                    const currencySymbol = currency === 'PKR' ? '₨' : '$';

                    return (
                      <motion.div
                        key={tier.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{
                          duration: 0.38,
                          delay: idx * 0.07,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{ y: -4 }}
                        className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-colors duration-200 border ${
                          isFeatured
                            ? 'bg-[#111111] text-white border-[#111111] shadow-[0_18px_36px_-14px_rgba(17,17,17,0.32)]'
                            : 'bg-white text-[#111111] border-[#111111]/12 shadow-[0_6px_20px_-10px_rgba(17,17,17,0.08)] hover:border-[#E8C547]'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4
                              className={`font-display text-xl font-bold tracking-tight ${
                                isFeatured ? 'text-[#E8C547]' : 'text-[#111111]'
                              }`}
                            >
                              {tier.name}
                            </h4>
                            {isFeatured && (
                              <span className="text-xs font-semibold text-[#FFF4CC] whitespace-nowrap shrink-0">
                                Recommended
                              </span>
                            )}
                          </div>

                          <p
                            className={`text-xs sm:text-sm mb-6 ${
                              isFeatured ? 'text-white/75' : 'text-[#555555]'
                            }`}
                          >
                            {tier.subtitle}
                          </p>

                          <div
                            className={`pb-6 mb-6 border-b ${
                              isFeatured
                                ? 'border-white/15'
                                : 'border-[#111111]/10'
                            }`}
                          >
                            <div className="flex items-baseline gap-1.5">
                              <span
                                className={`font-display text-xl font-bold ${
                                  isFeatured
                                    ? 'text-[#E8C547]'
                                    : 'text-[#111111]'
                                }`}
                              >
                                {currencySymbol}
                              </span>
                              <span className="font-display text-4xl font-bold tracking-tight tabular-nums">
                                {displayPrice}
                              </span>
                              <span
                                className={`text-xs font-medium ml-1 ${
                                  isFeatured
                                    ? 'text-white/70'
                                    : 'text-[#666666]'
                                }`}
                              >
                                / {tier.billingCycle}
                              </span>
                            </div>
                          </div>

                          <ul className="space-y-3 mb-8">
                            {tier.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2.5 text-sm leading-snug"
                              >
                                <Check
                                  className={`w-4 h-4 mt-0.5 shrink-0 ${
                                    isFeatured
                                      ? 'text-[#E8C547]'
                                      : 'text-[#111111]'
                                  }`}
                                />
                                <span
                                  className={
                                    isFeatured
                                      ? 'text-white/90'
                                      : 'text-[#333333]'
                                  }
                                >
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          type="button"
                          onClick={() => onSelectPackage(service, tier.name)}
                          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${
                            isFeatured
                              ? 'bg-[#E8C547] text-[#111111] hover:bg-[#FFF4CC]'
                              : 'bg-[#FFF4CC] text-[#111111] hover:bg-[#E8C547]'
                          }`}
                        >
                          <span>Get Free Quote</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Bundle Callout Strip */}
        <div className="mt-14 rounded-xl bg-[#FFF4CC]/60 border border-[#E8C547]/60 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-base font-bold text-[#111111]">
              Need a combined Website Design, Meta Ads and Social Media package?
            </p>
            <p className="text-sm text-[#4A4A4A]">
              Request a tailored scope and custom quote aligned with your monthly targets.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onSelectPackage(
                selectedServiceFilter === 'All'
                  ? 'Meta Ads Management'
                  : selectedServiceFilter,
                'Custom Multi-Service Bundle'
              )
            }
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#111111] hover:bg-[#E8C547] hover:text-[#111111] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Request Custom Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Customize Service Rates Modal */}
      {editingService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-pricing-title"
          className="fixed inset-0 z-50 bg-[#111111]/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#111111]/12 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-[#111111] text-white flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[#E8C547]">
                  {editingService}
                </p>
                <h3 id="edit-pricing-title" className="font-display text-lg font-bold">
                  Customize Package Rates
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-md bg-white/10 hover:bg-[#E8C547] hover:text-[#111111] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDraft} className="p-6 space-y-4">
              {(draftPlans[editingService] || []).map((tier) => (
                <div
                  key={tier.id}
                  className="rounded-lg border border-[#111111]/12 p-4 bg-[#FFF4CC]/20"
                >
                  <p className="font-display text-sm font-bold text-[#111111] mb-3">
                    {tier.name}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor={`pkr-${tier.id}`}
                        className="block text-xs font-semibold text-[#4A4A4A] mb-1"
                      >
                        Price in PKR (₨)
                      </label>
                      <input
                        id={`pkr-${tier.id}`}
                        type="text"
                        value={tier.pricePkr}
                        onChange={(e) =>
                          handleDraftPriceChange(
                            tier.id,
                            'pricePkr',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 text-sm rounded-md border border-[#111111]/20 bg-white focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547] tabular-nums"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`usd-${tier.id}`}
                        className="block text-xs font-semibold text-[#4A4A4A] mb-1"
                      >
                        Price in USD ($)
                      </label>
                      <input
                        id={`usd-${tier.id}`}
                        type="text"
                        value={tier.priceUsd}
                        onChange={(e) =>
                          handleDraftPriceChange(
                            tier.id,
                            'priceUsd',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 text-sm rounded-md border border-[#111111]/20 bg-white focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547] tabular-nums"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#4A4A4A] hover:text-[#111111] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 text-sm font-semibold text-[#111111] bg-[#FFF4CC] rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Save Rates
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
