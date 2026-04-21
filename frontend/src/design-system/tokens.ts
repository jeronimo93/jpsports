export const colors = {
  ink: '#0A0B0F',
  ink2: '#0E1018',
  court: '#12141C',
  court2: '#1A1D28',
  chalk: '#FFFFFF',
  fog: '#9BA0B3',
  fog2: '#5B6076',
  volt: '#D7FF3B',
  voltInk: '#0A0B0F',
  flame: '#FF5E3A',
  ice: '#3BA7FF',
  win: '#00D97E',
  loss: '#FF4D6A',
  draw: '#FFB547',
  line: 'rgba(255,255,255,0.08)',
  line2: 'rgba(255,255,255,0.06)',
} as const;

export const spacing = {
  s1: 4, s2: 8, s3: 12, s4: 16, s5: 24, s6: 32, s7: 48, s8: 64, s9: 96,
} as const;

export const radii = {
  r0: 0, rSm: 8, rMd: 12, rLg: 20, rPill: 999,
} as const;

export const fonts = {
  display: 'Archivo Black',
  body: 'Space Grotesk',
  mono: 'JetBrains Mono',
  hand: 'Caveat',
} as const;

export const fontSizes = {
  fs11: 11, fs12: 12, fs13: 13, fs14: 14,
  fs16: 16, fs18: 18, fs20: 20, fs24: 24,
  fs32: 32, fs44: 44, fs56: 56, fs72: 72, fs96: 96,
} as const;

// letter-spacing in em → px at each font size is applied per component.
// These are em-equivalent values from colors_and_type.css.
export const tracking = {
  display: -0.02, // -2%
  body: -0.005,   // -0.5%
  caps: 0.08,     // +8%
} as const;

export const motion = {
  easeSharp: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  easeOvershoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  durPress: 120,
  durHover: 200,
  durRoute: 320,
  durCelebrate: 600,
} as const;
