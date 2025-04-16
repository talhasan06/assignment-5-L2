import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  // All operations in this endpoint require authentication
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  switch (method) {
    case 'GET':
      try {
        const message = await Message.findById(id);
        if (!message) {
          return res.status(404).json({ success: false, message: 'Message not found' });
        }
        res.status(200).json({ success: true, data: message });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'PUT':
      try {
        const message = await Message.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        
        if (!message) {
          return res.status(404).json({ success: false, message: 'Message not found' });
        }
        
        res.status(200).json({ success: true, data: message });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        const deletedMessage = await Message.deleteOne({ _id: id });
        
        if (!deletedMessage) {
          return res.status(404).json({ success: false, message: 'Message not found' });
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