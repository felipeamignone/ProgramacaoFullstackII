import { Request, Response } from "express";
import UserModel from "../models/user";
import { UserDTO } from "../types/user";
import UserType from "../models/userType";

export default class UsersController {
  async getAll(_, res: Response) {
    try {
      let user = new UserModel();
      let lista = await user.getAll();

      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (id) {
        const user = new UserModel({ id });
        const userFound = await user.getById();

        if (userFound) {
          res.status(200).json(userFound);
          return;
        }
      }
      res.status(404).json({ msg: "Usuário não encontrado" });
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }

  async create(req: Request<any, any, UserDTO>, res: Response) {
    try {
      const { name, email, active, psw, type } = req.body;

      if (name && email && active !== undefined && psw && type?.id) {
        let user = new UserModel({
          name,
          email,
          active,
          psw,
          type: new UserType(type),
        });
        const result = await user.create();

        if (!result) {
          throw new Error();
        }

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

  async update(req: Request<any, any, Partial<UserDTO>>, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, active, psw, type } = req.body;

      if (
        id &&
        (name ||
          email ||
          active !== undefined ||
          psw ||
          type?.id ||
          type?.description)
      ) {
        let user = new UserModel({
          id,
          name,
          email,
          active,
          psw,
          type: new UserType(type),
        });

        const userFound = await user.getById();

        if (!userFound) {
          res.status(404).json({ msg: "Usuário não encontrado" });
          return;
        }

        const result = await user.update();

        if (!result) {
          throw new Error();
        }

        res.status(200).json({ msg: "Usuário atualizado com sucesso!" });
        return;
      }

      res.status(400).json({ msg: "Dados inválidos" });
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (id) {
        let user = new UserModel({ id });

        const userFound = await user.getById();

        if (!userFound) {
          res.status(404).json({ msg: "Usuário não encontrado" });
          return;
        }

        const result = await user.delete();

        if (!result) {
          throw new Error();
        }

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
