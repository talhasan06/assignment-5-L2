import { Metadata } from 'next';
import BlogList from '@/components/blog/BlogList';
import { IBlog } from '@/models/Blog';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import PageTransition from '@/components/layout/PageTransition';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read articles about web development, programming, and technology by Your Name, a Full Stack Developer.',
  openGraph: {
    title: 'Blog | Your Name - Full Stack Developer',
    description: 'Read articles about web development, programming, and technology by Your Name, a Full Stack Developer.',
    url: 'https://yourportfolio.com/blog',
    siteName: 'Your Name - Portfolio & Blog',
    images: [
      {
        url: 'https://yourportfolio.com/images/blog-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Name - Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

// This function runs at request time on the server
async function getBlogs(): Promise<IBlog[]> {
  await dbConnect();
  
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    
    // Convert MongoDB document to plain object and handle dates
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <PageTransition>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, programming, and technology.
            Learn from my experiences and stay updated with the latest trends.
          </p>
        </div>
        
        <BlogList initialBlogs={blogs} />
      </PageTransition>
    </div>
  );
}