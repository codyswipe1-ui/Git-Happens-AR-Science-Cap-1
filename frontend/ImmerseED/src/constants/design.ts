// ImmerseED design tokens: one place for colors, fonts and sizes.
// Matches the team's UI guide. Use these in every new screen:
//   import { colors, fonts, space, radius } from '@/constants/design';
// (theme.ts is the Expo template's file; the new design lives here.)

export const colors = {
  ink: '#15151A',          // main text, primary buttons, active tab
  textMuted: '#5B5D6B',    // secondary text on white or background
  textOnPastel: '#3E3F4A', // secondary text on pastel cards
  textLocked: '#4F5160',
  background: '#F3F4F8',   // app background, inputs, secondary buttons
  surface: '#FFFFFF',      // cards, sheets, tab bar
  line: '#E6E7EE',         // borders, progress track, locked rows
  inputBorder: '#D9DAE3',
  focus: '#8E7BEA',

  lilac: '#CFC6FF',  // Animal Cell
  mint: '#BFEBD3',   // Plant Cell, lesson done
  peach: '#FFD2B8',  // Human Cell, current lesson
  sky: '#C5E3FF',    // 3D viewer stage
  butter: '#FCEBA5', // Lesson screen
  progress: '#FF9F6E',
} as const;

// With custom fonts in React Native, each weight is its own family name.
// Loaded once in src/app/_layout.tsx. Don't use fontWeight with these.
export const fonts = {
  display: 'BricolageGrotesque_800ExtraBold',
  heading: 'BricolageGrotesque_700Bold',
  body: 'Geist_400Regular',
  bodyMedium: 'Geist_500Medium',
  bodySemibold: 'Geist_600SemiBold',
  mono: 'GeistMono_500Medium',
} as const;

export const space = { xxs: 4, xs: 8, sm: 12, md: 16, lg: 20, xl: 24, xxl: 32 } as const;

export const radius = { chip: 999, small: 12, button: 16, row: 22, card: 26, sheet: 32 } as const;

export const size = { touch: 44, button: 56, input: 52, tabBar: 88 } as const;

// Widest the content gets on web or tablets, so lines don't stretch across a big screen.
export const maxContentWidth = 1100;
