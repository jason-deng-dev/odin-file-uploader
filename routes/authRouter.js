import { Router } from 'express';
import {
	createUserGet,
	createUserPost,
    loginGet
} from '../controllers/authController.js';
import passport from '../config/passport.js'

const authRouter = Router();

authRouter.get('/sign-up', createUserGet);
authRouter.post('/sign-up', createUserPost);
authRouter.get('/login', loginGet);
authRouter.post('/login',  passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
}));

export default authRouter;
