import { Router } from 'express';
import * as authController from '../controllers/indexController.js';

const authRouter = Router();

authRouter.get('/sign-up', (req, res, send) =>
	res.render('sign-up-form'),
);

export default authRouter;
