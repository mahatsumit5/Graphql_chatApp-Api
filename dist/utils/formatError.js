import { ApolloServerErrorCode } from "@apollo/server/errors";
export var ServerErrorCode;
(function (ServerErrorCode) {
    ServerErrorCode["FORBIDDEN"] = "FORBIDDEN";
})(ServerErrorCode || (ServerErrorCode = {}));
export function formatError(errorExtension, message) {
    switch (errorExtension.code) {
        case ApolloServerErrorCode.BAD_USER_INPUT:
            return {
                code: errorExtension.code,
                message: "Invalid input",
            };
        case ApolloServerErrorCode.INTERNAL_SERVER_ERROR:
            return {
                code: errorExtension.code,
                message: message,
            };
        case ServerErrorCode.FORBIDDEN:
            return {
                code: errorExtension.code,
                message,
            };
        default:
            return {
                code: errorExtension.code,
                message: message,
            };
    }
}
