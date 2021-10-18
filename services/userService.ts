import { userType, loginType } from '../@types/types';
import { userSchema, loginSchema } from '../@types/userSchema';
import {
  createUserModel,
  getUsersModel,
  getUserByIdModel,
  getUserByUsername,
  updateUserModel,
  deleteUserModel
} from "../models/userModel";

export const createUserService = async (user: userType) => {
  userSchema.parse(user);
  const newUser = await createUserModel(user);
  const id = JSON.parse(JSON.stringify(newUser)).insertId;
  return {id, username: user.username};
}

export const getUsersService = async() => {
  const users = await getUsersModel();
  return users;
}

export const getUserByIdService = async(id: number) => {
  const sale = await getUserByIdModel(id);
  const saleResult = JSON.parse(JSON.stringify(sale))
  if (!saleResult[0]) {
    throw new Error('Not found')
  }
  return sale;
}

export const updateUserService = async(id: number, user: userType) => {
  const updatedUser = await updateUserModel(id, user);
  return updatedUser;
}

export const deleteUserService = async(id: number) => {
  const deletedUser = getUserByIdService(id);
  await deleteUserModel(id);
  return deletedUser;
}

export const userLoginService = async(login: loginType) => {
  loginSchema.parse(login)
  const user = await getUserByUsername(login.username)
  console.log(user)
  const userResult = JSON.parse(JSON.stringify(user))
  if (!userResult[0]) {
    throw new Error('User Not found')
  }
  if (userResult[0].password !== login.password) {
    throw new Error('UserId or Password invalid')
  }
  return userResult;
}
