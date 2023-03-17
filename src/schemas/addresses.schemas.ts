import { z } from "zod";

const AddressSchema = z.object({
  id: z.number().positive().int(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(6).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const createAddressSchema = AddressSchema.omit({ id: true });

export { AddressSchema, createAddressSchema };
