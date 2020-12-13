/* eslint-disable no-empty */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import fs from "fs";
import { Stream, User } from "../entities";

const parseStream = async (user: User, track): Promise<number> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      let stream = await Stream.findOne({
        userId: user.id,
        // user: user,
        endTime: new Date(track.endTime),
        msPlayed: track.msPlayed,
      });

      if (stream === null || stream === undefined) {
        stream = await Stream.create({
          userId: user.id,
          //   user: user,
          endTime: new Date(track.endTime),
          contextId: null,
          trackName: encodeURI(track.trackName),
          artistName: encodeURI(track.artistName),
          msPlayed: track.msPlayed,
        }).save();

        resolve(stream.msPlayed);
      } else {
        resolve(0);
      }
    } catch (e) {
      console.error(e);
      resolve(0);
    }
  });
};

export default async (userId: string): Promise<void> => {
  const consoleString = `(${new Date().toLocaleTimeString()}) ⏱  Import       `;
  try {
    console.time(consoleString);
    const user = await User.findOne({
      id: userId,
    });

    if (typeof user.totalSeconds !== "number") {
      user.totalSeconds = BigInt(0);
    }

    const importStreams: object[] = JSON.parse(
      fs.readFileSync("data/StreamingHistory1.json", { encoding: "utf8" })
    );

    console.log(importStreams.length);
    // importStreams = importStreams.splice(0, 30);
    // console.log(importStreams.length);

    const promises = importStreams.map((track) => parseStream(user, track));
    const values: number[] = await Promise.all(promises);

    user.totalSeconds += BigInt(
      Math.round(values.reduce((a, b) => a + b) / 1000)
    );
    console.log(user.totalSeconds);

    await user.save();

    //   await resetSpotifyApiTokens(spotifyApi);
  } catch (err) {
    console.error(err);
  }
  console.timeEnd(consoleString);
};
