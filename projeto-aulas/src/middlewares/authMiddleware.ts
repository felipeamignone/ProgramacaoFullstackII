import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";

const SECRET_KEY = "A1S2D3F4G5@123";

export const validateUserByKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.token === SECRET_KEY) {
    next();
  }

  res.status(401).json({ msg: "Não autorizado!" });
};

interface JWTPayload {
  userId: string;
  userName: string;
  userEmail: string;
  userTypeId: string;
}

export const validateUserByToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const jwtPayload = jwt.verify(token, SECRET_KEY);
      const user = new UserModel({ id: (jwtPayload as JWTPayload).userId });

      const foundUser = await user.getById();

      if (!foundUser?.active) {
        res.status(401).json({ msg: "Não autorizado!" });
      }

      if (
        !(
          foundUser?.id &&
          foundUser?.name &&
          foundUser?.email &&
          foundUser?.type?.id
        )
      ) {
        throw new Error();
      }

      const newToken = generateToken(
        foundUser.id,
        foundUser.name,
        foundUser.email,
        foundUser.type.id
      );

      res.cookie("token", newToken);

      next();
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
    return;
  }

  res.status(401).json({ msg: "Não autorizado!" });
};

export const generateToken = (
  userId: string,
  userName: string,
  userEmail: string,
  userTypeId: string
) =>
  jwt.sign({ userId, userName, userEmail, userTypeId }, SECRET_KEY, {
    expiresIn: 60,
  });
