import { JwksClient } from "jwks-rsa";
import jwt from "jsonwebtoken";
export const createAuth0Token = async () => {
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
    return data;
};
export const verifyToken = async (token) => {
    const client = new JwksClient({
        jwksUri: process.env.jwksUri,
    });
    const getJwtsClientKey = (header, cb) => {
        client.getSigningKey(header.kid, (err, key) => {
            const signingKey = key.getPublicKey();
            cb(null, signingKey);
        });
    };
    return new Promise((resolve, reject) => {
        jwt.verify(token, getJwtsClientKey, {
            audience: process.env.audience,
            issuer: `${process.env.issuerBaseURL}`,
            algorithms: ["RS256"],
        }, (error, decoded) => {
            if (error) {
                resolve({ error });
            }
            if (decoded) {
                resolve({ decoded });
            }
        });
    });
};
