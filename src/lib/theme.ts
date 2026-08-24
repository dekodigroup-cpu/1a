/**
 * The palette, for the places that need it as a value rather than a class:
 * the fog transitions, the canvas fallback, and the shader.
 *
 * Keep these in step with `tailwind.config.js` — `navy` is the firm's brand
 * blue and is the one colour worth re-tuning if the brand hex changes.
 */
export const PALETTE = {
  ink: '#050910',
  navyDeep: '#061529',
  navyMid: '#081A31',
  navy: '#0B2545',
  slate: '#0F1B2E',
  plate: '#0A1526',
  brass: '#C6A15B',
  bone: '#EAF0F7',
} as const
