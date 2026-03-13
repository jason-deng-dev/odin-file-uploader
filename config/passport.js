import passport from 'passport'
import * as db from '../db/queries.js';
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from "bcryptjs"

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await db.getUserByUsername(username);
			if (!user) {
				return done(null, false, {
					message: 'Incorrect username',
				});
			}

            const match = await bcrypt.compare(password, user.password);
			if (!match) {
				return done(null, false, {
					message: 'Incorrect password',
				});
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	}),
);