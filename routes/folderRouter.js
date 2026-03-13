import { Router } from 'express';
import {
    folderCreateGet, folderCreatePost
} from '../controllers/folderController.js';

import { ensureLoggedIn } from '../config/auth.js';

const folderRouter = Router()

folderRouter.get('/create', ensureLoggedIn, folderCreateGet)
folderRouter.post('/create', ensureLoggedIn, folderCreatePost)

export default folderRouter;