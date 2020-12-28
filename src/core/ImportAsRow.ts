/* eslint-disable no-empty */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import fs from "fs";
import { sleep } from "../misc";
import { User, UserTrack } from "../entities";
import { getManager } from "typeorm";

const parseUserTrack = async (user: User, stream): Promise<number> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      stream.artistName = encodeURI(stream.artistName);
      stream.trackName = encodeURI(stream.trackName);
      //   console.log(stream.trackName, "by", stream.artistName);
      let userTrack = await UserTrack.findOne({
        where: {
          user: { id: user.id },
          trackName: stream.trackName,
          artistName: stream.artistName,
          endTime: stream.endTime,
        },
        // relations: ["user"],
      });

      if (userTrack === null || userTrack === undefined) {
        userTrack = await UserTrack.create({
          user: user,
          // track: track,
          trackName: stream.trackName,
          artistName: stream.artistName,
          msPlayed: stream.msPlayed,
          endTime: stream.endTime,
          //   durationMs: stream.msPlayed,
          //   count: 1,
          //   firstStream: new Date(stream.endTime),
          //   lastStream: new Date(stream.endTime),
        }).save();

        resolve(stream.msPlayed);
      }

      resolve(userTrack.msPlayed);
    } catch (e) {
      console.error(e);
      resolve(0);
    }
  });
};

const insertAll = async (user: User, data) => {
  return new Promise<void>(async (resolve, reject) => {
    const parsed = data.map((stream) => {
      stream.trackName = encodeURI(stream.trackName);
      stream.artistName = encodeURI(stream.artistName);
      stream.endTime = new Date(stream.endTime);
      let id = "";
      id += user.id[0] ?? "a";
      id += user.id[3] ?? "a";
      id += user.id[5] ?? "a";
      id += stream.trackName[0] ?? "a";
      id += stream.trackName[3] ?? "a";
      id += stream.trackName[5] ?? "a";
      id += stream.artistName[0] ?? "a";
      id += stream.artistName[3] ?? "a";
      id += stream.artistName[5] ?? "a";
      id += stream.endTime.getDay() ?? "a";
      id += stream.endTime.getMonth() ?? "a";
      id += stream.endTime.getYear() ?? "a";
      id += stream.msPlayed.toString() ?? "a";
      // id += stream.msPlayed.toString()[2] ?? "a";
      // id += stream.msPlayed.toString()[4] ?? "a";
      // id +=
      //   stream.msPlayed.toString()[stream.msPlayed.toString().length - 1] ??
      //   "a";

      // console.log(id);

      return {
        id: id,
        user: user,
        trackName: stream.trackName,
        artistName: stream.artistName,
        msPlayed: stream.msPlayed,
        endTime: stream.endTime,
      };
    });

    const manager = await getManager();
    const chunk = 5000;
    let i, j, temparray;
    for (i = 0, j = parsed.length; i < j; i += chunk) {
      temparray = parsed.slice(i, i + chunk);
      manager
        .createQueryBuilder()
        .insert()
        .into(UserTrack)
        .values(temparray)
        // eslint-disable-next-line @typescript-eslint/quotes
        .onConflict('("id") DO NOTHING')
        .execute();
    }

    resolve();
  });
};

export default async (userId: string): Promise<void> => {
  const consoleString = `(${new Date().toLocaleTimeString()}) ⏱  Import       ${userId}`;
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

    await insertAll(user, importStreams);

    // console.log(importStreams.length);
    // const values = [];

    // for (let i = 0; i < importStreams.length; i++) {
    //   await parseUserTrack(user, importStreams[i]);
    //   //   values.push(seconds);
    // }

    // const promises = importStreams.map(
    //   async (stream) => await parseUserTrack(user, stream)
    // );

    // const values = await Promise.all(promises);

    // const newSeconds: number = values.reduce(
    //   (a: number, b: number) => a + b
    // ) as number;
    // user.stats.totalSeconds =
    //   BigInt(user.stats.totalSeconds) + BigInt(newSeconds);

    // await user.save();
  } catch (e) {
    console.error(e.toString());
  }
  console.timeEnd(consoleString);
};
