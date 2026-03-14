import { Router } from 'express';
import {
	fileUploadGet,
	fileUploadPost,
	fileDeletePost,
	fileEditPost,
	fileDownloadGet,
	fileInfoGet,
} from '../controllers/fileController.js';

import { ensureLoggedIn } from '../config/auth.js';

const fileRouter = Router();

fileRouter.get('/upload', ensureLoggedIn, fileUploadGet);
fileRouter.post('/upload', ensureLoggedIn, fileUploadPost);

fileRouter.post('/delete/:file_id', fileDeletePost);
fileRouter.post('/edit/:file_id', fileEditPost);
fileRouter.get('/info/:file_id', fileInfoGet);

export default fileRouter;
