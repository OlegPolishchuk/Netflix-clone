import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";
import * as process from "process";
import {findVideoByUser, updateStats} from "@/lib/db/hasura";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = req.cookies.token;
    try {
      if (!token) {
        return res.status(403);
      }

      const videoIdQuery = req.query.videoId;
      const videoId = videoIdQuery as string;

      const decoded = jwt.verify(token, JWT_SECRET);
      const {issuer} = decoded as {issuer: string}

      const doesStatsExist = await findVideoByUser(issuer, videoId, token);

      if (doesStatsExist) {
        const params = {
          favourited: 0,
          watched: true,
          userId: issuer,
          videoId,
        }
        /// update it
        const response = await updateStats({token, params});

        res.send({message: response})
      }
      //add it

      res.send({message: 'it works'})
    }
    catch (error) {
      res.status(500).send({done: false, error: error})
    }
  }
}