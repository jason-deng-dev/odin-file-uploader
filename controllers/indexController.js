import { prisma } from "../lib/prisma.js";
import { body, validationResult } from "express-validator";
import { getAllFiles } from "../controllers/fileController.js";
import { getAllFolders } from "../controllers/folderController.js";

// handle default behavior
const renderIndex = async (req, res, extras = {}) => {
    if (req.user) {
        const folders = await getAllFolders(req.user.id);
        res.render("index", { folders, styles: "index.css", findFileId: null, fileInfoId: null, ...extras });
    } else {
        res.render("index", { styles: "index.css", findFileId: null, fileInfoId: null, ...extras });
    }
};

export const indexGet = async (req, res, next) => {
    try {
        await renderIndex(req, res);
    } catch (err) { next(err); }
};

export const indexEditFileGet = async (req, res, next) => {
    try {
        await renderIndex(req, res, { findFileId: req.params.file_id });
    } catch (err) { next(err); }
};

export const indexFileInfoGet = async (req, res, next) => {
    try {
        await renderIndex(req, res, { fileInfoId: req.params.file_id });
    } catch (err) { next(err); }
};