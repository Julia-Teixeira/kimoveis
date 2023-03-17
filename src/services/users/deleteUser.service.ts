import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserRepo } from "../../interfaces/users.interfaces";

const deleteUser = async (idUser: number): Promise<void> => {
  const userRepository: iUserRepo = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  await userRepository.softRemove(user!);
};

export default deleteUser;
