import './globals.css';
import { Providers } from './providers';
import { Metadata } from 'next';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}