import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema/**.graphql",
  generates: {
    "./src/types/types.ts/": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./context#DataSourceContext",
      },
    },
  },
};

export default config;
