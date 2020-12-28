/* eslint-disable no-empty */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { User, UserTrack } from "../entities";
import {
  getUserSpotifyApi,
  resetSpotifyApiTokens,
} from "../utils/spotify-api.utils";

const parseUserTrack = async (user: User, stream): Promise<number> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // try {
    //   stream.artistName = encodeURI(stream.track.artists[0].name);
    //   stream.trackName = encodeURI(stream.track.name);
    //   // let [userTrack, track] = await Promise.all([
    //   //   UserTrack.findOne({
    //   //     where: {
    //   //       user: { id: user.id },
    //   //       track: { id: stream.track.id },
    //   //     },
    //   //     relations: ["user", "track"],
    //   //   }),
    //   //   Track.findOne({
    //   //     id: stream.track.id,
    //   //   }),
    //   // ]);
    //   let userTrack = await UserTrack.findOne({
    //     where: {
    //       user: { id: user.id },
    //       trackName: stream.trackName,
    //       artistName: stream.artistName,
    //     },
    //     relations: ["user"],
    //   });

    //   // if (track === null || track === undefined) {
    //   //   try {
    //   //     track = await Track.create({
    //   //       id: stream.track.id,
    //   //       name: stream.track.name,
    //   //       artistId: stream.track.artists[0].id,
    //   //       durationMs: stream.track.duration_ms,
    //   //       explicit: stream.track.explicit,
    //   //     }).save();
    //   //   } catch (e) {}
    //   // }

    //   if (userTrack === null || userTrack === undefined) {
    //     // const hasContext =
    //     //   stream.context !== null && typeof stream.context.uri === "string";

    //     userTrack = await UserTrack.create({
    //       user: user,
    //       // track: track,
    //       trackName: stream.trackName,
    //       artistName: stream.artistName,
    //       durationMs: stream.track.duration_ms,
    //       count: 1,
    //       firstStream: new Date(stream.played_at),
    //       lastStream: new Date(stream.played_at),
    //     }).save();

    //     resolve(stream.track.duration_ms);
    //   } else {
    //     if (
    //       userTrack.lastStream.getTime() !==
    //       new Date(stream.played_at).getTime()
    //     ) {
    //       const a = await UserTrack.create({
    //         id: userTrack.id,
    //         user: user,
    //         // track: track,
    //         trackName: stream.trackName,
    //         artistName: stream.artistName,
    //         durationMs: stream.track.duration_ms,
    //         count: userTrack.count + 1,
    //         firstStream: userTrack.firstStream,
    //         lastStream: new Date(stream.played_at),
    //       }).save();
    //       resolve(stream.track.duration_ms);
    //     }
    //     resolve(0);
    //   }
    // } catch (e) {
    //   console.error(e);
    resolve(0);
    // }
  });
};

export default async (): Promise<void> => {
  const consoleString = `(${new Date().toLocaleTimeString()}) ⏱  Scraper       `;
  try {
    console.time(consoleString);
    const users = await User.find({
      relations: ["settings", "stats"],
    });

    for (const user of users) {
      const spotifyApi = await getUserSpotifyApi(user);

      const recentlyPlayed = (
        await spotifyApi.getMyRecentlyPlayedTracks({
          limit: 50,
        })
      ).body.items;

      const promises = recentlyPlayed.map(
        async (stream) => await parseUserTrack(user, stream)
      );

      const values = await Promise.all(promises);

      const newSeconds: number = values.reduce(
        (a: number, b: number) => a + b
      ) as number;
      user.stats.totalSeconds =
        BigInt(user.stats.totalSeconds) + BigInt(newSeconds);

      await user.save();

      await resetSpotifyApiTokens(spotifyApi);
    }
  } catch (err) {
    console.error(err);
  }
  console.timeEnd(consoleString);
};
