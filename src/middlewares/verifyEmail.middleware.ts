import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { iUserRepo } from "../interfaces/users.interfaces";

const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  if (req.body.email !== undefined) {
    const user = await userRepo.findOne({
      where: { name: req.body.name },
      withDeleted: true,
    });

    if (user) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
};

export default verifyEmail;
