import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import Button from '../ui/Button';
import BlogForm from '../blog/BlogForm';
import { IBlog } from '../../models/Blog';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/blogs');
      setBlogs(response.data.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setError('Failed to load blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = () => {
    setSelectedBlog(null);
    setShowForm(true);
  };

  const handleEditBlog = (blog: IBlog) => {
    setSelectedBlog(blog);
    setShowForm(true);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      await axios.delete(`/api/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      console.error('Failed to delete blog:', err);
      setError('Failed to delete blog. Please try again later.');
    }
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      if (selectedBlog) {
        // Update existing blog
        await axios.put(`/api/blogs/${selectedBlog._id}`, data);
        setBlogs(blogs.map(blog => 
          blog._id === selectedBlog._id ? { ...blog, ...data } : blog
        ));
      } else {
        // Create new blog
        const response = await axios.post('/api/blogs', data);
        setBlogs([response.data.data, ...blogs]);
      }
      
      setShowForm(false);
      setSelectedBlog(null);
    } catch (err) {
      console.error('Failed to save blog:', err);
      setError('Failed to save blog. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get all unique categories
  const categories = Array.from(
    new Set(blogs.map(blog => blog.category))
  ).sort();

  // Format date
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Filter and search blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = filterCategory === 'all' || blog.category === filterCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading && blogs.length === 0) {
    return <div className="text-center py-8">Loading blogs...</div>;
  }

  if (showForm) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          {selectedBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        <BlogForm 
          blog={selectedBlog || undefined} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
          <p className="text-gray-600">Create, edit, and delete your blog posts.</p>
        </div>
        <Button onClick={handleCreateBlog} className="flex items-center">
          <FaPlus className="mr-2" /> Add New Blog Post
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-2/3">
              <input
                type="text"
                placeholder="Search blog posts..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-1/3">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {filteredBlogs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searchTerm || filterCategory !== 'all'
              ? "No blog posts found matching your criteria." 
              : "No blog posts yet. Click 'Add New Blog Post' to create one."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blog Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            src={blog.imageUrl} 
                            alt={blog.title} 
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {blog.excerpt.length > 100 
                              ? `${blog.excerpt.substring(0, 100)}...` 
                              : blog.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit blog post"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete blog post"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;