/* eslint-disable no-empty */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import SpotifyWebApi from "spotify-web-api-node";
import { Stream, User, UserSettings } from "../entities";
import {
  getUserSpotifyApi,
  resetSpotifyApiTokens,
} from "../utils/spotify-api.utils";

const parseStream = async (user: User, track) => {
  try {
    let stream = await Stream.findOne({
      userId: user.id,
      // user: user,
      endTime: track.playedAt,
    });

    if (stream === null || stream === undefined) {
      const hasContext =
        track.context !== null && typeof track.context.uri === "string";
      let msPlayed = 0;
      try {
        msPlayed = track.msPlayed;
      } catch (e) {}
      try {
        msPlayed = track.track.duration_ms;
      } catch (e) {}

      stream = await Stream.create({
        userId: user.id,
        // user: user,
        endTime: new Date(track.played_at),
        contextId: hasContext ? track.context.uri.split(":")[2] : null,
        trackName: encodeURI(track.track.name),
        artistName: encodeURI(track.track.artists[0].name),
        msPlayed: msPlayed,
      }).save();

      return stream.msPlayed;
    } else {
      return 0;
    }
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export default async (): Promise<void> => {
  const consoleString = `(${new Date().toLocaleTimeString()}) ⏱  Scraper       `;
  try {
    console.time(consoleString);
    const users = await User.find({
      relations: ["settings"],
    });

    for (const user of users) {
      const spotifyApi = await getUserSpotifyApi(user);

      const recentlyPlayed = (
        await spotifyApi.getMyRecentlyPlayedTracks({
          limit: 50,
        })
      ).body.items;

      if (typeof user.totalSeconds !== "number") {
        user.totalSeconds = BigInt(0);
      }

      const promises = recentlyPlayed.map((track) => parseStream(user, track));
      const values = await Promise.all(promises);

      user.totalSeconds += BigInt(
        Math.round(values.reduce((a, b) => a + b) / 1000)
      );

      await user.save();

      await resetSpotifyApiTokens(spotifyApi);
    }
  } catch (err) {
    console.error(err);
  }
  console.timeEnd(consoleString);
};
