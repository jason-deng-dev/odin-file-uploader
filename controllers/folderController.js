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

const validateCreateFolder = [
	body("name")
		.notEmpty()
		.withMessage("File name is required")
		.custom(async (value, {req}) => {
			const folderFound =
				null !=
				(await prisma.folder.findFirst({
					where: { name: value, ownerId: req.user.id},
				}));
			if (folderFound) {
				throw new Error("File name taken");
			}
			return true;
		}),
];

export const folderCreatePost = [
	validateCreateFolder,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("folder/createFolder.ejs", {
				title: "Create Folder",
				errors: errors.array(),
			});
		}
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
	},
];

async (req, res, next) => {
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
		const folderId = Number(req.params.id);
		const folder = await prisma.folder.findUnique({
			where: { id: folderId },
		});
		if (folder.ownerId != req.user.id) {
			return res.status(403).send("Forbidden");
		}

		// delete all files from folder
		const filesToDelete = await prisma.file.findMany({
			where: { folder_id: Number(folderId) },
		});

		await Promise.all(
			filesToDelete.map((file) => {
				const file_url = `uploads/${file.id}`;
				return supabase.storage
					.from(process.env.SUPABASE_BUCKET)
					.remove([file_url]);
			}),
		);

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
		const folderId = Number(req.params.id);
		const folder = await prisma.file.findUnique({
			where: { id: folderId },
		});
		if (folder.ownerId != req.user.id) {
			return res.status(403).send("Forbidden");
		}

		await prisma.folder.update({
			where: { id: Number(folderId) },
			data: { name: req.body.name },
		});

		res.redirect("/");
	} catch (err) {
		next(err);
	}
};
