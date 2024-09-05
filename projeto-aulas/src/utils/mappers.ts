import { UserDB } from "../types/user";
import UserModel from "../models/user";
import UserType from "../models/userType";
import { PropertyDB } from "../types/property";
import PropertyModel from "../models/property";

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

export const mapPropertyDBToModel = (row: PropertyDB): PropertyModel =>
  new PropertyModel({
    id: row.imv_id,
    description: row.imv_descricao,
    zipCode: row.imv_cep,
    address: row.imv_endereco,
    district: row.imv_bairro,
    city: row.imv_cidade,
    price: row.imv_valor,
    available: row.imv_disponivel === "S" || row.imv_disponivel === "s",
  });
