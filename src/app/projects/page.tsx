// app/projects/page.jsx
import { connectDB } from "@/mongodb/db";
import ProjectCard from "@/components/project/ProjectCard";
import Project from "@/models/Project";

export default async function ProjectsPage() {
  await connectDB();
  const projects = await Project.find();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}