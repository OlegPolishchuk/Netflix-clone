import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";
import * as process from "process";
import {findVideoByUser, insertStats, updateStats} from "@/lib/db/hasura";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = req.cookies.token;
    try {
      if (!token) {
        return res.status(403);
      }

      const {videoId, favourited, watched = true} = req.body;

      console.log('after req.body')
      console.log('req.body = ', req.body)
      const decoded = jwt.verify(token, JWT_SECRET);
      const {issuer} = decoded as {issuer: string}

      console.log('after decoded')
      console.log('issuer = ', issuer)
      console.log('videoId = ', videoId)
      console.log('favourited = ', favourited)
      console.log('token = ', token)
      const doesStatsExist = await findVideoByUser(issuer, videoId, token);

      console.log(`doesStatsExist =`, doesStatsExist)
      const params = {
        favourited,
        watched,
        userId: issuer,
        videoId,
      }

      if (doesStatsExist) {

        /// update it
        const response = await updateStats({token, params});

        console.log('updated Data = ', response)

        return res.send({ data: response })
      }

      const response = await insertStats({token, params});

      console.log('inserted Data = ', response)
      res.send({ data: response })
    }
    catch (error) {
      res.status(500).send({done: false, error: error})
    }
  }
}