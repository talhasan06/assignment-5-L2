import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// This API route allows users to store their theme preference
// It's an example of a simple Next.js API route that uses authentication
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  // Get the user's session to check authentication
  const session = await getSession({ req });
  
  switch (method) {
    case 'GET':
      // Public route - anyone can get the theme
      try {
        // In a real app, you might fetch this from a database based on the user
        res.status(200).json({ 
          success: true, 
          data: { theme: 'light' } 
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
      
    case 'POST':
      // Protected route - only authenticated users can update their theme
      if (!session) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      
      try {
        const { theme } = req.body;
        
        if (!theme || (theme !== 'light' && theme !== 'dark')) {
          return res.status(400).json({ 
            success: false, 
            message: 'Invalid theme value. Must be "light" or "dark".' 
          });
        }
        
        // In a real app, you'd store this in a database
        // Example: await User.findByIdAndUpdate(session.user.id, { theme });
        
        res.status(200).json({ 
          success: true, 
          data: { theme } 
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
      
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}