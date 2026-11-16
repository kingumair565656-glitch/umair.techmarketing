import React, { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';

export const BackgroundCanvas: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  const pointerX = useMotionValue(-600);
  const pointerY = useMotionValue(-600);

  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 28, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 28, mass: 0.7 });

  const { scrollYProgress } = useScroll();
  const leftRuleY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const rightRuleY = useTransform(scrollYProgress, [0, 1], ['6%', '-12%']);
  const diamondScrollRotate = useTransform(scrollYProgress, [0, 1], [45, 135]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updatePointer = () => setFinePointer(mediaQuery.matches);
    updatePointer();
    mediaQuery.addEventListener('change', updatePointer);
    return () => mediaQuery.removeEventListener('change', updatePointer);
  }, []);

  useEffect(() => {
    if (!finePointer || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [finePointer, prefersReducedMotion, pointerX, pointerY]);

  const allowMotion = !prefersReducedMotion;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white"
    >
      {/* Subtle Classic Architectural Hairline Grid */}
      <div
        className="absolute inset-0 opacity-75"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(17, 17, 17, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 17, 17, 0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Mouse-Following Soft Gold & Warm Cream Halo (Desktop Fine Pointer) */}
      {finePointer && allowMotion && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="fixed top-0 left-0 w-[520px] h-[520px] rounded-full opacity-55"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,244,204,0.85) 0%, rgba(232,197,71,0.16) 42%, rgba(255,255,255,0) 72%)',
            }}
          />
        </motion.div>
      )}

      {/* Drifting Top-Right Classic Gold Ambient Aura */}
      <motion.div
        animate={
          allowMotion
            ? {
                x: [0, -28, 12, 0],
                y: [0, 22, -10, 0],
                scale: [1, 1.05, 0.98, 1],
              }
            : undefined
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-28 -right-24 w-[460px] h-[460px] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(255,244,204,0.9) 0%, rgba(232,197,71,0.18) 45%, rgba(255,255,255,0) 72%)',
        }}
      />

      {/* Drifting Bottom-Left Warm Cream Ambient Aura */}
      <motion.div
        animate={
          allowMotion
            ? {
                x: [0, 24, -14, 0],
                y: [0, -20, 14, 0],
                scale: [1, 1.04, 0.97, 1],
              }
            : undefined
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-32 -left-24 w-[440px] h-[440px] rounded-full opacity-55"
        style={{
          background:
            'radial-gradient(circle, rgba(255,244,204,0.85) 0%, rgba(232,197,71,0.14) 48%, rgba(255,255,255,0) 75%)',
        }}
      />

      {/* Classic Editorial Outer Frame Lines with Subtle Scroll Parallax */}
      <motion.div
        style={{ y: allowMotion ? leftRuleY : 0 }}
        className="hidden xl:block absolute left-8 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-[#E8C547]/45 to-transparent"
      />
      <motion.div
        style={{ y: allowMotion ? rightRuleY : 0 }}
        className="hidden xl:block absolute right-8 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-[#111111]/15 to-transparent"
      />

      {/* Top-Left Concentric Classic Gold Ring */}
      <motion.div
        animate={
          allowMotion
            ? {
                rotate: [0, 360],
                opacity: [0.35, 0.55, 0.35],
              }
            : undefined
        }
        transition={{
          rotate: { duration: 48, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="hidden md:flex items-center justify-center absolute top-[18%] left-[4%] w-24 h-24 rounded-full border border-dashed border-[#E8C547]/50"
      >
        <div className="w-12 h-12 rounded-full border border-[#111111]/10" />
      </motion.div>

      {/* Mid-Right Scroll-Responsive Classic Gold Diamond */}
      <motion.div
        style={{
          rotate: allowMotion ? diamondScrollRotate : 45,
        }}
        className="hidden lg:block absolute top-[48%] right-[3.5%] w-7 h-7 border border-[#E8C547]/65 bg-[#FFF4CC]/35"
      />

      {/* Lower-Left Subtle Floating Diamond */}
      <motion.div
        animate={
          allowMotion
            ? {
                y: [0, -14, 0],
                rotate: [45, 58, 45],
              }
            : undefined
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden lg:block absolute bottom-[18%] left-[5%] w-5 h-5 border border-[#111111]/18 bg-[#FFF4CC]/50"
      />
    </div>
  );
};
