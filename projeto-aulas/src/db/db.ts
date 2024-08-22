import mysql from "mysql2";

class Database {
  #conexao;

  get conexao() {
    return this.#conexao;
  }
  set conexao(conexao) {
    this.#conexao = conexao;
  }

  constructor() {
    this.#conexao = mysql.createPool({
      host: "132.226.245.178", //endereço do nosso banco de dados na nuvem
      database: "PFS2_10442312344", //a database de cada um de vocês possui a nomenclatura DB_10442312344
      user: "10442312344", // usuario e senha de cada um de vocês é o RA
      password: "10442312344",
    });
  }

  ExecutaComando(sql: string, valores?: unknown[]) {
    var cnn = this.#conexao;
    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) rej(error);
        else res(results);
      });
    });
  }

  ExecutaComandoNonQuery(sql, valores) {
    var cnn = this.#conexao;
    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) rej(error);
        else res(results.affectedRows > 0);
      });
    });
  }

  ExecutaComandoLastInserted(sql, valores) {
    var cnn = this.#conexao;
    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) rej(error);
        else res(results.insertId);
      });
    });
  }
}

export default Database;
