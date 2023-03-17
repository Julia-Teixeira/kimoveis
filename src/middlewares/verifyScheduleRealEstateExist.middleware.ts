import { parse } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { RealEstate, Schedule } from "../entities";
import { AppError } from "../errors";
import { iRealEstateRepo } from "../interfaces/realEstate.interfaces";
import {
  iCreateSchedule,
  iScheduleRepo,
} from "../interfaces/schedules.interfaces";

const verifyScheduleRealEstateExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const scheduleData: iCreateSchedule = req.body;
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate);
  const scheduleRepo: iScheduleRepo = AppDataSource.getRepository(Schedule);
  const scheduleQuerybuilder = scheduleRepo.createQueryBuilder(
    "schedules_users_properties"
  );

  const verifyRealEstate = await scheduleQuerybuilder
    .select("schedules_users_properties")
    .where("schedules_users_properties.realEstateId = :id", {
      id: scheduleData.realEstateId,
    })
    .andWhere("schedules_users_properties.date = :date", {
      date: scheduleData.date,
    })
    .andWhere("schedules_users_properties.hour = :hour", {
      hour: scheduleData.hour,
    })
    .getOne();

  if (verifyRealEstate) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }
  return next();
};

export default verifyScheduleRealEstateExist;
