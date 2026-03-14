import { Router } from 'express';
import {
	fileUploadGet,
	fileUploadPost,
	fileDeletePost,
	fileEditPost,
	fileDownloadGet,
} from '../controllers/fileController.js';

import { ensureLoggedIn } from '../config/auth.js';

const fileRouter = Router();

fileRouter.get('/upload', ensureLoggedIn, fileUploadGet);
fileRouter.post('/upload', ensureLoggedIn, fileUploadPost);
fileRouter.post('/delete/:file_id',ensureLoggedIn,  fileDeletePost);
fileRouter.post('/edit/:file_id',ensureLoggedIn,  fileEditPost);


fileRouter.get('/download/:file_id', fileDownloadGet);

export default fileRouter;
