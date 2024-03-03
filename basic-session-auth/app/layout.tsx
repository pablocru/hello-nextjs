import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { plexSans, plexSerif } from '../../common/fonts';
import './ui/global.css';

export const metadata: Metadata = {
  title: 'Basic Session Auth',
  description: 'Example using authentication with session'
};

export default function RootLayout ({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
