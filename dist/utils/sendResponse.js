"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendResponse(status, message, data) {
    return {
        status,
        message,
        data,
    };
}
exports.default = sendResponse;
