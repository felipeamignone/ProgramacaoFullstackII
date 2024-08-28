import mysql, { PoolOptions, QueryResult, ResultSetHeader } from "mysql2";

const access: PoolOptions = {
  host: "132.226.245.178",
  database: "PFS2_10442312344",
  user: "10442312344",
  password: "10442312344",
};

const conn = mysql.createPool(access);

export const dispatchQuery = (sql: string, values?: unknown[]) =>
  new Promise((resolve, reject) => {
    conn.query<QueryResult>(sql, values, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

export const dispatchNonQuery = (sql: string, values: unknown[]) =>
  new Promise((resolve, reject) => {
    conn.query<QueryResult>(sql, values, (err, result) => {
      if (err) reject(err);
      resolve((result as ResultSetHeader).affectedRows > 0);
    });
  });

export const dispatchLastInserted = (sql: string, values: unknown[]) =>
  new Promise((resolve, reject) => {
    conn.query<QueryResult>(sql, values, (err, result) => {
      if (err) reject(err);
      resolve((result as ResultSetHeader).insertId);
    });
  });
