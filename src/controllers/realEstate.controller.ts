import { Request, Response } from "express";
import {
  iCreateRealEstate,
  iRealEstateArray,
} from "../interfaces/realEstate.interfaces";
import { realEstateService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const realEstateData: iCreateRealEstate = req.body;
  const newRealEstate = await realEstateService.createRealEstate(
    realEstateData
  );

  return res.status(201).json(newRealEstate);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const realEstates: iRealEstateArray =
    await realEstateService.retrieveRealEstate();
  return res.status(200).send(realEstates);
};

export default { create, read };
