import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  iCreateUser,
  iUserRepo,
  iUserResult,
} from "../../interfaces/users.interfaces";
import { userSchema } from "../../schemas";

const createUser = async (userData: iCreateUser): Promise<iUserResult> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const user: User = userRepo.create(userData);
  await userRepo.save(user);

  const newUser = userSchema.parse(user);
  return newUser;
};

export default createUser;
