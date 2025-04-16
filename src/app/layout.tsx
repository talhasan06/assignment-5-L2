import Header from '@/components/layout/Header';
import './globals.css';

import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Tamim Al Hasan',
  description: 'A personal portfolio and blog website built with Next.js',
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