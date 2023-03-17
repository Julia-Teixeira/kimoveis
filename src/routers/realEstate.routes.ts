import { Router } from "express";
import { realEstateController } from "../controllers";
import {
  isAdmin,
  validateData,
  validToken,
  verifyAddress,
} from "../middlewares";
import { createRealEstateSchema } from "../schemas/realEstate.shemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  validToken,
  isAdmin,
  verifyAddress,
  validateData(createRealEstateSchema),
  realEstateController.create
);
realEstateRoutes.get("", realEstateController.read);

export default realEstateRoutes;
