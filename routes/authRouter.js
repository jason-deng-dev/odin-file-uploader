import { Router } from 'express';
import {
	createUserGet,
	createUserPost,
} from '../controllers/authController.js';

const authRouter = Router();

authRouter.get('/sign-up', createUserGet);

authRouter.post('/sign-up', createUserPost);

export default authRouter;
