import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { iUserRepo } from "../interfaces/users.interfaces";

const verifyId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({
    where: {
      id: parseInt(req.params.id) || req.user.id,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }
  return next();
};

export default verifyId;
