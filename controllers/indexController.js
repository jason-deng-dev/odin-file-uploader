import { prisma } from '../lib/prisma.js';
import { body, validationResult } from 'express-validator';
import { getAllFiles } from '../controllers/fileController.js';
import { getAllFolders } from '../controllers/folderController.js';

export const indexGet = async (req, res, next) => {
    if (req.user) {
        const folders = await getAllFolders(req.user.id)
        res.render('index', {folders, styles: 'index.css', fileId: null})
    }　else {
        res.render('index', {styles: 'index.css', fileId: null})
    }
}

export const indexEditFileGet = async (req, res, next) => {
    const fileId = req.params.file_id;
    if (req.user) {
        const folders = await getAllFolders(req.user.id)
        res.render('index', {folders, styles: 'index.css', fileId})
    }　else {
        res.render('index', {styles: 'index.css', fileId: null})
    }
}