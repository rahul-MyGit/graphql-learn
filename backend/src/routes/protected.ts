import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { meController } from '../controller/user.controller';

const router = Router();

router.get('/profile', authMiddleware, meController);

export { router as protectedRouter };