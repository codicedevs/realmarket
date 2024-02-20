import { JWTPayload } from '../types/payload';

export function getJwtPayload(req: Request): JWTPayload {
  const user = req['user'] as JWTPayload;
  return user;
}
