import {verifyToken} from "@/lib/utils";
import { IncomingMessage } from "http";


export const getUserAuthData = async (req: IncomingMessage & {cookies: Partial<{[p: string]: string}>}) => {
  const token = req ? req.cookies.token as string : '';
  const payload = await verifyToken(token);

  return {userId: payload.issuer as string, token}
}