import { Router } from "express";
import LoginController from "../controllers/login";

const router = Router();
let ctrl = new LoginController();

router.post("/", ctrl.login);

export default router;
