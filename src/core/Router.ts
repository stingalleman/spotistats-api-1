import express from "express";
import authRouter from "../routers/auth";
import apiRouter from "../routers/api";

import { infoLogger } from "../misc/Logger";

export default async (): Promise<void> => {
  const app = express();

  app.get("/", async (req, res) =>
    res.send("Spotistats API V1\nhttps://github.com/netlob/spotistats-api")
  );

  app.use(authRouter);
  app.use(apiRouter);

  app.listen(process.env.API_PORT, () => infoLogger("Listening"));
};
