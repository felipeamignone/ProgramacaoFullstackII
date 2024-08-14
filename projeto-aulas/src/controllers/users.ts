import { Request, Response } from "express";
import UserModel from "../models/user";
import { User } from "../types/user";

export default class UsersController {
  getAll(_, res: Response) {
    try {
      let user = new UserModel();
      let lista = user.getAll();

      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }

  create(req: Request<any, any, User>, res: Response) {
    try {
      const { id, name, email, city, uf } = req.body;

      if (id && name && email && city && uf) {
        let user = new UserModel();
        user.create({ id, name, email, city, uf });

        res.status(200).json({ msg: "Usuário criado com sucesso!" });
        return;
      }

      res.status(400).json({ msg: "Dados inválidos" });
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }

  delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (id) {
        let user = new UserModel();
        user.delete(Number(id));

        res.status(200).json({ msg: "Usuário deletado com sucesso!" });
        return;
      }

      res.status(400).json({ msg: "Dados inválidos" });
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }
}
