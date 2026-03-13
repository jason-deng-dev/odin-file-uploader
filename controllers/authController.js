import { prisma } from '../lib/prisma.js';
import passport from '../config/passport.js';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

export const createUserGet = async (req, res, next) => {
	try {
		res.render('auth/sign-up-form');
	} catch (err) {
		next(err);
	}
};

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';
const emptyErr = 'is required.';

const validateSignUp = [
	body('username')
		.trim()
		.notEmpty()
		.withMessage(`Username ${emptyErr}`)
		.custom(async (value, { req }) => {
			const foundUser = await prisma.user.findUnique({
				where: {username: req.body.username},
			})
			if (foundUser) {
				throw new Error('Username taken');
			}
			return true;
		}),
	body('password')
		.trim()
		.notEmpty()
		.withMessage(`Password ${emptyErr}`),
];

export const createUserPost = [
	validateSignUp,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('auth/sign-up-form', {
				title: 'Create user',
				errors: errors.array(),
			});
		}
		try {
			const hashedPassword = await bcrypt.hash(
				req.body.password,
				10,
			);
			await prisma.user.create({
				data: {
					username: req.body.username,
					password: hashedPassword,
				},
			});
			res.redirect('/');
			console.log('created user' + `${req.body.username}`);
		} catch (err) {
			next(err);
		}
	},
];

export const loginGet = async (req, res, next) => {
	try {
		res.render('auth/log-in-form');
	} catch (err) {
		next(err);
	}
};

export const logoutGet = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
};
