import type { Variants, Transition } from 'motion/react';

export const spring: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 32,
};

export const smooth: Transition = {
  type: 'tween',
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.38,
};

// Staggers children with a fade-up entrance
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

// Fade + rise from below
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: smooth },
};

// Fade + enter from left
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -22 },
  visible: { opacity: 1, x: 0, transition: smooth },
};

// Fade + enter from right
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 22 },
  visible: { opacity: 1, x: 0, transition: smooth },
};

// Pop in with scale
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: spring },
};

// Vehicle card states (used with animate=)
export const vehicleCard: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.025, transition: spring },
  tap: { scale: 0.97, transition: { duration: 0.1 } },
};

// Animated result panel change
export const resultUpdate: Variants = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: spring },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.18 } },
};

// Stagger list rows
export const listRow: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: smooth },
};

// Number swap animation (via AnimatePresence key)
export const numSwap: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.16 } },
};
