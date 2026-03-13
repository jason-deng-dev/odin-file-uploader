import { Router } from 'express';
import * as indexController from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', (req, res, send) => {
    res.render('index')
})

export default indexRouter;