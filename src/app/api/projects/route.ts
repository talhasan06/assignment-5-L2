import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Project from '../../../models/Project';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
      
    case 'POST':
      try {
        // Check if user is authenticated
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}