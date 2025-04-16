"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaTachometerAlt, FaNewspaper, FaProjectDiagram, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

const DashboardSidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        <Link 
          href="/dashboard" 
          className={`flex items-center p-2 rounded hover:bg-gray-700 ${isActive('/dashboard') ? 'bg-gray-700' : ''}`}
        >
          <FaTachometerAlt className="mr-2" />
          Dashboard
        </Link>
        <Link 
          href="/dashboard/posts" 
          className={`flex items-center p-2 rounded hover:bg-gray-700 ${isActive('/dashboard/posts') ? 'bg-gray-700' : ''}`}
        >
          <FaNewspaper className="mr-2" />
          Posts
        </Link>
        <Link 
          href="/dashboard/projects" 
          className={`flex items-center p-2 rounded hover:bg-gray-700 ${isActive('/dashboard/projects') ? 'bg-gray-700' : ''}`}
        >
          <FaProjectDiagram className="mr-2" />
          Projects
        </Link>
        <Link 
          href="/dashboard/messages" 
          className={`flex items-center p-2 rounded hover:bg-gray-700 ${isActive('/dashboard/messages') ? 'bg-gray-700' : ''}`}
        >
          <FaEnvelope className="mr-2" />
          Messages
        </Link>
        <button 
          onClick={() => signOut()} 
          className="flex items-center p-2 rounded hover:bg-gray-700 w-full text-left"
        >
          <FaSignOutAlt className="mr-2" />
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default DashboardSidebar;