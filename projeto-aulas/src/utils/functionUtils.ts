import { UserDB } from "../types/user";
import UserModel from "../models/user";
import UserType from "../models/userType";

export const mapUserDBToModel = (row: UserDB): UserModel =>
  new UserModel({
    id: row.usu_id,
    name: row.usu_nome,
    email: row.usu_email,
    active: Boolean(row.usu_ativo),
    psw: row.usu_senha,
    type: new UserType({
      id: row.per_id,
      description: row.per_descricao,
    }),
  });
