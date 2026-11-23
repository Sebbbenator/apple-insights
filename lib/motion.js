export const duration = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
  hero: 1,
};

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  spring: [0.34, 1.56, 0.64, 1],
};

export const textRise = {
  opacity: { duration: 0.4, ease: [0.5, 0, 0.5, 1] },
  y: { duration: duration.slow, ease: [0.05, 0.4, 0.5, 1] },
};
