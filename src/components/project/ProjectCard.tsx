import React from 'react';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Card, { CardImage, CardBody, CardTitle, CardText, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { IProject } from '../../models/Project';

interface ProjectCardProps {
  project: IProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card hoverEffect className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-lg">
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
            <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-700">
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
  );
};

export default ProjectCard;