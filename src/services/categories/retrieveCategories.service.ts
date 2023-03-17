import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import {
  iCategoriesResult,
  iCategoryRepo,
} from "../../interfaces/cadegories.interfaces";

const retrieveCategories = async (): Promise<iCategoriesResult> => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);
  const getCategories: iCategoriesResult = await categoryRepo.find();

  return getCategories;
};

export default retrieveCategories;
