"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const auth0Middleware = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.audience,
    issuerBaseURL: process.env.issuerBaseURL,
});
exports.default = auth0Middleware;
