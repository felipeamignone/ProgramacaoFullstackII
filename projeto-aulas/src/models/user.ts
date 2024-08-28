import { UserDTO, UserDB, UserTypeDB } from "../types/user";
import { mapUserDBToModel } from "../utils/functionUtils";
import { dispatchQuery, dispatchNonQuery } from "../db";
import UserType from "./userType";

export default class UserModel {
  #id?: string;
  #name?: string;
  #email?: string;
  #active?: boolean;
  #psw?: string;
  #type?: UserType;

  constructor(
    user: Partial<{
      id: string;
      name: string;
      email: string;
      active: boolean;
      psw: string;
      type: UserType;
    }> = {}
  ) {
    const { id, name, email, active, psw, type } = user;

    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#active = active;
    this.#psw = psw;
    this.#type = type;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get email() {
    return this.#email;
  }

  set email(email) {
    this.#email = email;
  }

  get active() {
    return this.#active;
  }

  set active(active) {
    this.#active = active;
  }

  get psw() {
    return this.#psw;
  }

  set psw(psw) {
    this.#psw = psw;
  }

  get type() {
    return this.#type;
  }

  set type(type) {
    this.#type = type;
  }

  async getAll(): Promise<UserModel[]> {
    const sql =
      "select * from tb_usuario u inner join tb_perfil p on u.per_id = p.per_id";
    const rows = (await dispatchQuery(sql)) as Array<UserDB>;

    return rows.map((row) => mapUserDBToModel(row));
  }

  async getById(): Promise<UserModel | undefined> {
    const sql =
      "select * from tb_usuario u inner join tb_perfil p on u.per_id = p.per_id where u.usu_id = ?";
    const values = [this.#id];
    const rows = (await dispatchQuery(sql, values)) as Array<UserDB>;

    return rows.map((row) => mapUserDBToModel(row))[0];
  }

  async create() {
    const sql =
      "insert into tb_usuario (usu_nome, usu_email, usu_ativo, usu_senha, per_id) values (?, ?, ?, ?, ?)";

    const values = [
      this.#name,
      this.#email,
      this.#active,
      this.#psw,
      this.#type?.id,
    ];

    const result = await dispatchNonQuery(sql, values);

    return Boolean(result);
  }

  async update() {
    const sql = `update tb_usuario set 
    usu_nome = coalesce(?, usu_nome), 
    usu_email = coalesce(?, usu_email), 
    usu_ativo = coalesce(?, usu_ativo),
    usu_senha = coalesce(?, usu_senha), 
    per_id = coalesce(?, per_id)
    where usu_id = ?
    `;

    const values = [
      this.#name,
      this.#email,
      this.#active,
      this.#psw,
      this.#type?.id,
      this.#id,
    ];

    const result = await dispatchNonQuery(sql, values);

    return Boolean(result);
  }

  async delete() {
    const sql = "delete from tb_usuario where usu_id = ?";
    const values = [this.#id];

    const result = await dispatchNonQuery(sql, values);

    return Boolean(result);
  }

  toJSON(): Partial<UserDTO> {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      active: this.#active,
      psw: this.#psw,
      type: this.#type?.toJSON(),
    };
  }
}
