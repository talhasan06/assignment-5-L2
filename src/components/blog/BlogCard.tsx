import React from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaTag } from 'react-icons/fa';
import Card, { CardImage, CardBody, CardTitle, CardText, CardFooter } from '../ui/Card';
import { IBlog } from '../../models/Blog';

interface BlogCardProps {
  blog: IBlog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  // Format date
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card hoverEffect className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-lg">
      <CardImage 
        src={blog.imageUrl} 
        alt={blog.title} 
        className="h-48"
      />
      <CardBody className="flex-grow">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <FaCalendarAlt className="mr-1" />
          <span>{formatDate(blog.createdAt)}</span>
          <span className="mx-2">•</span>
          <FaTag className="mr-1" />
          <span>{blog.category}</span>
        </div>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          <Link href={`/blog/${blog._id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            {blog.title}
          </Link>
        </CardTitle>
        <CardText className="mb-4 text-gray-700 dark:text-gray-300">{blog.excerpt}</CardText>
      </CardBody>
      <CardFooter className="bg-gray-50 dark:bg-gray-900">
        <Link 
          href={`/blog/${blog._id}`}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium inline-flex items-center"
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;