export interface UserDTO {
  id?: string;
  name: string;
  email: string;
  active: boolean;
  psw: string;
  type?: UserTypeDTO;
}
export interface UserDB {
  usu_id: string;
  usu_nome: string;
  usu_email: string;
  usu_ativo: boolean;
  usu_senha: string;
}

export interface UserTypeDTO {
  id?: string;
  description?: string;
}

export interface UserTypeDB {
  per_id: string;
  per_descricao: string;
}
