import Header from '@/components/layout/Header';
import './globals.css';
import { Providers } from './providers';
import { Metadata } from 'next';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | Your Name - Portfolio & Blog',
    default: 'Your Name - Full Stack Developer',
  },
  description: 'Personal portfolio and blog of Your Name, a Full Stack Developer specializing in Next.js, React, Node.js, and MongoDB',
  openGraph: {
    title: 'Your Name - Full Stack Developer',
    description: 'Personal portfolio and blog of Your Name, a Full Stack Developer specializing in Next.js, React, Node.js, and MongoDB',
    url: 'https://yourportfolio.com',
    siteName: 'Your Name - Portfolio & Blog',
    images: [
      {
        url: 'https://yourportfolio.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Name - Portfolio & Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name - Full Stack Developer',
    description: 'Personal portfolio and blog of Your Name, a Full Stack Developer specializing in Next.js, React, Node.js, and MongoDB',
    images: ['https://yourportfolio.com/images/twitter-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}