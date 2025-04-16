import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { Input, Textarea } from '../ui/FormInput';
import Button from '../ui/Button';
import { IProject } from '../../models/Project';

interface ProjectFormProps {
  project?: IProject;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

interface ProjectFormValues {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ 
  project, 
  onSubmit, 
  isSubmitting 
}) => {
  const [technologies, setTechnologies] = useState<string[]>(
    project?.technologies || []
  );
  const [techInput, setTechInput] = useState('');

  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm({
    defaultValues: project || {
      title: '',
      description: '',
      imageUrl: '',
      liveUrl: '',
      githubUrl: '',
      featured: false
    }
  });

  const handleAddTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const handleFormSubmit = (data: any) => {
    // Add technologies to form data
    const formData = {
      ...data,
      technologies
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Input
        label="Project Title"
        {...register('title', { 
          required: 'Title is required',
          minLength: { value: 3, message: 'Title must be at least 3 characters' }
        })}
        error={errors.title?.message as string}
      />

      <Textarea
        label="Project Description"
        rows={6}
        {...register('description', { 
          required: 'Description is required',
          minLength: { value: 10, message: 'Description must be at least 10 characters' }
        })}
        error={errors.description?.message as string}
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

      <Input
        label="Live Demo URL"
        {...register('liveUrl', { 
          required: 'Live Demo URL is required',
          pattern: {
            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
            message: 'Please enter a valid URL'
          }
        })}
        error={errors.liveUrl?.message as string}
      />

      <Input
        label="GitHub Repository URL"
        {...register('githubUrl', { 
          required: 'GitHub URL is required',
          pattern: {
            value: /^(https?:\/\/)?(www\.)?github\.com\/[\w.-]+\/[\w.-]+$/,
            message: 'Please enter a valid GitHub repository URL'
          }
        })}
        error={errors.githubUrl?.message as string}
      />

      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          Technologies Used
        </label>
        <div className="flex mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1"
            placeholder="Add a technology (e.g. React, Node.js)"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
          >
            <FaPlus />
          </button>
        </div>
        {technologies.length === 0 && (
          <p className="text-red-500 text-sm">Please add at least one technology</p>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {technologies.map((tech) => (
            <div 
              key={tech} 
              className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center"
            >
              {tech}
              <button 
                type="button" 
                onClick={() => handleRemoveTech(tech)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          {...register('featured')}
        />
        <label htmlFor="featured" className="ml-2 text-gray-700">
          Feature this project on the home page
        </label>
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
          disabled={isSubmitting || technologies.length === 0}
        >
          {isSubmitting ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;