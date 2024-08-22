import { NextFunction, Router } from "express";
import UsersController from "../controllers/users";

const router = Router();
let ctrl = new UsersController();

const addPostSchema = (_, __, next: NextFunction) => {
  /* 
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userModel"
                    }  
                }
            }
    } 
    */
  next();
};

const addGetAllSchema = (_, __, next: NextFunction) => {
  /* 
    #swagger.responses[200] = {
        description: "Some description...",
        content: {
            "application/json": {
                schema:{
                    $ref: "#/components/schemas/userModelList"
                }
            }           
        }
    }   
    */
  next();
};

const addGetByIdSchema = (_, __, next: NextFunction) => {
  /* 
    #swagger.responses[200] = {
        description: "Some description...",
        content: {
            "application/json": {
                schema:{
                    $ref: "#/components/schemas/userModel"
                }
            }           
        }
    }   
    */
  next();
};

router.get("/", addGetAllSchema, ctrl.getAll);
router.get("/:id", addGetByIdSchema, ctrl.getById);

router.post("/", addPostSchema, ctrl.create);

router.patch("/:id", ctrl.update);

router.delete("/:id", ctrl.delete);

export default router;
