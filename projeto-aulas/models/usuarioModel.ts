let usuarios = [
  {
    id: 1,
    nome: "Felipe",
    email: "felipe@gmail.com",
    cidade: "Presidente Prudente",
    estado: "SP",
  },
  {
    id: 2,
    nome: "Lucas",
    email: "lucas@gmail.com",
    cidade: "São Paulo",
    estado: "SP",
  },
];

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cidade: string;
  estado: string;
}

export default class UsuarioModel {
  listar() {
    return usuarios;
  }

  gravar(usuario: Usuario) {
    usuarios.push(usuario);
  }

  deletar(id) {
    usuarios = usuarios.filter((usuario) => usuario.id !== id);
  }
}
