export const JubenSectionAnimation = {
  viewport: { once: true, amount: 0.6 },
  scary: {
    start: { opacity: 0 },
    start2: { opacity: 0 },
    end: { opacity: 1, transition: { type: 'spring', duration: 10 } },
    hover: { scale: 5, transition: { type: 'spring', duration: 2 } },
  },
  fun: {
    start: { x: -100, opacity: 0 },
    start2: { y: 50, opacity: 0 },
    end: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.4, duration: 0.5 },
    },
  },
  emotion: {
    start: { x: -100, opacity: 0 },
    start2: { y: 50, opacity: 0 },
    end: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: 'spring', duration: 3 },
    },
  },
  mechanism: {
    start: {
      y: 300,
      rotate: -5,
      opacity: 0,
    },
    start2: {
      y: 300,
      rotate: 5,
      opacity: 0,
    },
    end: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.1,
        duration: 0.8,
      },
    },
  },
  mystery: {
    start: {
      filter: 'blur(5px)',
      rotate: 3,
    },
    start2: {
      filter: 'blur(5px)',
      rotate: -3,
    },
    end: {
      filter: 'blur(0px)',
      rotate: 0,
      transition: { type: 'tween', duration: 3 },
    },
  },
}
