// import jwt from "jsonwebtoken";
import {JWTPayload, jwtVerify} from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export type UserIdJWTPayload = {
  issuer: string;
  publicAddress: string;
  email: string;
  iat: number;
  exp: number
}

export type JWTUserPayload = JWTPayload & {
  userId: UserIdJWTPayload;
}
export async function verifyToken(token: string) {
   if (token) {
    const {payload} = await jwtVerify(token, JWT_SECRET);
    return payload as JWTUserPayload;
  }

  return {} as JWTUserPayload;
}