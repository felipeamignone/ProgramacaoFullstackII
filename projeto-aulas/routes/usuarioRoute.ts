import express from "express";
import UsuarioController from "../controllers/usuarioController.ts";

const router = express.Router();
let ctrl = new UsuarioController();

router.get("/", ctrl.listar);
router.post("/", ctrl.gravar);
router.delete("/:id", ctrl.deletar);

export default router;
