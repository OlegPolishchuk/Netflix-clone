import {verifyToken} from "@/lib/utils";
import { IncomingMessage } from "http";


export const useRedirectUser = async (req: IncomingMessage & {cookies: Partial<{[p: string]: string}>}) => {
  const token = req ? req.cookies.token as string : '';
  const userId = await verifyToken(token);

  if (!userId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {userId, token}
}