import { Metadata } from 'next';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { IBlog } from '@/models/Blog';
import PageTransition from '@/components/layout/PageTransition';
import MarkdownContent from '@/components/blog/MarkdownContent';
import { notFound } from 'next/navigation';

interface BlogDetailProps {
  params: {
    id: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const blog = await getBlog(params.id);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }
  
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: `${blog.title} | Your Name - Blog`,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.createdAt,
      authors: [blog.author],
      tags: blog.tags,
      images: [
        {
          url: blog.imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  };
}

// Generate static params for common blogs
export async function generateStaticParams() {
  await dbConnect();
  
  try {
    const blogs = await Blog.find({}).select('_id').lean();
    
    return blogs.map((blog) => ({
      id: blog._id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Get blog data
async function getBlog(id: string): Promise<IBlog | null> {
  await dbConnect();
  
  try {
    const blog = await Blog.findById(id).lean();
    
    if (!blog) {
      return null;
    }
    
    // Convert MongoDB document to plain object and handle dates
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    return null;
  }
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const blog = await getBlog(params.id);
  
  if (!blog) {
    notFound();
  }
  
  // Format date function
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <PageTransition>
        <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6">
          <FaArrowLeft className="mr-2" /> Back to all posts
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-96 relative">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">{blog.title}</h1>
            
            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center mr-6 mb-2">
                <FaUser className="mr-2" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <FaCalendarAlt className="mr-2" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center mb-2">
                <FaTag className="mr-2" />
                <span>{blog.category}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
            
            <MarkdownContent content={blog.content} />
          </div>
        </div>
      </PageTransition>
    </div>
  );
}