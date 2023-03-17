import { Repository } from "typeorm";
import { z } from "zod";
import { Address } from "../entities";
import {
  AddressSchema,
  createAddressSchema,
} from "../schemas/addresses.schemas";

type iAddress = z.infer<typeof AddressSchema>;
type iCreateAddress = z.infer<typeof createAddressSchema>;

type iAddressRepo = Repository<Address>;

export { iAddress, iAddressRepo, iCreateAddress };
