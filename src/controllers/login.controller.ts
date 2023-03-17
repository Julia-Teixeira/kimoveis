import { Request, Response } from "express";
import { iLogin } from "../interfaces/login.interfaces";
import { loginService } from "../services";

const login = async (req: Request, res: Response) => {
  const userData: iLogin = req.body;

  const token = await loginService.createLogin(userData);

  return res.status(200).json({ token: token });
};

export default { login };
