import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserRepo } from "../../interfaces/users.interfaces";
import { allUsersSchema } from "../../schemas";

const retrieveService = async () => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const getUsers: Array<User> = await userRepo.find({ withDeleted: true });

  const usersList = allUsersSchema.parse(getUsers);

  return usersList;
};

export default retrieveService;
