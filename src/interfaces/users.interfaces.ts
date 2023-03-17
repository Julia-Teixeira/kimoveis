import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { User } from "../entities";
import {
  UserSchema,
  createUserSchema,
  updateUserSchema,
  userSchema,
} from "../schemas";

type iUser = z.infer<typeof UserSchema>;
type iCreateUser = z.infer<typeof createUserSchema>;
type iUsersResult = DeepPartial<Array<User>>;
type iUserResult = z.infer<typeof userSchema>;
type iUpdateUser = DeepPartial<typeof updateUserSchema>;

type iUserRepo = Repository<User>;

export {
  iCreateUser,
  iUpdateUser,
  iUser,
  iUserRepo,
  iUserResult,
  iUsersResult,
};
