import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import {
  iCategory,
  iCreateCategory,
  iCategoryRepo,
} from "../../interfaces/cadegories.interfaces";

const createCategory = async (
  categoryData: iCreateCategory
): Promise<iCategory> => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);

  const category: Category = categoryRepo.create(categoryData);
  await categoryRepo.save(category);

  return category;
};

export default createCategory;
