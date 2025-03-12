"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const merge_1 = require("@graphql-tools/merge");
function loadSchema(schemaNames) {
    return schemaNames.map((schemaName) => fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", `./schema/${schemaName}.graphql`), { encoding: "utf-8" }));
}
exports.typeDefs = (0, merge_1.mergeTypeDefs)([
    loadSchema([
        "chatRoom",
        "comment",
        "message",
        "post",
        "request",
        "response",
        "user",
    ]),
]);
