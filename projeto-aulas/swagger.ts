import swaggerAutogen from "swagger-autogen";
import UserModel from "./src/models/user";
import UserType from "./src/models/userType";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Swagger Projeto Aulas",
    description: "Endpoints of project",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      userModel: new UserModel({
        id: "0",
        name: "UserName",
        email: "user@email.com",
        active: true,
        psw: "password123",
        type: new UserType({ id: "1", description: "userType" }),
      }).toJSON(),
      userModelList: [
        new UserModel({
          id: "0",
          name: "UserName",
          email: "user@email.com",
          active: true,
          psw: "password123",
          type: new UserType({ id: "1", description: "userType" }),
        }).toJSON(),
      ],
      userType: new UserType({ id: "1", description: "userType" }).toJSON(),
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
