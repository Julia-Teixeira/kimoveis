import { Router } from "express";
import { userController } from "../controllers";
import {
  isAdmin,
  validateData,
  validToken,
  verifyEmail,
  sameUser,
  verifyId,
} from "../middlewares";
import { createUserSchema, updateUserSchema } from "../schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  validateData(createUserSchema),
  verifyEmail,
  userController.create
);
usersRoutes.get("", validToken, isAdmin, userController.read);
usersRoutes.patch(
  "/:id",
  validToken,
  verifyId,
  sameUser,
  validateData(updateUserSchema),
  userController.update
);

usersRoutes.delete(
  "/:id",
  validToken,
  verifyId,
  isAdmin,
  userController.deleteUser
);

export default usersRoutes;
