import { dispatchNonQuery, dispatchQuery } from "../db";
import { PropertyDB, PropertyDTO } from "../types/property";
import { mapPropertyDBToModel } from "../utils/mappers";

export default class PropertyModel {
  #id?: string;
  #description?: string;
  #zipCode?: string;
  #address?: string;
  #district?: string;
  #city?: string;
  #price?: number;
  #available?: boolean;

  constructor(
    porperty: Partial<{
      id: string;
      description: string;
      zipCode: string;
      address: string;
      district: string;
      city: string;
      price: number;
      available: boolean;
    }> = {}
  ) {
    const {
      id,
      description,
      zipCode,
      address,
      district,
      city,
      price,
      available,
    } = porperty;

    this.#id = id;
    this.#description = description;
    this.#zipCode = zipCode;
    this.#address = address;
    this.#district = district;
    this.#city = city;
    this.#price = price;
    this.#available = available;
  }

  // Getters
  getId() {
    return this.#id;
  }

  getDescription() {
    return this.#description;
  }

  getZipCode() {
    return this.#zipCode;
  }

  getAddress() {
    return this.#address;
  }

  getDistrict() {
    return this.#district;
  }

  getCity() {
    return this.#city;
  }

  getPrice() {
    return this.#price;
  }

  isAvailable() {
    return this.#available;
  }

  // Setters
  setId(id: string) {
    this.#id = id;
  }

  setDescription(description: string) {
    this.#description = description;
  }

  setZipCode(zipCode: string) {
    this.#zipCode = zipCode;
  }

  setAddress(address: string) {
    this.#address = address;
  }

  setDistrict(district: string) {
    this.#district = district;
  }

  setCity(city: string) {
    this.#city = city;
  }

  setPrice(price: number) {
    this.#price = price;
  }

  setAvailable(available: boolean) {
    this.#available = available;
  }

  async getAll() {
    const sql = "select * from tb_imovel";

    const rows = (await dispatchQuery(sql)) as Array<PropertyDB>;

    return rows.map((row) => mapPropertyDBToModel(row));
  }

  async getById() {
    const sql = "select * from tb_imovel where imv_id = ?";
    const values = [this.#id];

    const rows = (await dispatchQuery(sql, values)) as Array<PropertyDB>;

    return rows.map((row) => mapPropertyDBToModel(row))[0];
  }

  async create() {
    const sql =
      "insert into tb_imovel (imv_descricao, imv_cep, imv_endereco, imv_bairro, imv_cidade, imv_valor, imv_disponivel) values (?, ?, ?, ?, ?, ?, ?)";

    const values = [
      this.#description,
      this.#zipCode,
      this.#address,
      this.#district,
      this.#city,
      this.#price,
      this.#available,
    ];

    const result = await dispatchNonQuery(sql, values);

    return Boolean(result);
  }

  async update() {
    const sql = `update tb_imovel set 
        imv_descricao = coalesce(?, imv_descricao),
        imv_cep = coalesce(?, imv_cep),
        imv_endereco = coalesce(?, imv_endereco),
        imv_bairro = coalesce(?, imv_bairro),
        imv_cidade = coalesce(?, imv_cidade),
        imv_valor = coalesce(?, imv_valor),
        imv_disponivel = coalesce(?, imv_disponivel)
        where imv_id = ?
    `;

    const values = [
      this.#description,
      this.#zipCode,
      this.#address,
      this.#district,
      this.#city,
      this.#price,
      this.#available,
      this.#id,
    ];

    const result = await dispatchNonQuery(sql, values);

    return Boolean(result);
  }

  async delete() {
    const sql = "delete from tb_imovel where imv_id = ?";
    const values = [this.#id];

    const result = await dispatchNonQuery(sql, values);

    return Boolean(result);
  }

  toJSON(): Partial<PropertyDTO> {
    return {
      id: this.#id,
      description: this.#description,
      zipCode: this.#zipCode,
      address: this.#address,
      district: this.#district,
      city: this.#city,
      price: this.#price,
      available: this.#available,
    };
  }
}
