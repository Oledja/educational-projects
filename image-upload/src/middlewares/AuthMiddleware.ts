import axios from "axios";
import jwkToPem from "jwk-to-pem";
import { JwkResponse } from "../@types/api-gateway";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const pems: { [key: string]: string } = {};

const setUp = async () => {
  const jwksUrl = `https://cognito-idp.us-east-1.amazonaws.com/${process.env.AWS_COGNITO_POOL_ID}/.well-known/jwks.json`;
  const {
    data: { keys },
  } = await axios.get<JwkResponse>(jwksUrl);
  keys.forEach((jwk) => {
    const pem = jwkToPem({ kty: jwk.kty, n: jwk.n, e: jwk.e });
    pems[jwk.kid] = pem;
  });
};

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await setUp();
  const token = req.header("Auth");
  if (token) {
    const decodedJwt = jwt.decode(token, { complete: true });
    if (decodedJwt) {
      const { kid } = decodedJwt.header;
      if (kid) {
        const pem = pems[kid];
        jwt.verify(token, pem, (err, payload) => {
          if (typeof payload === "object") {
            const username = payload.username as string;
            res.locals.username = username;
            next();
          } else res.status(401).end();
        });
      } else res.status(401).end();
    } else res.status(401).end();
  } else res.status(401).end();
};

export { authMiddleware };
