import express from 'express'
import path from 'node:path'
import indexRouter from './routes/indexRouter.js'

import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();


// setup for static assets
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));
// setup for EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// body parser for form POST
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

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
