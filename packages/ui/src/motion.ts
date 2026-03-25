import type { MotionVariants } from '@vueuse/motion'

export const motionPresets: Record<
  'fadeIn' | 'slideUp' | 'scale' | 'button',
  MotionVariants<string>
> = {
  fadeIn: {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        duration: 260,
        easing: 'ease-out',
      },
    },
  },
  slideUp: {
    initial: {
      opacity: 0,
      y: 14,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 240,
        damping: 20,
      },
    },
  },
  scale: {
    initial: {
      opacity: 0,
      scale: 0.96,
    },
    enter: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 320,
        damping: 24,
      },
    },
  },
  button: {
    initial: { scale: 1 },
    hovered: {
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 380,
        damping: 24,
      },
    },
    tapped: {
      scale: 0.98,
      transition: {
        type: 'spring',
        stiffness: 420,
        damping: 28,
      },
    },
  },
}
