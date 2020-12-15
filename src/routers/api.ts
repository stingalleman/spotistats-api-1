import { Router } from "express";
import { UserTrack } from "../entities";

const apiRouter = Router();

async function getStreams(params) {
  const query = {
    user: {
      id: params.userId,
    },
  };

  if (params.artistName !== undefined) {
    query["artistName"] = encodeURI(params.artistName);
  }

  if (params.trackName !== undefined) {
    query["trackName"] = encodeURI(params.trackName);
  }

  return await UserTrack.find(query);
}

apiRouter.get("/v1/api/user/:userId/artist/:artistName", async (req, res) => {
  res.send(await getStreams(req.params)).end();
});

apiRouter.get(
  "/v1/api/user/:userId/artist/:artistName/track/:trackName",
  async (req, res) => {
    res.send(await getStreams(req.params)).end();
  }
);

export default apiRouter;
