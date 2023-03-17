import { Router } from "express";
import { loginController } from "../controllers";
import { validateData } from "../middlewares";
import { loginSchema } from "../schemas";

const loginRoutes: Router = Router();

loginRoutes.post("", validateData(loginSchema), loginController.login);

export default loginRoutes;
