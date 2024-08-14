import { Router } from "express";
import UsersController from "../controllers/users";

const router = Router();
let ctrl = new UsersController();

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

router.post("/", ctrl.create);

router.patch("/:id", ctrl.update);

router.delete("/:id", ctrl.delete);

export default router;
