import express from "express";
import usuarioRouter from "./routes/usuarioRoute.ts";

const app = express();
app.use(express.json());
app.use("/usuarios", usuarioRouter);

app.listen(5000, function () {
  console.log("Servidor rodando em http://localhost:5000");
});
