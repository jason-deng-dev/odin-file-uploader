import { Router } from 'express';
import {
	fileUploadGet, fileUploadPost, fileDeletePost, fileDownloadPost, fileEditPost
} from '../controllers/fileController.js';

import { ensureLoggedIn } from '../config/auth.js';

const fileRouter = Router()

fileRouter.get('/upload', ensureLoggedIn, fileUploadGet)
fileRouter.post('/upload', ensureLoggedIn, fileUploadPost)

fileRouter.post('/delete/:file_id', fileDeletePost)
fileRouter.post('/download/:file_id', fileDownloadPost)
fileRouter.post('/edit/_file_id', fileEditPost)

export default fileRouter;