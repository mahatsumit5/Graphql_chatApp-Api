import { NextFunction, Request, Response } from "express";
import { getSession } from "../database/session.query";
import { DataSourceContext } from "../types/context";
import { GraphQLError } from "graphql";

export const loggedInUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(500).json({
        message: "You are not loggssed in",
      });
    }
    const user = await getSession(`${token}`);
    if (!user) {
      return res.status(401).json({ message: "You are not loaaaagged in" });
    }
    user.associate.password = undefined;
    user.associate.refreshJWT = undefined;
    req.userInfo = user.associate;

    return next();
  } catch (error: Error | any) {
    next(error);
  }
};

export const authoriseUser = (isAuthorised: boolean) => {
  switch (isAuthorised) {
    case true:
      return true;
    case false:
      throw new GraphQLError("You are not authorised", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    default:
      throw new GraphQLError("You are not authorised", {
        extensions: { code: "UNAUTHENTICATED" },
      });
  }
};
