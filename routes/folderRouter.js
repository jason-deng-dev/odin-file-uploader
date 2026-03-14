import { Router } from 'express';
import {
    folderCreateGet, folderCreatePost, folderDeletePost, folderEditPost
} from '../controllers/folderController.js';

import { ensureLoggedIn } from '../config/auth.js';

const folderRouter = Router()

folderRouter.get('/create', ensureLoggedIn, folderCreateGet)
folderRouter.post('/create', ensureLoggedIn, folderCreatePost)

folderRouter.post('/delete/:id', folderDeletePost)
folderRouter.post('/edit/:id', folderEditPost)

export default folderRouter;