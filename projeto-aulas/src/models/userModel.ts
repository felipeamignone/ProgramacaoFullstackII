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

interface User {
  id: number;
  name: string;
  email: string;
  city: string;
  uf: string;
}

export default class UserModel {
  getAll() {
    return users;
  }

  create(user: User) {
    users.push(user);
  }

  delete(id: number) {
    users = users.filter((user) => user.id !== id);
  }
}
