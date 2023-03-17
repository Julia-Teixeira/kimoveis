import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Address } from "../entities";
import { AppError } from "../errors";
import { iAddressRepo } from "../interfaces/addresses.interfaces";

const verifyAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const addressRepo: iAddressRepo = AppDataSource.getRepository(Address);
  const addressData: Address = req.body.address;
  const number = addressData?.number! && addressData.number;

  if (addressData) {
    const findAddress: Address | null = await addressRepo.findOne({
      where: {
        city: addressData.city,
        number: number,
        state: addressData.state,
        street: addressData.street,
        zipCode: addressData.zipCode,
      },
    });

    if (findAddress !== null) {
      throw new AppError("Address already exists", 409);
    }
  }
  return next();
};

export default verifyAddress;
