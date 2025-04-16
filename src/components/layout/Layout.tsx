"use client";

import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({
  children,
  title = 'Portfolio & Blog',
  description = 'Personal portfolio and blog website showcasing projects and thoughts'
}: LayoutProps) => {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <main className="flex-grow">{children}</main>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;