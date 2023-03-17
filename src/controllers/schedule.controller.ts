import { Request, Response } from "express";
import { RealEstate } from "../entities";
import { iCreateSchedule } from "../interfaces/schedules.interfaces";
import { scheduleService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const scheduleData: iCreateSchedule = req.body;
  await scheduleService.createService(scheduleData, req.user.id);

  return res.status(201).json({ message: "Schedule created" });
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const schedules: RealEstate = await scheduleService.retrieveSchedule(
    parseInt(req.params.id)
  );

  return res.status(200).json(schedules);
};
export default { create, read };
