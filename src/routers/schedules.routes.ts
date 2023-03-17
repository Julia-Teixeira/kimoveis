import { Router } from "express";
import { scheduleController } from "../controllers";
import {
  isAdmin,
  validateData,
  validToken,
  verifyId,
  verifyRealEstateExist,
  verifyScheduleRealEstateExist,
  verifyScheduleUserExist,
} from "../middlewares";
import { createScheduleSchema } from "../schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  validToken,
  verifyId,
  validateData(createScheduleSchema),
  verifyScheduleRealEstateExist,
  verifyScheduleUserExist,
  verifyRealEstateExist,
  scheduleController.create
);
schedulesRoutes.get(
  "/realEstate/:id",
  validToken,
  isAdmin,
  scheduleController.read
);

export default schedulesRoutes;
