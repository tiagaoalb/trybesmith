import { z } from 'zod';
import { userSchema, loginSchema } from './userSchema'
import { saleSchema } from './saleSchema'

export type userType = z.infer<typeof userSchema>

export type loginType = z.infer<typeof loginSchema>

export type saleType = z.infer<typeof saleSchema>

export type tokenDataType =  {
  id: number;
  username: string
}
