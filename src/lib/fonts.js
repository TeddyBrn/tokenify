import { Roboto, Lalezar } from 'next/font/google';

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap'
});

export const lalezar = Lalezar({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lalezar',
  display: 'swap'
});
