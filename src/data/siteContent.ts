import { ServiceCategory } from '../types/portfolio';

export interface ServiceDetail {
  id: string;
  category: ServiceCategory;
  shortTitle: string;
  summary: string;
  items: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
}

export const BRAND_INFO = {
  brandName: 'UmairTech',
  ownerName: 'Muhammad Umair',
  portfolioHeading: 'Muhammad Umair Portfolio',
  professionalTitle: 'Digital Marketer and Creative Specialist',
  email: 'kingumair565656@gmail.com',
  whatsappDisplay: '03703666840',
  whatsappHref: 'https://wa.me/923703666840',
  heroHeadline:
    'Helping Businesses Grow Through Digital Marketing and Creative Solutions.',
  heroDescription:
    "I'm Muhammad Umair, a Digital Marketer specializing in Meta Ads, Website Design and Social Media Marketing.",
  heroPrimaryCta: 'View My Portfolio',
  heroSecondaryCta: 'Contact Me',
};

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 'meta-ads',
    category: 'Meta Ads Management',
    shortTitle: 'Meta Ads Management',
    summary:
      'Targeted paid social campaigns built to reach the right buyers and turn ad spend into measurable inquiries.',
    items: [
      'Campaign Strategy',
      'Facebook and Instagram Ads',
      'Audience Targeting',
      'Campaign Optimization',
    ],
  },
  {
    id: 'website-design',
    category: 'Website Design',
    shortTitle: 'Website Design',
    summary:
      'Clean, conversion-focused websites designed for modern businesses across desktop, tablet, and mobile screens.',
    items: [
      'Business Websites',
      'Landing Pages',
      'Responsive Design',
      'UI/UX Design',
    ],
  },
  {
    id: 'social-media',
    category: 'Social Media Marketing',
    shortTitle: 'Social Media Marketing',
    summary:
      'Consistent brand presence and structured content planning designed to build trust and audience growth.',
    items: [
      'Content Strategy',
      'Social Media Management',
      'Content Planning',
      'Brand Growth',
    ],
  },
];

export const ABOUT_PILLARS = [
  {
    index: '01',
    title: 'Meta Ads Management',
    description:
      'Structured campaign architecture across Facebook and Instagram focused on precise audience targeting and continuous optimization.',
  },
  {
    index: '02',
    title: 'Website Design',
    description:
      'Responsive business websites and landing pages built with clear visual hierarchy, fast navigation, and thoughtful UI/UX.',
  },
  {
    index: '03',
    title: 'Social Media Marketing',
    description:
      'Cohesive content strategy, editorial planning, and active social media management tailored to your brand voice.',
  },
];

export const STRATEGIC_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Discovery and Strategy',
    shortDescription:
      'We define your business goals, target audience, and brand direction before designing a campaign or website.',
    detailedDescription:
      'Every project begins with understanding your offer, ideal customers, and market positioning. Whether launching Meta Ads, designing a business website, or building a social calendar, we map out clear priorities, messaging, and deliverables before execution begins.',
  },
  {
    stepNumber: '02',
    title: 'Creative and Execution',
    shortDescription:
      'Crafting responsive layouts, compelling ad creatives, and structured social content aligned with your identity.',
    detailedDescription:
      'We build all essential assets tailored to your brand—from UI/UX layouts, landing pages, and responsive websites to Facebook and Instagram ad creatives and structured social media content plans.',
  },
  {
    stepNumber: '03',
    title: 'Revisions and Optimization',
    shortDescription:
      'Refining designs, ad targeting, and content details based on feedback and real-world usability checks.',
    detailedDescription:
      'During the refinement phase, we review every detail together—adjusting website responsiveness, page flow, copy clarity, and campaign targeting settings so everything aligns seamlessly with your business objectives.',
  },
  {
    stepNumber: '04',
    title: 'Launch and Ongoing Growth',
    shortDescription:
      'Deploying your website or campaigns smoothly and supporting ongoing performance, updates, and brand momentum.',
    detailedDescription:
      'Once testing and quality checks are complete, we launch your website or live campaigns with confidence and provide ongoing guidance, campaign optimization, and creative support as your business grows.',
  },
];

export interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  pricePkr: string;
  priceUsd: string;
  billingCycle: string;
  featured?: boolean;
  features: string[];
}

export type ServicePricingMap = Record<ServiceCategory, PricingTier[]>;

export const DEFAULT_PRICING_PLANS: ServicePricingMap = {
  'Meta Ads Management': [
    {
      id: 'meta-starter',
      name: 'Starter Package',
      subtitle: 'For Small Businesses and Start-ups',
      pricePkr: '25,000',
      priceUsd: '95',
      billingCycle: 'per month',
      features: [
        'Campaign Strategy and Setup',
        'Facebook and Instagram Ads Placement',
        'Core Audience Targeting',
        '2 Ad Creative and Copy Variations',
        'Bi-Weekly Performance Check',
        'Monthly Summary Report',
      ],
    },
    {
      id: 'meta-growth',
      name: 'Growth Package',
      subtitle: 'For Growing Brands and E-Commerce',
      pricePkr: '45,000',
      priceUsd: '165',
      billingCycle: 'per month',
      featured: true,
      features: [
        'Everything in Starter Package',
        'Full-Funnel Campaign Structure',
        'Custom and Lookalike Audiences',
        'Meta Pixel and Conversion Tracking',
        '5 Ad Creative and Copy Variations',
        'Weekly A/B Testing and Optimization',
      ],
    },
    {
      id: 'meta-scale',
      name: 'Scale Package',
      subtitle: 'For High-Volume and Multi-Offer Brands',
      pricePkr: '75,000',
      priceUsd: '275',
      billingCycle: 'per month',
      features: [
        'Everything in Growth Package',
        'Multi-Campaign Scaling Strategy',
        'Dynamic Retargeting Funnels',
        'Continuous Budget and Bid Tuning',
        'Creative Direction and Refresh Plan',
        'Weekly 1-on-1 Strategy Reviews',
      ],
    },
  ],
  'Website Design': [
    {
      id: 'web-starter',
      name: 'Starter Package',
      subtitle: 'For Personal Brands and Landing Pages',
      pricePkr: '30,000',
      priceUsd: '110',
      billingCycle: 'one-time',
      features: [
        'Custom Landing Page (Up to 3 Sections/Pages)',
        'Mobile and Desktop Responsive Design',
        'Clean UI/UX Visual Hierarchy',
        'Contact Form and Direct Links Setup',
        'Basic Speed and On-Page SEO Setup',
        '2 Rounds of Revisions',
      ],
    },
    {
      id: 'web-business',
      name: 'Business Package',
      subtitle: 'For Growing Businesses and Agencies',
      pricePkr: '55,000',
      priceUsd: '195',
      billingCycle: 'one-time',
      featured: true,
      features: [
        'Custom 5–7 Page Business Website',
        'Conversion-Focused UI/UX Design',
        'Responsive Cross-Device Testing',
        'Lead Capture Forms and Social Integration',
        'On-Page SEO and Metadata Optimization',
        '3 Revision Rounds and Launch Support',
      ],
    },
    {
      id: 'web-exclusive',
      name: 'Exclusive Package',
      subtitle: 'For Custom Brands and Full Storefronts',
      pricePkr: '95,000',
      priceUsd: '340',
      billingCycle: 'one-time',
      features: [
        'Custom Multi-Page or Storefront Design',
        'Bespoke Brand Styling and Layout System',
        'Complete UI/UX Flow and Polish',
        'Advanced Forms and Interactive Features',
        'Performance and Analytics Integration',
        'Priority Post-Launch Support',
      ],
    },
  ],
  'Social Media Marketing': [
    {
      id: 'social-starter',
      name: 'Starter Package',
      subtitle: 'For Consistent Brand Presence',
      pricePkr: '22,000',
      priceUsd: '85',
      billingCycle: 'per month',
      features: [
        'Monthly Content Strategy and Plan',
        '8–10 Branded Posts per Month',
        'Caption Copywriting and Hashtag Research',
        'Facebook and Instagram Scheduling',
        'Profile Bio and Highlights Refresh',
        'Monthly Growth Overview',
      ],
    },
    {
      id: 'social-growth',
      name: 'Growth Package',
      subtitle: 'For Active Engagement and Brand Growth',
      pricePkr: '40,000',
      priceUsd: '150',
      billingCycle: 'per month',
      featured: true,
      features: [
        '15–18 Branded Posts, Carousels and Reels Plan',
        'Tailored Editorial Calendar and Planning',
        'Active Page and Comment Management',
        'Targeted Organic Growth Tactics',
        'Competitor and Content Trend Review',
        'Bi-Weekly Insights and Refinements',
      ],
    },
    {
      id: 'social-pro',
      name: 'Brand Pro Package',
      subtitle: 'For Full-Scale Social Brand Building',
      pricePkr: '65,000',
      priceUsd: '240',
      billingCycle: 'per month',
      features: [
        '25+ Posts, Carousels and Short-Form Plans',
        'Full Multi-Platform Account Management',
        'Aligned Organic and Paid Content Flow',
        'Visual Grid and Brand Voice Guidelines',
        'Dedicated Creative Planning Sessions',
        'Priority Support and Monthly Reporting',
      ],
    },
  ],
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
];
