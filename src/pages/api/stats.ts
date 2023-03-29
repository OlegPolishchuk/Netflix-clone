import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";
import * as process from "process";
import {findVideoByUser, insertStats, updateStats} from "@/lib/db/hasura";
import {verifyToken} from "@/lib/utils";



export default async function stats(req: NextApiRequest, res: NextApiResponse) {

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403);
    }

    const inputParams = req.method === 'POST' ?  req.body : req.query;
    const {videoId} = inputParams;

    const userId = await verifyToken(token);

    const findVideo = await findVideoByUser(userId, videoId, token);
    const doesStatsExist = findVideo?.length > 0;



    if (req.method === 'POST') {
      const {favourited, watched = true} = req.body;

      const params = {
        favourited,
        watched,
        userId: userId,
        videoId,
      }

      if (doesStatsExist) {
        const response = await updateStats({token, params});

        return res.send({data: response})
      }

      const response = await insertStats({token, params});

      res.send({data: response})
    } else {
      //GET request
      if (!doesStatsExist) {
        return res
          .status(404)
          .send({user: null, message: 'Video not found'})
      }

      return res.send({findVideo})
    }

  } catch (error) {
    res.status(500).send({done: false, error: error})
  }

}