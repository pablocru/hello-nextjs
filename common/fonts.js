import { IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google';

export const plexSans = IBM_Plex_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
  adjustFontFallback: false,
  variable: '--ibm-plex-sans'
});

export const plexSerif = IBM_Plex_Serif({
  weight: ['700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['serif'],
  adjustFontFallback: false,
  variable: '--ibm-plex-serif'
});
