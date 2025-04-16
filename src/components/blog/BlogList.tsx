import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import { IBlog } from '../../models/Blog';
import { motion } from 'framer-motion';

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface BlogListProps {
  initialBlogs?: IBlog[];
}

// Fallback static blogs in case API fails
const staticBlogs = [
  {
    _id: '1',
    title: 'Getting Started with Next.js',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: 'https://via.placeholder.com/600x400?text=Next.js',
    excerpt: 'Learn how to build your first Next.js application with this beginner-friendly guide.',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'JavaScript'],
    author: 'Your Name',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: 'Understanding React Hooks',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: 'https://via.placeholder.com/600x400?text=React+Hooks',
    excerpt: 'A deep dive into React Hooks and how they can simplify your React components.',
    category: 'React',
    tags: ['React', 'Hooks', 'JavaScript'],
    author: 'Your Name',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Keep the rest of the static blogs...
  {
    _id: '3',
    title: 'MongoDB for Beginners',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: 'https://via.placeholder.com/600x400?text=MongoDB',
    excerpt: 'Learn the basics of MongoDB and how to integrate it with your Node.js applications.',
    category: 'Database',
    tags: ['MongoDB', 'NoSQL', 'Database'],
    author: 'Your Name',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    title: 'Tailwind CSS Tips and Tricks',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: 'https://via.placeholder.com/600x400?text=Tailwind+CSS',
    excerpt: 'Discover advanced techniques to make the most out of Tailwind CSS in your projects.',
    category: 'CSS',
    tags: ['Tailwind CSS', 'CSS', 'Web Design'],
    author: 'Your Name',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5',
    title: 'Authentication with NextAuth.js',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: 'https://via.placeholder.com/600x400?text=NextAuth.js',
    excerpt: 'Implement user authentication in your Next.js applications using NextAuth.js.',
    category: 'Authentication',
    tags: ['NextAuth.js', 'Next.js', 'Authentication'],
    author: 'Your Name',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '6',
    title: 'Creating RESTful APIs with Node.js',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: 'https://via.placeholder.com/600x400?text=RESTful+APIs',
    excerpt: 'A comprehensive guide to building RESTful APIs using Node.js and Express.',
    category: 'Backend',
    tags: ['Node.js', 'Express', 'API', 'REST'],
    author: 'Your Name',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

const BlogList: React.FC<BlogListProps> = ({ initialBlogs = [] }) => {
  const [blogs, setBlogs] = useState<IBlog[]>(initialBlogs);
  const [loading, setLoading] = useState(initialBlogs.length === 0);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // If no initialBlogs provided, fetch them
    if (initialBlogs.length === 0) {
      fetchBlogs();
    }
  }, [initialBlogs.length]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      if (response.data.data.length > 0) {
        setBlogs(response.data.data);
      } else {
        // Use static blogs if API returns empty array
        setBlogs(staticBlogs);
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      // Fallback to static blogs if API fails
      setBlogs(staticBlogs);
      setError('Failed to fetch blogs from API, showing example blogs.');
      setLoading(false);
    }
  };

  // Get all unique categories from blogs
  const categories = Array.from(
    new Set(blogs.map(blog => blog.category))
  ).sort();

  // Filter blogs based on selected category and search term
  const filteredBlogs = blogs.filter(blog => {
    const matchesFilter = filter === 'all' || blog.category === filter;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div>
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="md:w-2/3">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-1/3">
            <select
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div 
          className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-600 text-yellow-700 dark:text-yellow-200 p-4 mb-6" 
          role="alert"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>{error}</p>
        </motion.div>
      )}

      {filteredBlogs.length === 0 ? (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-500 dark:text-gray-400">No blogs found matching your criteria.</p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={itemVariants}
        >
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BlogList;