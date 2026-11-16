import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Trash2, Camera } from 'lucide-react';
import { BRAND_INFO } from '../data/siteContent';
import { compressImageFile } from '../types/portfolio';
import { PageId } from './Header';

const DEFAULT_HERO_IMAGE = '/src/assets/images/hero_umairtech_workspace_1794841191025.jpg';

interface HeroSectionProps {
  profilePhoto: string | null;
  onUpdateProfilePhoto: (photoDataUrl: string | null) => void;
  onNavigatePage: (page: PageId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profilePhoto,
  onUpdateProfilePhoto,
  onNavigatePage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imgFailed, setImgFailed] = useState(false);

  const activeImage = profilePhoto || DEFAULT_HERO_IMAGE;

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [4.5, -4.5]), {
    stiffness: 180,
    damping: 20,
  });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(nx);
    tiltY.set(ny);
  };

  const handleCardMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid JPG, PNG, or WebP photograph.');
      return;
    }
    setUploadError(null);
    setImgFailed(false);
    try {
      const compressed = await compressImageFile(file, 960, 0.88);
      onUpdateProfilePhoto(compressed);
    } catch {
      setUploadError('Unable to process this image. Please try another photo.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white/75 pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-[#111111]/8"
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute top-0 right-0 w-[44%] h-full bg-[#FFF4CC]/55 -z-0 hidden lg:block"
        style={{ clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.45, 0.8, 0.45], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-10 right-[42%] w-px h-36 bg-gradient-to-b from-transparent via-[#E8C547] to-transparent hidden lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (~55%): Headline, Description, CTAs & Specialty Strip */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[#111111]/80 mb-4">
              <span>{BRAND_INFO.brandName}</span>
              <span aria-hidden="true" className="text-[#E8C547]">
                ·
              </span>
              <span>{BRAND_INFO.professionalTitle}</span>
            </div>

            <h1 className="font-display text-[2.1rem] sm:text-[2.75rem] lg:text-[3.15rem] font-bold leading-[1.15] tracking-tight text-[#111111] [text-wrap:balance] mb-5">
              {BRAND_INFO.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-[#3F3F3F] max-w-[60ch] mb-8">
              {BRAND_INFO.heroDescription}
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16 }}
                href="#/projects"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage('projects');
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white rounded-lg shadow-sm transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
              >
                <span>{BRAND_INFO.heroPrimaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16 }}
                href="#/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage('contact');
                }}
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-semibold text-[#111111] bg-[#FFF4CC] hover:bg-[#111111] hover:text-white border border-[#111111]/15 rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
              >
                {BRAND_INFO.heroSecondaryCta}
              </motion.a>
            </div>

            {/* 4-Item Specialty Strip matching onlinekrlo.pk hero bottom strip */}
            <div className="w-full pt-6 border-t border-[#111111]/10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-semibold text-[#111111]/75">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-xs bg-[#E8C547] shrink-0" />
                  <span className="truncate">Meta Ads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-xs bg-[#E8C547] shrink-0" />
                  <span className="truncate">Website Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-xs bg-[#E8C547] shrink-0" />
                  <span className="truncate">UI/UX Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-xs bg-[#E8C547] shrink-0" />
                  <span className="truncate">Social Media</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (~45%): Classic Framed Hero Picture with subtle mouse tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 900 }}
            className="lg:col-span-5"
          >
            <motion.div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              style={{ rotateX, rotateY }}
              className={`relative rounded-xl bg-[#FFF4CC] p-3.5 sm:p-4 border transition-colors ${
                isDragging ? 'border-[#111111]' : 'border-[#E8C547]'
              } shadow-[0_18px_40px_-15px_rgba(17,17,17,0.18)]`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
                aria-label="Upload Muhammad Umair professional photograph"
              />

              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white border border-[#111111]/10 group">
                {!imgFailed ? (
                  <img
                    src={activeImage}
                    alt={
                      profilePhoto
                        ? 'Muhammad Umair — Digital Marketer and Creative Specialist'
                        : 'UmairTech creative workspace for Meta Ads, Website Design, and Social Media Marketing'
                    }
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                      profilePhoto ? 'object-top' : 'object-center'
                    }`}
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center bg-[#FFF4CC]/50 p-6 text-center">
                    <p className="font-display text-lg font-bold text-[#111111]">
                      {BRAND_INFO.brandName}
                    </p>
                    <p className="text-xs text-[#4A4A4A]">
                      {BRAND_INFO.ownerName}
                    </p>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/45 to-transparent p-4 flex items-end justify-between gap-3">
                  <div className="text-white">
                    <p className="font-display text-base font-semibold leading-tight">
                      {BRAND_INFO.ownerName}
                    </p>
                    <p className="text-xs text-[#FFF4CC]">
                      {BRAND_INFO.professionalTitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#FFF4CC] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{profilePhoto ? 'Change Photo' : 'Upload Photo'}</span>
                    </button>
                    {profilePhoto && (
                      <button
                        type="button"
                        onClick={() => {
                          setImgFailed(false);
                          onUpdateProfilePhoto(null);
                        }}
                        aria-label="Reset to studio workspace picture"
                        className="inline-flex items-center justify-center w-8 h-8 text-white bg-[#111111]/75 hover:bg-[#111111] rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {uploadError && (
                <p role="alert" className="mt-2 text-xs font-semibold text-red-700">
                  {uploadError}
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
