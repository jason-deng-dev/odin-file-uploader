import { Router } from 'express';
import * as indexController from '../controllers/indexController.js';
import { getAllFiles } from '../controllers/fileController.js';
import { getAllFolders } from '../controllers/folderController.js';

const indexRouter = Router();

indexRouter.get('/', async (req, res, next) => {
    if (req.user) {
        const folders = await getAllFolders(req.user.id)
        res.render('index', {folders, styles: 'index.css'})
    }　else {
        res.render('index', {styles: 'index.css'})
    }
})

export default indexRouter;