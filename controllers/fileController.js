import upload from "../config/multer.js";
import { prisma } from "../lib/prisma.js";
import { getAllFolders } from "./folderController.js";
import "dotenv/config";
import supabase from "../config/supabase.js";
import { check, validationResult } from "express-validator";

export const fileUploadGet = async (req, res, next) => {
	try {
		const folders = await getAllFolders();
		res.render("file/uploadFile.ejs", { folders });
	} catch (err) {
		next(err);
	}
};

const validateUploadFile = [
	check("file")
		.custom((value, { req }) => {
			if (!req.file) throw new Error("File is required");
			if (req.file.size > 10 * 1024 * 1024)
				throw new Error("File too large (max 10MB)");
			const notAllowed = [
				"application/x-msdownload", // .exe
			];
			if (notAllowed.includes(req.file.mimetype))
				throw new Error(".exe file type not allowed");
			return true;
		})
		.custom(async (value, { req }) => {
			const folderId = Number(req.body.folder_id);
			const fileFound =
				null !=
				(await prisma.file.findFirst({
					where: { name: value, folder_id: folderId },
				}));
			if (fileFound) {
				throw new Error("File name taken");
			}
			return true;
		}),
];

export const fileUploadPost = [
	upload.single("file"),
	validateUploadFile,
	async (req, res, next) => {
		const errors = validationResult(req);
		const folders = await getAllFolders();
		if (!errors.isEmpty()) {
			return res.status(400).render("file/uploadFile.ejs", {
				folders,
				title: "upload file",
				errors: errors.array(),
			});
		}
		try {
			const folder_id = Number(req.body.folder_id);
			const name = req.file.originalname;
			const size = req.file.size;

			// store file information in prisma
			const newFile = await prisma.file.create({
				data: {
					file_URL: "",
					size,
					name,
					folder_id,
				},
			});

			const file_URL = `uploads/${newFile.id}`;

			// pass buffer directly to supabase
			const { data, error } = await supabase.storage
				.from(process.env.SUPABASE_BUCKET)
				.upload(`uploads/${newFile.id}`, req.file.buffer);

			if (error) {
				prisma.file.delete({
					where: { id: newFile.id },
				});
				throw error;
			}

			await prisma.file.update({
				where: { id: newFile.id },
				data: { file_URL },
			});

			res.redirect("/");
		} catch (err) {
			next(err);
		}
	},
];

export const fileDownloadGet = async (req, res, next) => {
	try {
		const file = await prisma.file.findUnique({
			where: { id: Number(req.params.file_id) },
			include: { folder: true },
		});

		if (file.folder.ownerId != req.user.id) {
			return res.status(403).send("Forbidden");
		}

		const file_url = `uploads/${file.id}`;
		const file_name = file.name;

		// fetches the file and gives you back a Blob
		const { data: fileData, error } = await supabase.storage
			.from(process.env.SUPABASE_BUCKET)
			.download(file_url);

		if (error) {
			throw error;
		}
		// converts that Blob into raw binary data
		const buffer = await fileData.arrayBuffer();

		// Content-Disposition: tells the browser to treat it as a download rather than display it
		res.setHeader("Content-Disposition", `attachment; filename="${file_name}"`);

		// Buffer.from(): wraps it in a Node.js Buffer so Express can send it
		res.send(Buffer.from(buffer));
	} catch (err) {
		next(err);
	}
};

export const fileDeletePost = async (req, res, next) => {
	try {
		const file = await prisma.file.findUnique({
			where: { id: Number(req.params.file_id) },
			include: { folder: true },
		});

		if (file.folder.ownerId != req.user.id) {
			return res.status(403).send("Forbidden");
		}

		const file_url = `uploads/${file.id}`;
		await supabase.storage.from(process.env.SUPABASE_BUCKET).remove([file_url]);
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

export const getAllFiles = async (folder_id) => {
	const files = await prisma.file.findMany({
		where: {
			folder_id,
		},
	});
	return files;
};

export const fileEditPost = async (req, res, next) => {
	try {
		const file = await prisma.file.findUnique({
			where: { id: Number(req.params.file_id) },
			include: { folder: true },
		});

		if (file.folder.ownerId != req.user.id) {
			return res.status(403).send("Forbidden");
		}
		await prisma.file.update({
			where: { id: Number(req.params.file_id) },
			data: { name: req.body.name },
		});
		res.redirect("/");
	} catch (err) {
		next(err);
	}
};
