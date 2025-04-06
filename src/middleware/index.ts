import { NextFunction, Request, Response } from "express";
import { getSession } from "../database/session.query";
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
        status: false,
        code: 401,
        message: "Please login and provide a token to continue",
      });
    }
    const user = await getSession(`${token}`);
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

export const authoriseUser = (isAuthorised: boolean) => {
  console.log(isAuthorised, "isAuthorised");
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
// Define the HOF
// export const requireAuth = ({}: ResolverFn<TResult, TParent, TContext, TArgs>) => {
//   // Return the new resolver function
//   return (parent, args, context, info) => {
//     // --- Authentication Check ---
//     // Assuming authentication status is attached to the context
//     // Adjust 'context.isAuthenticated' based on your actual context setup
//     if (!context.dataSources.isAuthenticated && !context.user) {
//       // Check common patterns
//       throw new Error("You must be logged in to perform this action.");
//     }
//     // --- End Authentication Check ---

//     // If authenticated, call the original resolver function
//     return resolverFunction(parent, args, context, info);
//   };
// };
