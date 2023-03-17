import { z } from "zod";

const CategorySchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(45),
});

const createCategorySchema = CategorySchema.omit({ id: true });

const allCategoriesSchema = CategorySchema.array();

export { CategorySchema, createCategorySchema, allCategoriesSchema };
