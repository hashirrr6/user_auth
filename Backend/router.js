import { Router } from "express";
import * as rh from "./reqhandler/reqhandler.js"
import auth from "./middleware/auth.js"
import Auth from "./middleware/auth.js";


const router=Router();
router.route("/adduser").post(rh.adduser);
router.route("/login").post(rh.loginUser);
router.route("/home").get(Auth,rh.home);

export default router;