import { Router } from 'express';
import { signupController } from '../controller/auth.controller';
import { loginController } from '../controller/auth.controller';

const router = Router();

router.post('/signup', signupController);

router.post('/login', loginController);

export { router as authRouter }; 