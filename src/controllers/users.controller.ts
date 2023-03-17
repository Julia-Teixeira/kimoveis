import { userService } from "../services";
import { Request, Response } from "express";
import { iCreateUser, iUpdateUser } from "../interfaces/users.interfaces";

const create = async (req: Request, res: Response) => {
  const userData: iCreateUser = req.body;
  const newUser = await userService.createUser(userData);

  return res.status(201).json(newUser);
};

const read = async (req: Request, res: Response) => {
  const listUsers = await userService.retrieveUser();

  return res.status(200).json(listUsers);
};

const update = async (req: Request, res: Response) => {
  const userData: iUpdateUser = req.body;
  const idUser: number = parseInt(req.params.id);

  const updatedUser = await userService.updateUser(userData, idUser);

  return res.status(200).json(updatedUser);
};

const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUser(parseInt(req.params.id));

  return res.status(204).send();
};

export default { create, read, update, deleteUser };
