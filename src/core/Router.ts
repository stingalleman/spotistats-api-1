import express from "express";
import authRouter from "../routers/auth";

import { infoLogger } from "../misc/Logger";

export default async (): Promise<void> => {
  const app = express();

  app.get("/", async (req, res) =>
    res.send("Spotistats API V1\nhttps://github.com/netlob/spotistats-api")
  );

  app.use(authRouter);

  app.listen("8123", () => infoLogger("Listening on http://localhost:8123"));
};
