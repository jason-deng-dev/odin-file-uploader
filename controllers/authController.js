import { prisma } from '../lib/prisma.js';

export const createUserGet = async (req, res, next) => {
	try {
		res.render('auth/sign-up-form');
	} catch (err) {
		next(err);
	}
};

export const createUserPost = async (req, res, next) => {
	try {
		await prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
            }
        })
        res.redirect('/')
        console.log('created user' + `${req.body.username}`)
	} catch (err) {
		next(err);
	}
};
