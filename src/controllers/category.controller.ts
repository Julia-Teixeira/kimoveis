import { Request, Response } from "express";
import { Category } from "../entities";
import {
  iCategoriesResult,
  iCreateCategory,
} from "../interfaces/cadegories.interfaces";
import { categoryService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const categoryData: iCreateCategory = req.body;
  const newCategory = await categoryService.createCategory(categoryData);

  return res.status(201).json(newCategory);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const categories: iCategoriesResult =
    await categoryService.retrieveCategories();
  return res.status(200).json(categories);
};
const readCategory = async (req: Request, res: Response): Promise<Response> => {
  const realEstate: Category[] =
    await categoryService.retrieveRealStateByCategory(parseInt(req.params.id));

  return res.status(200).json(...realEstate);
};

export default { create, read, readCategory };
