import { UserDTO, UserDB, UserTypeDB } from "../types/user";
import { removeUndefinedAttributes } from "../utils/functionUtils";
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
    const query =
      "select * from tb_usuario u inner join tb_perfil p on u.per_id = p.per_id";
    const rows = (await dispatchQuery(query)) as Array<UserDB & UserTypeDB>;

    return rows.map(
      (row) =>
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
        })
    );
  }

  async getById(): Promise<UserModel | undefined> {
    const query =
      "select * from tb_usuario u inner join tb_perfil p on u.per_id = p.per_id where u.usu_id = ?";
    const values = [this.#id];
    const rows = (await dispatchQuery(query, values)) as Array<
      UserDB & UserTypeDB
    >;

    return rows.map(
      (row) =>
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
        })
    )[0];
  }

  async create() {
    const query =
      "insert into tb_usuario (usu_nome, usu_email, usu_ativo, usu_senha, per_id) values (?, ?, ?, ?, ?)";

    const value = [
      this.#name,
      this.#email,
      this.#active,
      this.#psw,
      this.#type?.id,
    ];

    const result = await dispatchNonQuery(query, value);

    return Boolean(result);
  }

  update(id: string | string, changes: Partial<UserDTO>) {
    removeUndefinedAttributes(changes);

    const keys = Object.keys(changes);
    const value = [id, ...Object.values(changes)];
  }

  delete(id: string | string) {}

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
