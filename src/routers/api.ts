// import { Router } from "express";
// import { Between, getManager, LessThan } from "typeorm";
// import { UserTrack } from "../entities";

// const apiRouter = Router();

// async function getTop(req) {
//   try {
//     const limit = !req.query.limit ? 10 : req.query.limit;

//     if (req.params.type === "artists") {
//       return getManager().query(
//         `
//       SELECT
//         COUNT("artistName"), "artistName"
//       FROM
//         usertracks
//       WHERE
//         "userId" = $1
//       GROUP BY "artistName"
//       ORDER BY COUNT("artistName") DESC
//       LIMIT $2;
//       `,
//         [req.params.userId, limit]
//       );
//     } else {
//       const query = {
//         where: {
//           user: {
//             id: req.params.userId,
//           },
//         },
//         skip: 0,
//         take: limit,
//         cache: true,
//       };
//       query["order"] = {
//         count: "DESC",
//       };

//       const top = await UserTrack.find(query);

//       return {
//         length: top.length,
//         data: top,
//       };
//     }
//   } catch (e) {
//     return {
//       error: e.toString(),
//     };
//   }
// }

// async function getStreams(req) {
//   try {
//     const query: object = {
//       where: {
//         user: {
//           id: req.params.userId,
//         },
//       },
//       skip: 0,
//       take: 50,
//       cache: true,
//     };

//     if (req.params.artistName !== undefined) {
//       // query["artistName"] = encodeURI(req.params.artistName);
//       query["where"]["artistName"] = req.params.artistName;
//     }

//     if (req.params.trackName !== undefined) {
//       // query["trackName"] = encodeURI(req.params.trackName);
//       query["where"]["trackName"] = req.params.trackName;
//     }

//     if (req.query.before !== undefined && req.query.after === undefined) {
//       query["where"]["endTime"] = LessThan(new Date(req.query.before));
//     }

//     if (req.query.after !== undefined && req.query.before === undefined) {
//       query["where"]["endTime"] = Between(
//         new Date(req.query.before),
//         new Date(req.query.after)
//       );
//     }

//     if (req.query.limit !== undefined) {
//       query["where"] = req.query.limit;
//     }

//     const streams = await UserTrack.find(query);

//     return {
//       length: streams.length,
//       data: streams,
//     };
//   } catch (e) {
//     return {
//       error: e.toString(),
//     };
//   }
// }

// apiRouter.get("/v1/api/user/:userId/top/:type", async (req, res) => {
//   res.send(await getTop(req)).end();
// });

// apiRouter.get("/v1/api/user/:userId/streams", async (req, res) => {
//   res.send(await getStreams(req)).end();
// });

// apiRouter.get(
//   "/v1/api/user/:userId/streams/artist/:artistName",
//   async (req, res) => {
//     res.send(await getStreams(req)).end();
//   }
// );

// apiRouter.get(
//   "/v1/api/user/:userId/streams/artist/:artistName/track/:trackName",
//   async (req, res) => {
//     res.send(await getStreams(req)).end();
//   }
// );

// export default apiRouter;
