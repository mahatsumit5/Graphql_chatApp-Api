"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_query_1 = require("../database/session.query");
const redis_1 = require("../redis");
const USER_EXPIRY = 60 * 30;
const loggedInUserAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(500).json({
                status: false,
                code: 401,
                message: "Please login and provide a token to continue",
            });
        }
        const user = await (0, redis_1.getOrSetCache)(token, USER_EXPIRY, async () => await (0, session_query_1.getSession)(token));
        req.userInfo = user.data.associate;
        return next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = loggedInUserAuth;
