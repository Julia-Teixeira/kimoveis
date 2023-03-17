import { AppDataSource } from "../../data-source";
import { RealEstate, Address, Category } from "../../entities";
import { AppError } from "../../errors";
import { iAddressRepo } from "../../interfaces/addresses.interfaces";
import { iCategoryRepo } from "../../interfaces/cadegories.interfaces";
import {
  iCreateRealEstate,
  iRealEstate,
  iRealEstateRepo,
} from "../../interfaces/realEstate.interfaces";
import { RealEstateSchema } from "../../schemas/realEstate.shemas";

const createRealEstate = async (
  realEstateData: iCreateRealEstate
): Promise<iRealEstate> => {
  const addressRepo: iAddressRepo = AppDataSource.getRepository(Address);
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate);
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);

  const address: Address = addressRepo.create({ ...realEstateData.address });
  await addressRepo.save(address);

  const category = await categoryRepo.findOneBy({
    id: realEstateData.categoryId,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const realEstate: RealEstate = realEstateRepo.create({
    ...realEstateData,
    address: address,
    category: category,
  });

  await realEstateRepo.save(realEstate);
  const newRealEstate = RealEstateSchema.parse(realEstate);

  return newRealEstate;
};

export default createRealEstate;
