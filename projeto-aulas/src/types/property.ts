export interface PropertyDTO {
  id?: string;
  description: string;
  zipCode: string;
  address: string;
  district: string;
  city: string;
  price: number;
  available: boolean;
}

export interface PropertyDB {
  imv_id: string;
  imv_descricao: string;
  imv_cep: string;
  imv_endereco: string;
  imv_bairro: string;
  imv_cidade: string;
  imv_valor: number;
  imv_disponivel: "S" | "s" | "N" | "n";
}
