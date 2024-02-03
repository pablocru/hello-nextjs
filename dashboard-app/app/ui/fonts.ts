import { Inter, Lusitana } from 'next/font/google';

// Variable font can be used without specifying it's weight
export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin']
});
