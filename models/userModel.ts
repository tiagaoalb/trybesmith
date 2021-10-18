import { connection } from './connection';
import { userType } from '../@types/types';

export const createUserModel = async ({
  username,
  classe,
  level,
  password,
}: userType) => {
  const [user] = await connection.execute(
    `INSERT INTO Trybesmith.users (username, classe, level, password)
    VALUES (?, ?, ?, ?)`,
    [username, classe, level, password]
  );
  return user;
};

export const getUsersModel = async () => {
  const [users] = await connection.execute('SELECT * FROM Trybesmith.users');
  return users;
};

export const getUserByIdModel = async (id: number) => {
  const [user] = await connection.execute(
    `SELECT * FROM Trybesmith.users WHERE id = ?`,
    [id]
  );
  return user;
};

export const getUserByUsername = async (username: string) => {
  const [user] = await connection.execute(
    `SELECT * FROM Trybesmith.users WHERE username = ?`,
    [username]
  );
  return user;
};

export const updateUserModel = async (id: number, user: userType) => {
  const { username, classe, level, password } = user;
  await connection.execute(
    `UPDATE Trybesmith.users
    SET username = '${username}', classe = '${classe}', level = '${level}', password = '${password}'
    WHERE id = ?`,
    [id]
  );
  return { id, username, classe, level, password };
};

export const deleteUserModel = async (id: number) => {
  await connection.execute(
    `DELETE FROM Trybesmith.users
    WHERE id = ?`,
    [id]
  );
  return;
};
