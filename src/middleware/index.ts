import { NextFunction, Request, Response } from "express";
import { getSession } from "../database/session.query";
export const loggedInUserAuth = async (
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
    const user = await getSession(token);
    if (!user?.associate) {
      return res.status(401).json({ message: "You are not logged in" });
    }
    user.associate.password = undefined;
    user.associate.refreshJWT = undefined;
    req.userInfo = user.associate;

    return next();
  } catch (error: Error | any) {
    next(error);
  }
};
