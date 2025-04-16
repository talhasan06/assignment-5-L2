import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
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
        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: blog });
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
        
        const blog = await Blog.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        
        if (!blog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        
        res.status(200).json({ success: true, data: blog });
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
        
        const deletedBlog = await Blog.deleteOne({ _id: id });
        
        if (!deletedBlog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
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