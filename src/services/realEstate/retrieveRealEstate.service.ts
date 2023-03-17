import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import {
  iRealEstateRepo,
  iRealEstateArray,
} from "../../interfaces/realEstate.interfaces";
import {
  RealEstateSchema,
  RealEstateSchemaArray,
} from "../../schemas/realEstate.shemas";

const retrieveRealEstate = async (): Promise<iRealEstateArray> => {
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const realEstates: iRealEstateArray = await realEstateRepo.find({
    relations: { address: true },
  });

  const realEstatesParse = RealEstateSchemaArray.parse(realEstates);

  return realEstatesParse;
};

export default retrieveRealEstate;
