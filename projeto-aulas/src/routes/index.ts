import { NextFunction, Router } from "express";
import usersRouter from "./users";
import loginRouter from "./login";
import { validateUserByToken } from "../middlewares/authMiddleware";

const addSwaggerUsersTag = (_, __, next: NextFunction) => {
  /*
    #swagger.tags = ['Users']
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  next();
};
const addSwaggerLoginTag = (_, __, next: NextFunction) => {
  /* 
    #swagger.tags = ['Login']
    #swagger.security = []
  */
  next();
};

const router = Router();

router.use("/api/users/", validateUserByToken, addSwaggerUsersTag, usersRouter);
router.use("/api/login", addSwaggerLoginTag, loginRouter);

export default router;
