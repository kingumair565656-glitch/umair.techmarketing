import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const ClassicCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 320, damping: 28, mass: 0.45 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 28, mass: 0.45 });

  const dotX = useSpring(mouseX, { stiffness: 900, damping: 42, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 42, mass: 0.2 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluate = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches);
    };
    evaluate();

    finePointer.addEventListener('change', evaluate);
    reducedMotion.addEventListener('change', evaluate);
    return () => {
      finePointer.removeEventListener('change', evaluate);
      reducedMotion.removeEventListener('change', evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, input, select, textarea, [role="tab"], [role="button"]'
      );
      setHoveringInteractive(Boolean(interactive));
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);
    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled || !visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* Classic Gold Outer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicking ? 0.82 : hoveringInteractive ? 1.55 : 1,
          borderColor: hoveringInteractive ? '#111111' : '#E8C547',
          backgroundColor: hoveringInteractive
            ? 'rgba(232, 197, 71, 0.16)'
            : 'rgba(232, 197, 71, 0)',
        }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border-[1.75px]"
      />

      {/* Precision Center Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicking ? 1.4 : hoveringInteractive ? 0.65 : 1,
          backgroundColor: hoveringInteractive ? '#E8C547' : '#111111',
        }}
        transition={{ duration: 0.12 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full ring-1 ring-[#E8C547]/70"
      />
    </div>
  );
};
