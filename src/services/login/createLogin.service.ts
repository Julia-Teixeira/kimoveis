import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { iLogin } from "../../interfaces/login.interfaces";
import { iUserRepo } from "../../interfaces/users.interfaces";
import jwt from "jsonwebtoken";

const createLogin = async (loginData: iLogin): Promise<string> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({
    email: loginData.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  if (user.deletedAt !== null) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await compare(loginData.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
      id: user.id,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );

  return token;
};

export default createLogin;
