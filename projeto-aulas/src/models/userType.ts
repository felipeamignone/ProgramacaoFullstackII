import { UserTypeDTO } from "../types/user";

export default class UserType {
  #id?: string;
  #description?: string;

  constructor(userType?: Partial<{ id: string; description: string }>) {
    const { id, description } = userType || {};
    this.#id = id;
    this.#description = description;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }

  get description() {
    return this.#description;
  }

  set description(description) {
    this.#description = description;
  }

  toJSON(): Partial<UserTypeDTO> {
    return {
      id: this.#id,
      description: this.#description,
    };
  }
}
