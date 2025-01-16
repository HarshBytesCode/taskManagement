// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "task-management",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {

    if(!process.env.POOLED_DATABASE_URL || !process.env.AUTH_SECRET || !process.env.NEXTAUTH_URL || !process.env.PROD_NEXTAUTH_URL) {
      throw new Error("False env.")
    }

   new sst.aws.Nextjs("taskManagement", {
    path: ".",
    environment: {
      DATABASE_URL: process.env.POOLED_DATABASE_URL,
      AUTH_SECRET: process.env.AUTH_SECRET,
      NEXTAUTH_URL: process.env.PROD_NEXTAUTH_URL
    }
   });
   

  },
});
