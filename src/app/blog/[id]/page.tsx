// app/blog/[id]/page.tsx
import { Metadata } from "next";
import { connectDB } from "@/mongodb/db";
import { BlogModel } from "@/mongodb/schemas/blog";
import MarkdownContent from "@/components/blog/MarkdownContent";
import { FaCalendarAlt, FaTag, FaUser } from "react-icons/fa";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await connectDB();
  const blog = await BlogModel.findById(params.id);
  
  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
  
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.imageUrl }],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  await connectDB();
  const blog = await BlogModel.findById(params.id);
  
  if (!blog) {
    notFound();
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Blog Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {blog.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center">
            <FaUser className="mr-2" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <FaTag className="mr-2" />
            <span>{blog.category}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="object-cover w-full h-full"
          />
        </div>
      </header>

      {/* Blog Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MarkdownContent content={blog.content} />
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}