import { Router } from "express";
import { getManager, getRepository } from "typeorm";
import { UserTrack } from "../entities";

const apiRouter = Router();

async function getTop(params) {
  if (params.type === "artists") {
    return getManager().query(
      `
      SELECT
        SUM(count), "artistName"
      FROM
        usertracks
      WHERE
        "userId" = $1
      GROUP BY "artistName"
      ORDER BY SUM(count) DESC
      LIMIT 10;
      `,
      [params.userId]
    );
  } else {
    const query = {
      where: {
        user: {
          id: params.userId,
        },
      },
      skip: 0,
      take: 10,
      cache: true,
    };
    query["order"] = {
      count: "DESC",
    };
    return await UserTrack.find(query);
  }
}

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

apiRouter.get("/v1/api/user/:userId/top/:type", async (req, res) => {
  res.send(await getTop(req.params)).end();
});

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
