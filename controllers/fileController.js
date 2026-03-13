import upload from "../config/multer.js";
import { prisma } from "../lib/prisma.js";
import { getAllFolders } from "./folderController.js";
import path from 'path'

export const fileUploadGet = async (req, res, next) => {
	try {
		const folders = await getAllFolders();
		res.render("file/uploadFile.ejs", { folders });
	} catch (err) {
		next(err);
	}
};

export const fileUploadPost = [
	upload.single("file"),
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
					folder_id,
				},
			});
			res.redirect("/");
		} catch (err) {
			next(err);
		}
	},
];

export const getAllFiles = async (folder_id) => {
	const files = await prisma.file.findMany({
		where: {
			folder_id,
		},
	});
	return files;
};

export const fileDeletePost = async (req, res, next) => {
	try {
		await prisma.file.delete({
			where: {
				id: Number(req.params.file_id),
			},
		});
		res.redirect("/");
	} catch (err) {
		next(err);
	}
};
export const fileDownloadGet = async (req, res, next) => {
	try {
		const file = await prisma.file.findUnique({
			where: { id: Number(req.params.file_id) }
		})
		const file_url = file.file_URL;
		const file_name = file.name;
		
		res.download(file_url, file_name, (err) => {
            if (err) next(err);
        });

	} catch (err) {
		next(err);
	}
};

export const fileEditGet = async (req, res, next) => {
	try {
	} catch (err) {
		next(err);
	}
};
export const fileEditPost = async (req, res, next) => {
	try {
	} catch (err) {
		next(err);
	}
};
export const fileInfoGet = async (req, res, next) => {
	try {
	} catch (err) {
		next(err);
	}
};
