// import jwt from "jsonwebtoken";
import {JWTPayload, jwtVerify} from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyToken(token: string) {
   if (token) {
    const {payload} = await jwtVerify(token, JWT_SECRET);

    return payload;
  }

  return {} as JWTPayload;
}