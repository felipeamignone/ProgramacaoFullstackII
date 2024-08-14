import { Router } from "express";
import UsersController from "../controllers/usersController";

const router = Router();
let ctrl = new UsersController();

router.get("/", ctrl.getAll);
router.post("/", ctrl.create);
router.delete("/:id", ctrl.delete);

export default router;
