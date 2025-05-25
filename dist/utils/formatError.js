"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerErrorCode = void 0;
exports.formatError = formatError;
const errors_1 = require("@apollo/server/errors");
var ServerErrorCode;
(function (ServerErrorCode) {
    ServerErrorCode["FORBIDDEN"] = "FORBIDDEN";
})(ServerErrorCode || (exports.ServerErrorCode = ServerErrorCode = {}));
function formatError(errorExtension, message) {
    switch (errorExtension.code) {
        case errors_1.ApolloServerErrorCode.BAD_USER_INPUT:
            return {
                code: errorExtension.code,
                message: "Invalid input",
            };
        case errors_1.ApolloServerErrorCode.INTERNAL_SERVER_ERROR:
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
