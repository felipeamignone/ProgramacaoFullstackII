import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

import apiRouter from "./routes";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/", apiRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:5000");
});
