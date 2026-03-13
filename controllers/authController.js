import { prisma } from '../lib/prisma.js';
import passport from '../config/passport.js'
import bcrypt from 'bcryptjs';

export const createUserGet = async (req, res, next) => {
	try {
		res.render('auth/sign-up-form');
	} catch (err) {
		next(err);
	}
};

export const createUserPost = async (req, res, next) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
};

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
			return next(err)
		}
		res.redirect('/');
	})
}
