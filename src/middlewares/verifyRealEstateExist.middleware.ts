import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { RealEstate } from "../entities";
import { AppError } from "../errors";
import { iRealEstateRepo } from "../interfaces/realEstate.interfaces";

const verifyRealEstateExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepo.findOne({
    where: { id: req.body.realEstateId },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return next();
};

export default verifyRealEstateExist;
