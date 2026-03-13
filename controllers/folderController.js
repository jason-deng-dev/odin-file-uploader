import { prisma } from '../lib/prisma.js';
import { body, validationResult } from 'express-validator';

export const folderCreateGet = async (req, res, next) => {
	try {
		res.render('folder/createFolder.ejs');
	} catch (err) {
		next(err);
	}
};

const validateCreateFolder = [body('')];

export const folderCreatePost = async (req, res, next) => {
	try {
		await prisma.folder.create({
			data: {
				name: req.body.name,
				ownerId: req.user.id,
			},
		});
		res.redirect('/folder/create');
	} catch (err) {
		next(err);
	}
};

export const getAllFolders = async (user_id) => {
	const folders = await prisma.folder.findMany({
		where: {
			ownerId: user_id,
		},
		include: { files: true },
	});
	return folders;
};
