import { Router } from 'express';
import * as indexController from '../controllers/indexController.js';
import { indexGet, indexEditFileGet, indexFileInfoGet, indexEditFolderGet} from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', indexGet)

indexRouter.get('/editFile/:file_id', indexEditFileGet)
indexRouter.get('/fileInfo/:file_id', indexFileInfoGet)
indexRouter.get('/editFolder/:folder_id', indexEditFolderGet)

export default indexRouter;