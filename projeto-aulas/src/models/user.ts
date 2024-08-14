import { User } from "../types/user";

let users = [
  {
    id: 1,
    name: "Felipe",
    email: "felipe@gmail.com",
    city: "Presidente Prudente",
    uf: "SP",
  },
  {
    id: 2,
    name: "Lucas",
    email: "lucas@gmail.com",
    city: "São Paulo",
    uf: "SP",
  },
];

export default class UserModel {
  getAll(): User[] {
    return users;
  }

  create(user: User) {
    users.push(user);
  }

  delete(id: number) {
    users = users.filter((user) => user.id !== id);
  }
}
