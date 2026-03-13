import upload from '../config/multer.js';
import { prisma } from '../lib/prisma.js';
import { getAllFolders } from './folderController.js';

export const fileUploadGet = async (req, res, next) => {
	try {
		const folders = await getAllFolders();
		res.render('file/uploadFile.ejs', {folders});
	} catch (err) {
		next(err);
	}
};

export const fileUploadPost = [
	upload.single('file'),
	async (req, res, next) => {
		try {
			const folder_id = Number(req.body.folder_id);
			const name = req.file.originalname;
			const size = req.file.size;
			const file_URL = req.file.path;
			await prisma.file.create({
				data: {
					file_URL,
					size,
					name,
					folder_id
				}
			})
			res.redirect('/')
		} catch (err) {
			next(err);
		}
	},
];

export const getAllFiles = async (folder_id) => {
    const files = await prisma.file.findMany({
        where: {
            folder_id
        }
    })
    return files
}

export const fileDeletePost = async (req, res, next) => {
	try {

	} catch(err ) {
		next(err)
	}
}
export const fileDownloadGet = async (req, res, next) => {
	try {

	} catch(err ) {
		next(err)
	}
}

export const fileEditGet = async (req, res, next) => {
	try {

	} catch(err ) {
		next(err)
	}
}

export const fileEditPost = async (req, res, next) => {
	try {

	} catch(err ) {
		next(err)
	}
}

export const fileInfoGet = async (req, res, next) => {
	try {

	} catch(err ) {
		next(err)
	}
}
