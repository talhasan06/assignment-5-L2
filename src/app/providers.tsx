'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/lib/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow py-8">
            <AnimatePresence mode="wait" initial={false}>
              {children}
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}