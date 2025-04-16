// app/blog/page.tsx
import BlogCard from "@/components/blog/BlogCard";
import Blog from "@/models/Blog";
import dbConnect from "@/lib/mongodb";

// This is a Server Component
export default async function BlogPage() {
  await dbConnect();
  const blogs = await Blog.find();
  
  return (
    <div>
      <h1>Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}