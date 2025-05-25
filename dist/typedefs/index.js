import fs from "fs";
import path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";
function loadSchema(schemaNames) {
    return schemaNames.map((schemaName) => fs.readFileSync(path.join(process.cwd(), `./schema/${schemaName}.graphql`), { encoding: "utf-8" }));
}
export const typeDefs = mergeTypeDefs([
    loadSchema([
        "chatRoom",
        "comment",
        "message",
        "post",
        "subscription",
        "request",
        "response",
        "user",
    ]),
]);
