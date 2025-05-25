"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedInUserAuth = exports.upload = exports.auth0Middleware = void 0;
const auth0_1 = __importDefault(require("./auth0"));
exports.auth0Middleware = auth0_1.default;
const S3Bucket_upload_1 = __importDefault(require("./S3Bucket.upload"));
exports.upload = S3Bucket_upload_1.default;
const customAuth_1 = __importDefault(require("./customAuth"));
exports.loggedInUserAuth = customAuth_1.default;
