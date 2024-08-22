import { NextFunction, Router } from "express";
import usersRouter from "./users";

const addSwaggerUsersTag = (_, __, next: NextFunction) => {
  // #swagger.tags = ['Users']
  next();
};

const router = Router();

router.use("/api/users/", addSwaggerUsersTag, usersRouter);

export default router;
