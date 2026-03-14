import { Router } from 'express';
import * as indexController from '../controllers/indexController.js';
import { indexGet, indexEditFileGet, indexFileInfoGet } from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', indexGet)

indexRouter.get('/editFile/:file_id', indexEditFileGet)
indexRouter.get('/fileInfo/:file_id', indexFileInfoGet)

export default indexRouter;