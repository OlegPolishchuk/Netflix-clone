import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";
import * as process from "process";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = req.cookies.token;
    try {
      if (!token) {
        return res.status(403);
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      res.send({message: 'it works'})
    }
    catch (error) {
      res.status(500).send({done: false, error: error})
    }
  }
}