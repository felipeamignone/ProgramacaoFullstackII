import { User } from "../types/user";
import { removeUndefinedAttributes } from "../utils/functionUtils";

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

  getById(id: number | string): User | undefined {
    return users.filter((user) => user.id == id)[0];
  }

  create(user: User) {
    users.push(user);
  }

  update(id: number | string, changes: Partial<User>) {
    removeUndefinedAttributes(changes);
    users = users.map((user) => {
      if (user.id == id) return { ...user, ...changes };
      return user;
    });
  }

  delete(id: number | string) {
    users = users.filter((user) => user.id != id);
  }
}
