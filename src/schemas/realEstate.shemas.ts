import { z } from "zod";
import { AddressSchema, createAddressSchema } from "./addresses.schemas";
import { CategorySchema } from "./categories.schemas";

const RealEstateSchema = z.object({
  id: z.number().positive().int(),
  sold: z.boolean().optional().default(false),
  value: z.number().or(z.string()),
  size: z.number().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  address: AddressSchema,
  category: CategorySchema,
});

const createRealEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().positive(),
  address: createAddressSchema,
  categoryId: z.number(),
});

const RealEstateSchemaArray = RealEstateSchema.partial().array();

export { RealEstateSchema, createRealEstateSchema, RealEstateSchemaArray };
