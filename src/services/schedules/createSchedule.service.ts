import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { iRealEstateRepo } from "../../interfaces/realEstate.interfaces";
import {
  iCreateSchedule,
  iScheduleRepo,
} from "../../interfaces/schedules.interfaces";
import { iUserRepo } from "../../interfaces/users.interfaces";
import { parse } from "date-fns";

const createSchedule = async (
  scheduleData: iCreateSchedule,
  idUser: number
) => {
  const scheduleRepo: iScheduleRepo = AppDataSource.getRepository(Schedule);
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepo.findOne({
    where: { id: scheduleData.realEstateId },
  });

  const dateFromString = (value: string): Date => {
    return parse(value, "yyyy/dd/MM" || "yyyy-dd-MM", new Date());
  };
  const newDate = dateFromString(scheduleData.date);

  const user: User | null = await userRepo.findOneBy({
    id: idUser,
  });

  const weekDay = newDate.getDay();

  if (weekDay < 1 || weekDay > 5) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const hour = scheduleData.hour;

  if (Number(hour.slice(0, 2)) < 8 || Number(hour.slice(0, 2)) > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  } else if (Number(hour.slice(0, 2)) === 18 && Number(hour.slice(3)) >= 0) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const schedule: Schedule = scheduleRepo.create({
    date: newDate,
    hour: hour,
    realEstate: realEstate!,
    user: user!,
  });

  await scheduleRepo.save(schedule);
};

export default createSchedule;
