"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Portfolio
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className={`hover:text-blue-400 ${isActive('/') ? 'text-blue-400' : ''}`}>
            Home
          </Link>
          <Link href="/projects" className={`hover:text-blue-400 ${isActive('/projects') ? 'text-blue-400' : ''}`}>
            Projects
          </Link>
          <Link href="/blog" className={`hover:text-blue-400 ${isActive('/blog') ? 'text-blue-400' : ''}`}>
            Blog
          </Link>
          <Link href="/contact" className={`hover:text-blue-400 ${isActive('/contact') ? 'text-blue-400' : ''}`}>
            Contact
          </Link>
          <ThemeToggle />
          {session ? (
            <>
              <Link href="/dashboard" className={`hover:text-blue-400 ${pathname.includes('/dashboard') ? 'text-blue-400' : ''}`}>
                Dashboard
              </Link>
              <button 
                onClick={() => signOut()} 
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button 
              onClick={() => signIn()} 
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link href="/" 
              onClick={toggleMenu} 
              className={`hover:text-blue-400 ${isActive('/') ? 'text-blue-400' : ''}`}
            >
              Home
            </Link>
            <Link href="/projects" 
              onClick={toggleMenu} 
              className={`hover:text-blue-400 ${isActive('/projects') ? 'text-blue-400' : ''}`}
            >
              Projects
            </Link>
            <Link href="/blog" 
              onClick={toggleMenu} 
              className={`hover:text-blue-400 ${isActive('/blog') ? 'text-blue-400' : ''}`}
            >
              Blog
            </Link>
            <Link href="/contact" 
              onClick={toggleMenu} 
              className={`hover:text-blue-400 ${isActive('/contact') ? 'text-blue-400' : ''}`}
            >
              Contact
            </Link>
            <div className="flex items-center py-2">
              <span className="mr-3">Theme:</span>
              <ThemeToggle />
            </div>
            {session ? (
              <>
                <Link href="/dashboard" 
                  onClick={toggleMenu} 
                  className={`hover:text-blue-400 ${pathname.includes('/dashboard') ? 'text-blue-400' : ''}`}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => signOut()} 
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button 
                onClick={() => signIn()} 
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-left"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;