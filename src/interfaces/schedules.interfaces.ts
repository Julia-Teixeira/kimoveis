import { Repository } from "typeorm";
import { z } from "zod";
import { Schedule } from "../entities";

import {
  createScheduleSchema,
  RealEstateScheduleSchema,
  ScheduleSchema,
} from "../schemas/schedules.schema";

type iSchedule = z.infer<typeof ScheduleSchema>;
type iCreateSchedule = z.infer<typeof createScheduleSchema>;
type iSchedulesResult = z.infer<typeof RealEstateScheduleSchema>;
type iScheduleRepo = Repository<Schedule>;

export { iSchedule, iCreateSchedule, iScheduleRepo, iSchedulesResult };
