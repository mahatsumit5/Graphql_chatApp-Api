import { getSession } from "../database/session.query.js";
import { getOrSetCache } from "../redis/index.js";
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
        const user = await getOrSetCache(token, USER_EXPIRY, async () => await getSession(token));
        req.userInfo = user.data.associate;
        return next();
    }
    catch (error) {
        next(error);
    }
};
export default loggedInUserAuth;
