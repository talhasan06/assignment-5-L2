import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaStar, FaRegStar, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import Button from '../ui/Button';
import ProjectForm from '../project/ProjectForm';
import { IProject } from '../../models/Project';

const ProjectManagement = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/projects');
      setProjects(response.data.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    setSelectedProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project: IProject) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
      setError('Failed to delete project. Please try again later.');
    }
  };

  const toggleFeatured = async (project: IProject) => {
    try {
      const updatedProject = {
        ...project,
        featured: !project.featured
      };
      
      await axios.put(`/api/projects/${project._id}`, updatedProject);
      
      setProjects(projects.map(p => 
        p._id === project._id ? { ...p, featured: !p.featured } : p
      ));
    } catch (err) {
      console.error('Failed to update project:', err);
      setError('Failed to update project. Please try again later.');
    }
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      if (selectedProject) {
        // Update existing project
        await axios.put(`/api/projects/${selectedProject._id}`, data);
        setProjects(projects.map(project => 
          project._id === selectedProject._id ? { ...project, ...data } : project
        ));
      } else {
        // Create new project
        const response = await axios.post('/api/projects', data);
        setProjects([response.data.data, ...projects]);
      }
      
      setShowForm(false);
      setSelectedProject(null);
    } catch (err) {
      console.error('Failed to save project:', err);
      setError('Failed to save project. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && projects.length === 0) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  if (showForm) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          {selectedProject ? 'Edit Project' : 'Create New Project'}
        </h2>
        <ProjectForm 
          project={selectedProject || undefined} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Manage Projects</h2>
          <p className="text-gray-600">Create, edit, and delete your portfolio projects.</p>
        </div>
        <Button onClick={handleCreateProject} className="flex items-center">
          <FaPlus className="mr-2" /> Add New Project
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredProjects.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searchTerm 
              ? "No projects found matching your search." 
              : "No projects yet. Click 'Add New Project' to create one."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technologies
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{project.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {project.description.length > 100 
                              ? `${project.description.substring(0, 100)}...` 
                              : project.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 text-xs bg-gray-200 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleFeatured(project)}
                        className="text-yellow-500 hover:text-yellow-600"
                        title={project.featured ? "Remove from featured" : "Add to featured"}
                      >
                        {project.featured ? (
                          <FaStar size={20} />
                        ) : (
                          <FaRegStar size={20} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit project"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete project"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;