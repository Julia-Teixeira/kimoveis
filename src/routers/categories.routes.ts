import { Router } from "express";
import { categoryController } from "../controllers";
import {
  isAdmin,
  validateData,
  validToken,
  verifyNameCategory,
} from "../middlewares";
import { createCategorySchema } from "../schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  validToken,
  isAdmin,
  verifyNameCategory,
  validateData(createCategorySchema),
  categoryController.create
);
categoriesRoutes.get("", categoryController.read);

categoriesRoutes.get("/:id/realEstate", categoryController.readCategory);

export default categoriesRoutes;
