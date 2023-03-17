import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const { admin } = req.user;

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default isAdmin;
