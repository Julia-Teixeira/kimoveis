import { z } from "zod";
import { AddressSchema } from "./addresses.schemas";
import { CategorySchema } from "./categories.schemas";
import { RealEstateSchema } from "./realEstate.shemas";

import { userSchema } from "./users.schemas";

const ScheduleSchema = z.object({
  id: z.number().positive().int(),
  date: z.date().or(z.string()),
  hour: z.string(),
  realEstate: RealEstateSchema,
  user: userSchema,
});

const createScheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const RealEstateScheduleSchema = RealEstateSchema.omit({
  category: true,
  address: true,
}).extend({
  schedules: ScheduleSchema.omit({ realEstate: true }).array(),
  address: AddressSchema,
  category: CategorySchema,
});

export { createScheduleSchema, ScheduleSchema, RealEstateScheduleSchema };
