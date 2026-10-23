import { readFileSync } from "node:fs";
import nextra from "nextra";

// Import assertions (`assert { type: "json" }`) were removed in Node.js 22.
const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8")
);

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

const BRANCH_NAME = process.env.VERCEL_GIT_COMMIT_REF || "";
const IS_RELEASE_BRANCH = BRANCH_NAME.startsWith("releases/");

export default withNextra({
  async redirects() {
    return [
      {
        source: "/docs/api-reference/configuration/fields/:path*",
        destination: "/docs/api-reference/fields/:path*",
        permanent: true,
      },
      {
        source: "/docs/api-reference/plugins",
        destination: "/docs/api-reference/plugin",
        permanent: true,
      },
      {
        source: "/docs/api-reference/overrides/component-list",
        destination: "/docs/api-reference/overrides/components",
        permanent: true,
      },
      {
        source: "/docs/api-reference/data",
        destination: "/docs/api-reference/data-model/data",
        permanent: true,
      },
      {
        source: "/docs/api-reference/app-state",
        destination: "/docs/api-reference/data-model/app-state",
        permanent: true,
      },
      {
        source: "/docs/extending-puck/custom-interfaces",
        destination: "/docs/extending-puck/composition",
        permanent: true,
      },
    ];
  },
  transpilePackages: ["@puckeditor/core"],
  basePath: IS_RELEASE_BRANCH
    ? `/v/${packageJson.version}`
    : process.env.NEXT_PUBLIC_IS_CANARY
    ? "/v/canary"
    : "",
});
