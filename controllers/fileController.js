import upload from '../config/multer.js';

export const fileUploadGet = async (req, res, next) => {
	try {
		res.render('file/upload.ejs');
	} catch (err) {
		next(err);
	}
};

export const fileUploadPost = [
	upload.single('file'),
	async (req, res, next) => {
		try {
			const fileName = req.file.originalname;
			const fileSize = req.file.size;
		} catch (err) {
			next(err);
		}
	},
];
