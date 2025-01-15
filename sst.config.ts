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

    if(!process.env.DATABASE_URL || !process.env.AUTH_SECRET) {
      throw new Error("False env.")
    }

   const myApp =  new sst.aws.Nextjs("taskManagement", {
    path: ".",
    environment: {
      DATABASE_URL: process.env.DATABASE_URL,
      AUTH_SECRET: process.env.AUTH_SECRET
    }
   });

   console.log("App url:", myApp.url);
   

  },
});
