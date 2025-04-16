import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { Input, Textarea, Select } from '../ui/FormInput';
import Button from '../ui/Button';
import { IBlog } from '../../models/Blog';

interface BlogFormProps {
  blog?: IBlog;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

// Available blog categories
const categories = [
  { value: 'Web Development', label: 'Web Development' },
  { value: 'React', label: 'React' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'CSS', label: 'CSS' },
  { value: 'Database', label: 'Database' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Career', label: 'Career' },
  { value: 'Tools', label: 'Tools' },
  { value: 'Other', label: 'Other' },
];

const BlogForm: React.FC<BlogFormProps> = ({ 
  blog, 
  onSubmit, 
  isSubmitting 
}) => {
  const [tags, setTags] = useState<string[]>(
    blog?.tags || []
  );
  const [tagInput, setTagInput] = useState('');

  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm({
    defaultValues: blog || {
      title: '',
      content: '',
      imageUrl: '',
      excerpt: '',
      category: 'Web Development',
      author: 'Your Name'
    }
  });

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleFormSubmit = (data: any) => {
    // Add tags to form data
    const formData = {
      ...data,
      tags
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Input
        label="Blog Title"
        {...register('title', { 
          required: 'Title is required',
          minLength: { value: 5, message: 'Title must be at least 5 characters' }
        })}
        error={errors.title?.message as string}
      />

      <Textarea
        label="Blog Excerpt (Short Description)"
        rows={3}
        {...register('excerpt', { 
          required: 'Excerpt is required',
          maxLength: { value: 200, message: 'Excerpt must be less than 200 characters' }
        })}
        error={errors.excerpt?.message as string}
      />

      <Select
        label="Category"
        options={categories}
        {...register('category', { required: 'Category is required' })}
        error={errors.category?.message as string}
      />

      <Input
        label="Image URL"
        {...register('imageUrl', { 
          required: 'Image URL is required',
          pattern: {
            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
            message: 'Please enter a valid URL'
          }
        })}
        error={errors.imageUrl?.message as string}
      />

      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          Tags
        </label>
        <div className="flex mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1"
            placeholder="Add a tag (e.g. JavaScript, Tutorial)"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
          >
            <FaPlus />
          </button>
        </div>
        {tags.length === 0 && (
          <p className="text-red-500 text-sm">Please add at least one tag</p>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <div 
              key={tag} 
              className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center"
            >
              {tag}
              <button 
                type="button" 
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Input
        label="Author"
        {...register('author', { required: 'Author is required' })}
        error={errors.author?.message as string}
      />

      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          Blog Content (Markdown)
        </label>
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-300 text-sm">
            <span className="font-medium">Markdown supported</span>
            <span className="text-gray-500 ml-2">
              Use # for headings, ** for bold, * for italic, ``` for code blocks
            </span>
          </div>
          <Textarea
            label=""
            rows={15}
            className="border-0 focus:ring-0"
            {...register('content', { 
              required: 'Content is required',
              minLength: { value: 50, message: 'Content must be at least 50 characters' }
            })}
            error={errors.content?.message as string}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || tags.length === 0}
        >
          {isSubmitting ? 'Saving...' : blog ? 'Update Blog Post' : 'Create Blog Post'}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;