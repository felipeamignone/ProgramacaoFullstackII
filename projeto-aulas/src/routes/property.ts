import { Router } from "express";
import PropertyController from "../controllers/property";

const router = Router();
let ctrl = new PropertyController();

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

router.post("/", ctrl.create);

router.patch("/:id", ctrl.update);

//router.delete("/:id", ctrl.delete);

export default router;
