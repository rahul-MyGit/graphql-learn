import { Request, Response } from 'express';

export const meController = async (req: Request, res: Response) => {
    try {
        res.json({
          message: 'This is a protected route',
          user: req.user
        });
      } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}