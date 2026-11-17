import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const ClassicCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 420, damping: 30, mass: 0.35 });
  const ringY = useSpring(mouseY, { stiffness: 420, damping: 30, mass: 0.35 });

  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 42, mass: 0.15 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 42, mass: 0.15 });

  useEffect(() => {
    const fineHoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluate = () => {
      setEnabled(fineHoverPointer.matches && !reducedMotion.matches);
    };
    evaluate();

    fineHoverPointer.addEventListener('change', evaluate);
    reducedMotion.addEventListener('change', evaluate);
    return () => {
      fineHoverPointer.removeEventListener('change', evaluate);
      reducedMotion.removeEventListener('change', evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        setVisible(false);
        return;
      }
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
    const handleDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') setClicking(true);
    };
    const handleUp = () => setClicking(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('pointerup', handleUp, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled || !visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicking ? 0.82 : hoveringInteractive ? 1.5 : 1,
          borderColor: hoveringInteractive ? '#111111' : '#E8C547',
          backgroundColor: hoveringInteractive
            ? 'rgba(232, 197, 71, 0.16)'
            : 'rgba(232, 197, 71, 0)',
        }}
        transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border-[1.75px] will-change-transform"
      />

      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicking ? 1.35 : hoveringInteractive ? 0.65 : 1,
          backgroundColor: hoveringInteractive ? '#E8C547' : '#111111',
        }}
        transition={{ duration: 0.08 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full ring-1 ring-[#E8C547]/70 will-change-transform"
      />
    </div>
  );
};
