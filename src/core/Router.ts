import express from "express";
import authRouter from "../routers/auth";

import { infoLogger } from "../misc/Logger";

// import { spotifyCallback, getUserStreams, getStreams, getSongStreams, getUserHistoryInfo, getUserSong, getUserArtist } from "../Routes";

export default async (): Promise<void> => {
  const app = express();

  app.get("/", async (req, res) =>
    res.send("Spotistats API V1\nhttps://github.com/netlob/spotistats-api")
  );

  app.use(authRouter);

  // app.get("/api/streams", async (req, res) => await getStreams(req, res));

  // // app.get("/api/user/:userID", async (req, res) => await getUserInfo(req, res));

  // app.get(
  //   "/api/user/:userID/streams",
  //   async (req, res) => await getUserStreams(req, res)
  // );

  // app.get(
  //   "/api/user/:userID/dates",
  //   async (req, res) => await getUserHistoryInfo(req, res)
  // );

  // // app.get("/api/song/:songID", async (req, res) => await getUserStreams(req, res));

  // app.get(
  //   "/api/song/:songID/streams/:userID",
  //   async (req, res) => await getSongStreams(req, res)
  // );

  // app.get(
  //   "/api/user/:userID/artist/:artistID",
  //   async (req, res) => await getUserArtist(req, res)
  // );

  // app.get(
  //   "/api/user/:userID/song/:songID",
  //   async (req, res) => await getUserSong(req, res)
  // );

  app.listen("8123", () => infoLogger("Listening on http://localhost:8123"));
};
