import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import 'dotenv/config';

const app = express();

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// routers
import indexRouter from './routes/indexRouter.js';
import authRouter from './routes/authRouter.js';

// Authentication setup
import session from 'express-session';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
app.use(
	session({
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000, // ms
		},
		secret: 'secretkey',
		resave: true,
		saveUninitialized: true,
		store: new PrismaSessionStore(prisma, {
			checkPeriod: 2 * 60 * 1000, //ms
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	}),
);

import passport from './config/passport.js'
app.use(passport.session());

// will have access to the currentUser variable in all of your views
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});



app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('ERROR');
});

const PORT = 3000;
app.listen(PORT, (error) => {
	if (error) {
		throw error;
	}
	console.log(
		`My first Express app - listening on port ${PORT}!`,
	);
});
