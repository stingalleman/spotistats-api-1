import express from "express";
import importRouter from "../routers/import";
// import authCheck from "../core/Auth";
import { infoLogger } from "../misc/Logger";
// import apiRouter from "../routers/api";
// import authRouter from "../routers/auth";

export default async (): Promise<void> => {
  const app = express();

  app.get("/", async (req, res) =>
    res.send("Spotistats API V1\nhttps://github.com/netlob/spotistats-api")
  );

  // app.use(authRouter);
  app.use(importRouter);

  // app.use(authCheck);
  // app.use(apiRouter);

  app.listen(process.env.API_PORT, () => infoLogger("Listening"));
};
