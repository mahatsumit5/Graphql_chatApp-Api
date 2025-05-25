"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const ErrorHandler = (error, req, res, next) => {
    console.log("Error coming from the handler", error.message);
    if (error.message.includes(`"password" with value`)) {
        error.message = "Password must match the requirement";
    }
    const code = error.statusCode || 500;
    const msg = error.message || "Internal Server Error.";
    return res.status(code).json({
        status: false,
        message: msg,
    });
};
exports.ErrorHandler = ErrorHandler;
