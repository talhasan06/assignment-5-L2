'use client';

import { useState, useEffect } from 'react';
import { FaNewspaper, FaProjectDiagram, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import PageTransition from '@/components/layout/PageTransition';

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogCount: 0,
    projectCount: 0,
    messageCount: 0,
    unreadMessageCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch blog count
        const blogResponse = await axios.get('/api/blogs');
        const blogCount = blogResponse.data.data.length;

        // Fetch project count
        const projectResponse = await axios.get('/api/projects');
        const projectCount = projectResponse.data.data.length;

        // Fetch message stats
        const messageResponse = await axios.get('/api/messages');
        const messages = messageResponse.data.data;
        const messageCount = messages.length;
        const unreadMessageCount = messages.filter((msg: any) => !msg.read).length;

        setStats({
          blogCount,
          projectCount,
          messageCount,
          unreadMessageCount,
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
        
        // Set fallback stats for demo
        setStats({
          blogCount: 6,
          projectCount: 8,
          messageCount: 12,
          unreadMessageCount: 5,
        });
      }
    };

    fetchStats();
  }, []);

  // Format date
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back to your portfolio admin dashboard.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center text-gray-600 dark:text-gray-400">
          <FaCalendarAlt className="mr-2" />
          <span>{formatDate()}</span>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FaNewspaper size={20} />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Blog Posts</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.blogCount}</p>
          </div>
          <div className="ml-auto">
            <Link href="/dashboard/blogs"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              Manage
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
            <FaProjectDiagram size={20} />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Projects</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.projectCount}</p>
          </div>
          <div className="ml-auto">
            <Link href="/dashboard/projects"
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium"
            >
              Manage
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <FaEnvelope size={20} />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Messages</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.messageCount}</p>
            {stats.unreadMessageCount > 0 && (
              <p className="text-sm text-red-500 dark:text-red-400">{stats.unreadMessageCount} unread</p>
            )}
          </div>
          <div className="ml-auto">
            <Link href="/dashboard/messages"
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium"
            >
              View
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/blogs"
            className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <FaNewspaper size={24} className="text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-gray-800 dark:text-gray-200 font-medium">Add New Blog Post</span>
          </Link>

          <Link href="/dashboard/projects"
            className="bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <FaProjectDiagram size={24} className="text-green-600 dark:text-green-400 mb-2" />
            <span className="text-gray-800 dark:text-gray-200 font-medium">Create New Project</span>
          </Link>

          <Link href="/dashboard/messages"
            className="bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <FaEnvelope size={24} className="text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-gray-800 dark:text-gray-200 font-medium">Check Messages</span>
          </Link>

          <Link href="/"
            className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-gray-800 dark:text-gray-200 font-medium">View Portfolio</span>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}