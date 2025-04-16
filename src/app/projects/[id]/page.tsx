import { Metadata } from 'next';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { IProject } from '@/models/Project';
import PageTransition from '@/components/layout/PageTransition';
import { notFound } from 'next/navigation';

interface ProjectDetailProps {
  params: {
    id: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const project = await getProject(params.id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Your Name - Portfolio`,
      description: project.description,
      images: [
        {
          url: project.imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

// Generate static params for common projects
export async function generateStaticParams() {
  await dbConnect();
  
  try {
    const projects = await Project.find({}).select('_id').lean();
    
    return projects.map((project) => ({
      id: project._id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Get project data
async function getProject(id: string): Promise<IProject | null> {
  await dbConnect();
  
  try {
    const project = await Project.findById(id).lean();
    
    if (!project) {
      return null;
    }
    
    // Convert MongoDB document to plain object and handle dates
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    return null;
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const project = await getProject(params.id);
  
  if (!project) {
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
        <Link href="/projects" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6">
          <FaArrowLeft className="mr-2" /> Back to all projects
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-96 relative">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-4xl font-bold mb-4 md:mb-0 text-gray-900 dark:text-gray-50">{project.title}</h1>
              
              <div className="flex space-x-4">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md"
                >
                  <FaGithub /> GitHub
                </a>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="prose max-w-none dark:prose-invert">
              <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>
              
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="list-disc pl-5 mb-6">
                <li className="mb-2">Feature 1 of the project</li>
                <li className="mb-2">Feature 2 of the project</li>
                <li className="mb-2">Feature 3 of the project</li>
                <li className="mb-2">Feature 4 of the project</li>
                <li className="mb-2">Feature 5 of the project</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                This project was built using {project.technologies.join(', ')}.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Challenges and Solutions</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                During the development of this project, I faced several challenges:
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                <strong>Challenge 1:</strong> Description of the challenge and how it was solved.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                <strong>Challenge 2:</strong> Description of another challenge and its solution.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Lessons Learned</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                What I learned from working on this project and how it helped me grow as a developer.
              </p>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}