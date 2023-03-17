import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";
import { iCategoryRepo } from "../interfaces/cadegories.interfaces";

const verifyNameCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);

  if (req.body.name !== undefined) {
    const category = await categoryRepo.findOne({
      where: { name: req.body.name },
    });

    if (category) {
      throw new AppError("Category already exists", 409);
    }
  }

  return next();
};

export default verifyNameCategory;
