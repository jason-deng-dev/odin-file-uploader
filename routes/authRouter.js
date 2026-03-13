import { Router } from 'express';
import {
	createUserGet,
	createUserPost,
    loginGet, logoutGet, loginPost
} from '../controllers/authController.js';


const authRouter = Router();

authRouter.get('/sign-up', createUserGet);
authRouter.post('/sign-up', createUserPost);
authRouter.get('/login', loginGet);
authRouter.post('/login',  loginPost);
authRouter.get('/logout', logoutGet)

export default authRouter;
