import { auth } from "express-oauth2-jwt-bearer";

const auth0Middleware = auth({
  audience: process.env.audience,
  issuerBaseURL: process.env.issuerBaseURL,
});

export default auth0Middleware;
