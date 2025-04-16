import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const Layout = ({ 
  children, 
  title = 'Portfolio & Blog',
  description = 'Personal portfolio and blog website showcasing projects and thoughts'
}: LayoutProps) => {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header />
        
        <main className="flex-grow py-8">
          <PageTransition key={router.route}>
            {children}
          </PageTransition>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout;