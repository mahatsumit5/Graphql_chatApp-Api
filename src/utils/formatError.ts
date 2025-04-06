import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLFormattedErrorExtensions } from "graphql";

export enum ServerErrorCode {
  FORBIDDEN = "FORBIDDEN",
}
export function formatError(
  errorExtension: GraphQLFormattedErrorExtensions,
  message: string
) {
  console.log(errorExtension);
  switch (errorExtension.code) {
    case ApolloServerErrorCode.BAD_USER_INPUT:
      return {
        code: errorExtension.code,
        message: "Invalid input",
      };

    case ApolloServerErrorCode.INTERNAL_SERVER_ERROR:
      return {
        code: errorExtension.code,
        message: "Internal server error",
      };
    case ServerErrorCode.FORBIDDEN:
      return {
        code: errorExtension.code,
        message,
      };

    default:
      return {
        code: errorExtension.code,
        message: "Internal server error",
      };
  }
}
