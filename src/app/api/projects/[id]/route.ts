import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const project = await Project.findById(id);
        if (!project) {
          return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'PUT':
      try {
        // Check if user is authenticated
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        
        const project = await Project.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        
        if (!project) {
          return res.status(404).json({ success: false, message: 'Project not found' });
        }
        
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        // Check if user is authenticated
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        
        const deletedProject = await Project.deleteOne({ _id: id });
        
        if (!deletedProject) {
          return res.status(404).json({ success: false, message: 'Project not found' });
        }
        
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}