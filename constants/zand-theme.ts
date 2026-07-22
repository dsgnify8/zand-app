// ZAND design tokens — the single source of truth for all brand styling.

export const palette = {
  paper: '#f6f3f1',
  taupe: '#807074',
  garnet: '#590317',
  black: '#000000',
  ink: '#1F1B1A',
  white: '#FFFFFF',
  sage: '#4F6F52',      // correct — muted, earthy green
  terracotta: '#A23A2E', // wrong — warm, muted red
} as const;

export const colors = {
  background: palette.paper,
  surface: palette.white,
  textPrimary: palette.ink,
  textSecondary: palette.taupe,
  accent: palette.garnet,
  border: '#E7E1DE',
  success: palette.sage,
  successSoft: '#E8EDE7',
  error: palette.terracotta,
  errorSoft: '#F4E5E2',
} as const;

export const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
} as const;

export const radius = {
  sm: 8, md: 12, lg: 20, pill: 999,
} as const;

export const fonts = {
  display: 'Cormorant_600SemiBold',
  heading: 'Cormorant_600SemiBold',
  wordmark: 'Montserrat_600SemiBold',
  body: 'Poppins_400Regular',
  bodyStrong: 'Poppins_600SemiBold',
  persian: 'Vazirmatn_400Regular',
} as const;

export const fontSize = {
  xs: 12, sm: 14, base: 16, lg: 18, xl: 22, xxl: 28, display: 34,
} as const;
