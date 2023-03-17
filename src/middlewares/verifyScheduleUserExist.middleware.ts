import { parse } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Schedule } from "../entities";
import { AppError } from "../errors";
import {
  iCreateSchedule,
  iScheduleRepo,
} from "../interfaces/schedules.interfaces";

const verifyScheduleUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const scheduleData: iCreateSchedule = req.body;
  const scheduleRepo: iScheduleRepo = AppDataSource.getRepository(Schedule);

  const verifyUser = await scheduleRepo
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.user = :id", { id: req.user.id })
    .andWhere("schedules_users_properties.date = :date", {
      date: scheduleData.date,
    })
    .andWhere("schedules_users_properties.hour = :hour", {
      hour: scheduleData.hour,
    })
    .getOne();

  if (verifyUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }
  return next();
};

export default verifyScheduleUserExist;
