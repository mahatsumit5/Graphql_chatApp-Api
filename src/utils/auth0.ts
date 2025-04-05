import { JwksClient } from "jwks-rsa";
import jwt, { JwtHeader, JwtPayload, SigningKeyCallback } from "jsonwebtoken";
type token = { access_token: string };
export const createAuth0Token: () => Promise<token> = async () => {
  const requestBody = {
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
    audience: process.env.audience,
    grant_type: "client_credentials",
  };

  const res = await fetch(process.env.Request_Token_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const data = await res.json();
  return data as any;
};

export const verifyToken: (
  token: string
) => Promise<JwtPayload | unknown> = async (token: string) => {
  const client = new JwksClient({
    jwksUri: "https://dev-fkp34f1yfajuoqj7.au.auth0.com/.well-known/jwks.json",
  });
  const getJwtsClientKey = (header: JwtHeader, cb: SigningKeyCallback) => {
    client.getSigningKey(header.kid, (err, key) => {
      const signingKey = key.getPublicKey();
      cb(null, signingKey);
    });
  };

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getJwtsClientKey,
      {
        audience: process.env.audience,
        issuer: process.env.issuerBaseURL,
        algorithms: ["RS256"],
      },
      (error, decoded) => {
        if (error) {
          resolve({ error });
        }
        if (decoded) {
          resolve({ decoded });
        }
      }
    );
  });
};
