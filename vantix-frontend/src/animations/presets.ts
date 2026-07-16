export const TRANSITIONS = {
  springComfort: {
    type: 'spring',
    stiffness: 260,
    damping: 26,
  },
  springSnappy: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  },
  linearFast: {
    type: 'tween',
    ease: 'linear',
    duration: 0.12,
  },
} as const;

export const VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideInRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  },
} as const;
