export const JubenSectionAnimation = {
  viewport: { once: true, amount: 0.6 },
  scary: {
    offscreen: { opacity: 0 },
    offscreenReversed: { opacity: 0 },
    onscreen: { opacity: 1, transition: { type: 'spring', duration: 10 } },
  },
  fun: {
    offscreen: { x: -100, opacity: 0 },
    offscreenReversed: { x: 50, opacity: 0 },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.4, duration: 0.5 },
    },
  },
  emotion: {
    offscreen: { x: -100, opacity: 0 },
    offscreenReversed: { x: 50, opacity: 0 },
    onscreen: { x: 0, opacity: 1, transition: { type: 'spring', duration: 3 } },
  },
  mechanism: {
    offscreen: {
      y: 300,
      rotate: -10,
      opacity: 0,
    },
    offscreenReversed: {
      y: 300,
      rotate: 10,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  },
}
