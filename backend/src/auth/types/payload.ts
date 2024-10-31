import { Role } from 'src/authentication/role.enum';
import { ObjectId } from 'typeorm';

export interface JWTPayload {
  sub: ObjectId;
  username: string;
  accountId: string;
  roles?: Role[];
  iat?: string;
  exp?: string;
}
