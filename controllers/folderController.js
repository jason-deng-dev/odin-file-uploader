import { prisma } from "../lib/prisma.js";
import { body, validationResult } from "express-validator";
import supabase from "../config/supabase.js";
import "dotenv/config";


export const folderCreateGet = async (req, res, next) => {
	try {
		res.render("folder/createFolder.ejs");
	} catch (err) {
		next(err);
	}
};

const validateCreateFolder = [body("")];

export const folderCreatePost = async (req, res, next) => {
	try {
		await prisma.folder.create({
			data: {
				name: req.body.name,
				ownerId: req.user.id,
			},
		});
		res.redirect("/");
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

export const folderDeletePost = async (req, res, next) => {
	try {
		const folderId = req.params.id;
		// delete all files from folder
		const filesToDelete = await prisma.file.findMany({
			where: {folder_id: Number(folderId)}
		})
		
		await Promise.all(
			filesToDelete.map(file => {
				const file_url = file.file_URL.split('/').slice(-2).join('/');
				return supabase.storage.from(process.env.SUPABASE_BUCKET).remove([file_url]);
			})	
		)

		await prisma.folder.delete({
			where: { id: Number(folderId) },
		});

		res.redirect("/");
	} catch (err) {
		next(err);
	}
};

export const folderEditPost = async (req, res, next) => {
	try {
		const folderId = req.params.id;

		await prisma.folder.update({
			where: { id: Number(folderId) },
			data: { name: req.body.name },
		});

		res.redirect("/");
	} catch (err) {
		next(err);
	}
};
