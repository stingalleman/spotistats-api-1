/* eslint-disable no-empty */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import fs from "fs";
import { sleep } from "../misc";
import { User, UserTrack } from "../entities";

const parseUserTrack = async (user: User, stream): Promise<number> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      stream.artistName = encodeURI(stream.artistName);
      stream.trackName = encodeURI(stream.trackName);
      console.log(stream.trackName, "by", stream.artistName);
      let userTrack = await UserTrack.findOne({
        where: {
          //   user: { id: user.id },
          trackName: stream.trackName,
          artistName: stream.artistName,
        },
        // relations: ["user"],
      });

      if (userTrack === null || userTrack === undefined) {
        userTrack = await UserTrack.create({
          user: user,
          // track: track,
          trackName: stream.trackName,
          artistName: stream.artistName,
          durationMs: stream.msPlayed,
          count: 1,
          firstStream: new Date(stream.endTime),
          lastStream: new Date(stream.endTime),
        }).save();

        resolve(stream.msPlayed);
      } else {
        if (
          userTrack.lastStream.getTime() !== new Date(stream.endTime).getTime()
        ) {
          //   console.log(
          //     stream.trackName,
          //     "exists",
          //     userTrack.lastStream,
          //     new Date(stream.endTime)
          //   );
          const a = await UserTrack.create({
            id: userTrack.id,
            user: user,
            // track: track,
            trackName: stream.trackName,
            artistName: stream.artistName,
            durationMs:
              stream.msPlayed > userTrack.durationMs
                ? stream.msPlayed
                : userTrack.durationMs,
            count: userTrack.count + 1,
            firstStream: userTrack.firstStream,
            lastStream: new Date(stream.endTime),
          }).save();
          resolve(stream.msPlayed);
        }
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
      where: { id: userId },
      relations: ["stats"],
    });

    const importStreams: object[] = JSON.parse(
      fs.readFileSync("data/StreamingHistoryCombined.json", {
        encoding: "utf8",
      })
    ).sort(
      (a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
    );

    console.log(importStreams.length);
    const values = [];

    for (let i = 0; i < importStreams.length; i++) {
      const seconds = await parseUserTrack(user, importStreams[i]);
      values.push(seconds);
    }

    // const promises = importStreams.map(
    //   async (stream) => await parseUserTrack(user, stream)
    // );

    // const values = await Promise.all(promises);

    const newSeconds: number = values.reduce(
      (a: number, b: number) => a + b
    ) as number;
    user.stats.totalSeconds =
      BigInt(user.stats.totalSeconds) + BigInt(newSeconds);

    await user.save();
  } catch (e) {
    console.error(e.toString());
  }
  console.timeEnd(consoleString);
};
