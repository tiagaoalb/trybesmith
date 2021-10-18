import { sign, verify } from "jsonwebtoken";
import { tokenDataType } from '../@types/types';

const secret = 'secret'

export const generateToken = (data: tokenDataType) => sign(
  { data },
  secret,
  { expiresIn: '7d', algorithm: 'HS256'}
);

export const decodeToken = (token: string) => verify(token, secret);
