import {NextApiRequest, NextApiResponse} from "next";
import {magicAdmin} from "@/lib/magic";
import jwt from 'jsonwebtoken';
import * as process from "process";
import {isNewUser, createNewUser} from "@/lib/db/hasura";
import {setTokenCookie} from "@/lib/cookies";

const JWT_SECRET = `${process.env.JWT_SECRET}`;
const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.split(' ')[1] : '';

      const metaData = await magicAdmin.users.getMetadataByToken(didToken);

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

      const isNewUserQuery = await isNewUser(token, metaData.issuer);

      isNewUserQuery && (await createNewUser(token, metaData));
      setTokenCookie(token, res);

      return res.send({done: true})

    } catch (e) {
      console.log('Something went wrong logging in', e);

      res.status(500).send({done: false});
    }
  }

  res.send({done: false})
}

export default login;