import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  iUpdateUser,
  iUserRepo,
  iUserResult,
} from "../../interfaces/users.interfaces";
import { userSchema } from "../../schemas";

const updateUser = async (
  userData: iUpdateUser,
  idUser: number
): Promise<iUserResult> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const oldUserData = await userRepo.findOneBy({ id: idUser });

  const user = userRepo.create({ ...oldUserData, ...userData });

  await userRepo.save(user);

  const newUser = userSchema.parse(user);

  return newUser;
};

export default updateUser;
