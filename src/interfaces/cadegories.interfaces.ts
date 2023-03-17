import { Repository } from "typeorm";
import { z } from "zod";
import { Category } from "../entities";
import {
  allCategoriesSchema,
  CategorySchema,
  createCategorySchema,
} from "../schemas";

type iCategory = z.infer<typeof CategorySchema>;
type iCreateCategory = z.infer<typeof createCategorySchema>;
type iCategoriesResult = z.infer<typeof allCategoriesSchema>;

type iCategoryRepo = Repository<Category>;

export { iCategory, iCategoriesResult, iCreateCategory, iCategoryRepo };
