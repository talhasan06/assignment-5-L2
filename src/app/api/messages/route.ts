import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Message from '../../../models/Message';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // Check if user is authenticated for viewing messages
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        
        const messages = await Message.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: messages });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
      
    case 'POST':
      try {
        // For contact form submission, no authentication required
        const message = await Message.create(req.body);
        res.status(201).json({ success: true, data: message });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}