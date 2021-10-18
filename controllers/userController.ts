import { Request, Response } from 'express';
import { z } from 'zod';
import {
  userLoginService,
  getUserByIdService,
  getUsersService,
  updateUserService,
  deleteUserService,
} from '../services/userService';
import { generateToken } from '../utils/handleToken';

const paramsSchema = z.object({
  id: z
    .string()
    .refine((v) => !isNaN(parseInt(v, 10)))
    .transform((v) => parseInt(v, 10)),
});

export const createUserController = async (
  request: Request,
  response: Response
) => {
  const { id, username } = request.body;
  const token = generateToken({ id, username });
  return response.status(201).json({ token });
};

export const getUsersController = async (
  request: Request,
  response: Response
) => {
  const users = await getUsersService();
  return response.status(200).json({ users });
};

export const getUserByIdController = async (
  request: Request,
  response: Response
) => {
  const id = paramsSchema.parse(request.params).id
  const user = await getUserByIdService(id);
  return response.status(200).json({ user });
};

export const updateUserController = async (
  request: Request,
  response: Response
) => {
  const id = paramsSchema.parse(request.params).id;
  const userData = request.body;
  const updatedUser = await updateUserService(id, userData);
  return response.status(200).json({ updatedUser });
};

export const deleteUserController = async (
  request: Request,
  response: Response
) => {
  const id = paramsSchema.parse(request.params).id;
  const deletedUser = await deleteUserService(id);
  return response.status(200).json({ deletedUser });
};

export const userLoginController = async (
  request: Request,
  response: Response
) => {
  const [user] = await userLoginService(request.body);
  const { id, username } = user;
  const token = generateToken({ id, username });
  return response.status(201).json({ token });
};
