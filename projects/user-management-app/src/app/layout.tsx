import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { plexSans, plexSerif } from '@/common/fonts';
import '@/common/main.css';

export const metadata: Metadata = {
  title: 'User Management App',
  description: 'Supabase Database, Auth and Storage'
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
