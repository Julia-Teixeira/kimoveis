import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { iCategoryRepo } from "../../interfaces/cadegories.interfaces";

const retrieveRealStateByCategory = async (
  idCategory: number
): Promise<Category[]> => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);
  const findCategory = await categoryRepo.findOneBy({ id: idCategory });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  const getAllRealEstates: Category[] = await categoryRepo.find({
    where: {
      id: idCategory!,
    },
    relations: {
      realEstate: true,
    },
  });

  return getAllRealEstates;
};

export default retrieveRealStateByCategory;
