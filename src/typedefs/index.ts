import fs from "fs";
import path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";

function loadSchema(schemaNames: string[]): string[] {
  return schemaNames.map((schemaName) =>
    fs.readFileSync(
      path.join(__dirname, "..", "..", `./schema/${schemaName}.graphql`),
      { encoding: "utf-8" }
    )
  );
}

// Merge schemas
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
