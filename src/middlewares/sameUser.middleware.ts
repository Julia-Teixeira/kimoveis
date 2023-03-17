import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const sameUser = (req: Request, res: Response, next: NextFunction): void => {
  const { id, admin } = req.user;

  if (admin) {
    return next();
  }

  if (!admin) {
    if (id !== parseInt(req.params.id)) {
      throw new AppError("Insufficient permission", 403);
    }
  }
  return next();
};

export default sameUser;
