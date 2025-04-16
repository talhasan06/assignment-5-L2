import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Card, { CardImage, CardBody, CardTitle, CardText, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import axios from 'axios';
import { IProject } from '../../models/Project';
import { motion } from 'framer-motion';

interface FeaturedProjectsProps {
  initialProjects?: IProject[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ initialProjects = [] }) => {
  const [projects, setProjects] = useState<IProject[]>(initialProjects);
  const [loading, setLoading] = useState(initialProjects.length === 0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialProjects.length === 0) {
      fetchProjects();
    }
  }, [initialProjects.length]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      const featuredProjects = response.data.data.filter((project: IProject) => project.featured);
      setProjects(featuredProjects.slice(0, 3)); // Get only the first 3 featured projects
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch projects');
      setLoading(false);
      console.error(err);
      
      // Use static projects as fallback
      setProjects(staticProjects);
    }
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  // Fallback to static projects if no featured projects are found
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
    },
  ];

  const displayProjects = projects.length > 0 ? projects : staticProjects;

  return (
    <motion.section 
      className="py-16 bg-gray-50 dark:bg-gray-800"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Check out some of my recent work. These projects showcase my skills and experience.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div 
              key={project._id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card hoverEffect className="h-full flex flex-col bg-white dark:bg-gray-700">
                <CardImage 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="h-48"
                />
                <CardBody className="flex-grow">
                  <CardTitle className="text-gray-900 dark:text-white">{project.title}</CardTitle>
                  <CardText className="mb-4 text-gray-700 dark:text-gray-300">{project.description}</CardText>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-xs text-gray-700 dark:text-gray-300">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-xs text-gray-700 dark:text-gray-300">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </CardBody>
                <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-800">
                  <Link href={`/projects/${project._id}`}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">View Details</Button>
                  </Link>
                  <div className="flex gap-2">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      aria-label="GitHub Repository"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      aria-label="Live Demo"
                    >
                      <FaExternalLinkAlt size={20} />
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <Link href="/projects">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
              View All Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedProjects;