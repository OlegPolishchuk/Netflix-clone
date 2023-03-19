import {NextApiRequest, NextApiResponse} from "next";
import {magicAdmin} from "@/lib/magic";
import jwt from 'jsonwebtoken';
import * as process from "process";
import {isNewUser} from "@/lib/db/hasura";

const JWT_SECRET = `${process.env.JWT_SECRET}`;
const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.split(' ')[1] : '';
      console.log({didToken})


      const metaData = await magicAdmin.users.getMetadataByToken(didToken);
      console.log({metaData})

      const token = jwt.sign(
        {
          ...metaData,
          "iat": Math.floor(Date.now() / 1000),
          "exp": Math.floor(Date.now() / 100 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-user-id": `${metaData.issuer}`
          }
        },
        JWT_SECRET
      );

      //check if user exist
      const isNewUserQuery = await isNewUser(token);

      return res.send({done: true, isNewUserQuery})
    } catch (e) {
      console.log('Something went wrong logging in', e);

      res.status(500).send({done: false});
    }
  }

  res.send({done: false})
}

export default login;