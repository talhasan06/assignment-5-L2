import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Skills from '@/components/home/Skills';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import { IProject } from '@/models/Project';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import PageTransition from '@/components/layout/PageTransition';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Personal portfolio and blog of Your Name, a Full Stack Developer specializing in Next.js, React, Node.js, and MongoDB',
};

async function getFeaturedProjects(): Promise<IProject[]> {
  await dbConnect();
  
  try {
    const featuredProjects = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    
    // Convert MongoDB document to plain object and handle dates
    return JSON.parse(JSON.stringify(featuredProjects));
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();
  
  return (
    <PageTransition>
      <Hero />
      <Skills />
      <FeaturedProjects initialProjects={featuredProjects} />
    </PageTransition>
  );
}