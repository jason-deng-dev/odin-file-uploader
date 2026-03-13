import { Router } from 'express';
import {
	fileUploadGet, fileUploadPost
} from '../controllers/fileController.js';

import { ensureLoggedIn } from '../config/auth.js';

const fileRouter = Router()

fileRouter.get('/upload', ensureLoggedIn, fileUploadGet)
fileRouter.post('/upload', ensureLoggedIn, fileUploadPost)

export default fileRouter;