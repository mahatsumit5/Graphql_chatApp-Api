"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createAuth0Token = void 0;
const jwks_rsa_1 = require("jwks-rsa");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAuth0Token = async () => {
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
exports.createAuth0Token = createAuth0Token;
const verifyToken = async (token) => {
    const client = new jwks_rsa_1.JwksClient({
        jwksUri: process.env.jwksUri,
    });
    const getJwtsClientKey = (header, cb) => {
        client.getSigningKey(header.kid, (err, key) => {
            const signingKey = key.getPublicKey();
            cb(null, signingKey);
        });
    };
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, getJwtsClientKey, {
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
exports.verifyToken = verifyToken;
