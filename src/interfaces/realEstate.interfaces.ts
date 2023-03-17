import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { RealEstate } from "../entities";
import {
  createRealEstateSchema,
  RealEstateSchema,
  RealEstateSchemaArray,
} from "../schemas/realEstate.shemas";

type iRealEstate = z.infer<typeof RealEstateSchema>;
type iCreateRealEstate = z.infer<typeof createRealEstateSchema>;
type iRealEstateArray = z.infer<typeof RealEstateSchemaArray>;
type iRealEstateResult = Array<RealEstate>;
type iRealEstateRepo = Repository<RealEstate>;

export {
  iRealEstate,
  iRealEstateRepo,
  iCreateRealEstate,
  iRealEstateResult,
  iRealEstateArray,
};
