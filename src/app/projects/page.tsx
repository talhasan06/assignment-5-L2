import { Metadata } from 'next';
import ProjectList from '@/components/project/ProjectList';
import { IProject } from '@/models/Project';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import PageTransition from '@/components/layout/PageTransition';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse the portfolio of projects by Your Name, a Full Stack Developer specializing in web applications.',
};

// This function runs at request time on the server
async function getProjects(): Promise<IProject[]> {
  await dbConnect();
  
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    
    // Convert MongoDB document to plain object and handle dates
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <PageTransition>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">My Projects</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through my recent projects. Each project represents a unique challenge 
            and demonstrates different skills and technologies from my toolkit.
          </p>
        </div>
        
        <ProjectList initialProjects={projects} />
      </PageTransition>
    </div>
  );
}