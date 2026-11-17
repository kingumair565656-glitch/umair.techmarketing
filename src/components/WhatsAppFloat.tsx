import React from 'react';
import { motion } from 'motion/react';
import { BRAND_INFO } from '../data/siteContent';
import { WhatsAppIcon } from './WhatsAppIcon';

export const WhatsAppFloat: React.FC = () => {
  return (
    <motion.a
      href={BRAND_INFO.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp at ${BRAND_INFO.whatsappDisplay}`}
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-6px_rgba(17,17,17,0.35)] ring-2 ring-[#111111]/10 hover:bg-[#111111] hover:text-[#E8C547] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
    >
      <WhatsAppIcon className="w-7 h-7 shrink-0" />
    </motion.a>
  );
};
