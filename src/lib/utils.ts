import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
export async function verifyToken(token: string) {
  if (token) {
    const decodedToken = await jwt.verify(token, JWT_SECRET);
    const {issuer} =  decodedToken as { issuer: string }

    return issuer;
  }

  return '';
}