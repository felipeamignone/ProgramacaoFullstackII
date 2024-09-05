import { Request, Response } from "express";
import UserModel from "../models/user";
import { UserDTO } from "../types/user";
import UserType from "../models/userType";
import PropertyModel from "../models/property";
import { PropertyDTO } from "../types/property";

export default class PropertyController {
  async getAll(_, res: Response) {
    try {
      let property = new PropertyModel();
      let list = await property.getAll();

      if (!list) {
        res.status(404).json({ msg: "Imóvel não encontrado" });
        return;
      }

      res.status(200).json(list);
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
        let property = new PropertyModel({ id });
        const propertyFound = await property.getById();

        if (propertyFound) {
          res.status(200).json(propertyFound);
          return;
        }
      }
      res.status(404).json({ msg: "Imóvel não encontrado" });
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }

  create(req: Request<any, any, PropertyDTO>, res: Response) {
    try {
      const {
        description,
        address,
        city,
        district,
        zipCode,
        price,
        available,
      } = req.body;

      if (
        description &&
        address &&
        city &&
        district &&
        zipCode &&
        price &&
        available
      ) {
        let property = new PropertyModel({
          description,
          address,
          city,
          district,
          zipCode,
          price,
          available,
        });
        const result = property.create();

        if (!result) {
          throw new Error();
        }

        res.status(200).json({ msg: "Imóvel criado com sucesso!" });
        return;
      }

      res.status(400).json({ msg: "Dados inválidos" });
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }

  async update(req: Request<any, any, Partial<PropertyDTO>>, res: Response) {
    try {
      const { id } = req.params;
      const {
        description,
        address,
        city,
        district,
        zipCode,
        price,
        available,
      } = req.body;

      if (
        id &&
        (description ||
          address ||
          city ||
          district ||
          zipCode ||
          price ||
          available)
      ) {
        let property = new PropertyModel({
          description,
          address,
          city,
          district,
          zipCode,
          price,
          available,
        });

        const propertyFound = await property.getById();

        if (!propertyFound) {
          res.status(404).json({ msg: "Usuário não encontrado" });
          return;
        }

        const result = await property.update();

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
