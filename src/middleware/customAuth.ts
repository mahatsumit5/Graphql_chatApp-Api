import { NextFunction, Request, Response } from "express";
import { getSession } from "../database/session.query";

import { getOrSetCache } from "../redis";
const USER_EXPIRY = 60 * 30; // 30 minutes
const loggedInUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(500).json({
        status: false,
        code: 401,
        message: "Please login and provide a token to continue",
      });
    }
    // const data = await redisClient.get("user");
    // if (data == null) {
    //   console.log("inside database");
    //   const user = await getSession(token);
    //   if (!user?.associate) {
    //     return res.status(401).json({ message: "You are not logged in" });
    //   }
    //   redisClient.setEx("user", USER_EXPIRY, JSON.stringify(user.associate));

    //   req.userInfo = user.associate;
    // } else {
    //   console.log("inside redis");
    //   const user = JSON.parse(data as string);
    //   req.userInfo = user;
    // }

    const user = await getOrSetCache(
      token,
      USER_EXPIRY,
      async () => await getSession(token)
    );
    req.userInfo = user.associate;
    return next();
  } catch (error: Error | any) {
    next(error);
  }
};

export default loggedInUserAuth;
