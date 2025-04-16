import Header from '@/components/layout/Header';
import './globals.css';
import Footer from '@/components/layout/Footer';
import SessionProvider from '@/components/providers/SessionProvider';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Tamim Al Hasan',
  description: 'A personal portfolio and blog website built with Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}