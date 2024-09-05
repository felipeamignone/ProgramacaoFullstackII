import { Router } from "express";
import LoginController from "../controllers/login";

const router = Router();
let ctrl = new LoginController();

router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);

export default router;
