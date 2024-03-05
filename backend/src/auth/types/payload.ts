import { ObjectId } from 'typeorm';

export interface JWTPayload {
  sub: ObjectId;
  username: string;
  accountId: string;
  iat?: string;
  exp?: string;
}
