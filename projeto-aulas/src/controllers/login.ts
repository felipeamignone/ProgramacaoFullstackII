import { Request, Response } from "express";
import UserModel from "../models/user";
import { generateToken } from "../middlewares";

export default class LoginController {
  async login(req: Request, res: Response) {
    try {
      const { email, psw } = req.body;

      if (email && psw) {
        const model = new UserModel({ email, psw });

        const result = await model.getByLogin();

        if (!result) {
          res.status(404).json({ msg: "Email e/ou senha incorreto(s)" });
          return;
        }

        if (!(result.id && result.name && result.email && result.type?.id)) {
          throw new Error();
        }

        const token = generateToken(
          result.id,
          result.name,
          result.email,
          result.type?.id
        );

        res.cookie("token", token, {
          httpOnly: true,
        });

        res.status(200).json({ msg: "Usuário autenticado!" });
        return;
      }

      res.status(400).json({ msg: "Dados inválidos!" });
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }
}
