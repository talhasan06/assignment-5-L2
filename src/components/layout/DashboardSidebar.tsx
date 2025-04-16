import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaTachometerAlt, FaNewspaper, FaProjectDiagram, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

const DashboardSidebar = () => {
  const router = useRouter();

  const isActive = (pathname: string) => {
    return router.pathname === pathname;
  };

  return (
    <div className="h-full min-h-screen bg-gray-800 text-white w-64 py-4 px-3 hidden md:block">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-400 text-sm">Manage your content</p>
      </div>
      
      <nav className="space-y-1">
        <Link href="/dashboard" 
          className={`flex items-center py-2 px-4 rounded-md ${
            isActive('/dashboard') ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          <FaTachometerAlt className="mr-3" />
          Overview
        </Link>
        
        <Link href="/dashboard/blogs" 
          className={`flex items-center py-2 px-4 rounded-md ${
            isActive('/dashboard/blogs') ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          <FaNewspaper className="mr-3" />
          Blog Posts
        </Link>
        
        <Link href="/dashboard/projects" 
          className={`flex items-center py-2 px-4 rounded-md ${
            isActive('/dashboard/projects') ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          <FaProjectDiagram className="mr-3" />
          Projects
        </Link>
        
        <Link href="/dashboard/messages" 
          className={`flex items-center py-2 px-4 rounded-md ${
            isActive('/dashboard/messages') ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          <FaEnvelope className="mr-3" />
          Messages
        </Link>
      </nav>
      
      <div className="mt-auto pt-8">
        <button 
          onClick={() => signOut()} 
          className="flex items-center py-2 px-4 rounded-md text-red-300 hover:bg-gray-700 w-full"
        >
          <FaSignOutAlt className="mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;