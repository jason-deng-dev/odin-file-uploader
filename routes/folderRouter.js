import { Router } from "express";
import {
	folderCreateGet,
	folderCreatePost,
	folderDeletePost,
	folderEditPost,
} from "../controllers/folderController.js";

import { ensureLoggedIn } from "../config/auth.js";

const folderRouter = Router();

folderRouter.get("/create", ensureLoggedIn, folderCreateGet);
folderRouter.post("/create", ensureLoggedIn, folderCreatePost);

folderRouter.post("/delete/:id", ensureLoggedIn, folderDeletePost);
folderRouter.post("/edit/:id", ensureLoggedIn, folderEditPost);

export default folderRouter;
