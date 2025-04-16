import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import { IProject } from '../../models/Project';
import { motion } from 'framer-motion';

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface ProjectListProps {
  initialProjects?: IProject[];
}

// Fallback static projects in case API fails
const staticProjects = [
  {
    _id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform built with Next.js, React, Node.js, and MongoDB.',
    imageUrl: 'https://via.placeholder.com/600x400?text=E-commerce+Platform',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: 'Task Management App',
    description: 'A task management application with drag-and-drop functionality, user authentication, and real-time updates.',
    imageUrl: 'https://via.placeholder.com/600x400?text=Task+Management+App',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    technologies: ['React', 'Firebase', 'Material-UI', 'React DnD'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    title: 'Weather Dashboard',
    description: 'A weather dashboard that displays current weather and forecasts for multiple locations.',
    imageUrl: 'https://via.placeholder.com/600x400?text=Weather+Dashboard',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    technologies: ['React', 'Redux', 'OpenWeather API', 'Chart.js'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    title: 'Social Media App',
    description: 'A social media application with real-time chat, news feed, and user profiles.',
    imageUrl: 'https://via.placeholder.com/600x400?text=Social+Media+App',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5',
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing projects and skills.',
    imageUrl: 'https://via.placeholder.com/600x400?text=Portfolio+Website',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '6',
    title: 'Recipe App',
    description: 'A recipe application with search functionality, user-submitted recipes, and meal planning.',
    imageUrl: 'https://via.placeholder.com/600x400?text=Recipe+App',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redux'],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

const ProjectList: React.FC<ProjectListProps> = ({ initialProjects = [] }) => {
  const [projects, setProjects] = useState<IProject[]>(initialProjects);
  const [loading, setLoading] = useState(initialProjects.length === 0);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // If no initialProjects provided, fetch them
    if (initialProjects.length === 0) {
      fetchProjects();
    }
  }, [initialProjects.length]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      if (response.data.data.length > 0) {
        setProjects(response.data.data);
      } else {
        // Use static projects if API returns empty array
        setProjects(staticProjects);
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      // Fallback to static projects if API fails
      setProjects(staticProjects);
      setError('Failed to fetch projects from API, showing example projects.');
      setLoading(false);
    }
  };

  // Get all unique technologies from projects
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  ).sort();

  // Filter projects based on selected filter and search term
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.technologies.includes(filter);
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Loading projects...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      <motion.div 
        className="mb-8"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="md:w-1/3">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-2/3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === tech
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div 
          className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-600 text-yellow-700 dark:text-yellow-200 p-4 mb-6" 
          role="alert"
          variants={itemVariants}
        >
          <p>{error}</p>
        </motion.div>
      )}

      {filteredProjects.length === 0 ? (
        <motion.div 
          className="text-center py-8"
          variants={itemVariants}
        >
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm 
              ? "No projects found matching your search." 
              : "No projects found matching your criteria."}
          </p>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProjectList;