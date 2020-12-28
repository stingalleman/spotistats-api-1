import "reflect-metadata";

// import schedule from "node-schedule";

import * as dotenv from "dotenv";
dotenv.config();

import database from "./core/Database";
import router from "./core/Router";
import playlistSync from "./core/PlaylistSync";
import scraper from "./core/Scraper";
import importData from "./core/ImportAsRow";
import { User, UserSettings, UserStats } from "./entities";

const bootstrap = async (): Promise<void> => {
  await database();
  await router();
  // await scraper();
  // await importData("sjoerdgaatwakawaka10");
  createTestUsers();
  // importTestData();
  // importData("sjoerdgaatwakawaka7");
  // importData("sjoerdgaatwakawaka8");
  // importData("sjoerdgaatwakawaka9");
  // importData("sjoerdgaatwakawaka10");
  // await playlistSync();
};

bootstrap();

async function importTestData() {
  for (let i = 5; i < 1000; i++) {
    await importData(`sjoerdgaatwakawaka${i}`);
  }
}

async function createTestUsers() {
  for (let i = 5; i < 1000; i++) {
    console.log(`sjoerdgaatwakawaka${i}`);
    const user = User.create({
      id: `sjoerdgaatwakawaka${i}`,
      displayName: "displayName",
      // streams: [],
      disabled: false,
    });

    user.stats = UserStats.create({
      totalSeconds: BigInt(0),
    });

    // update auth on the (existing) user
    user.settings = UserSettings.create({
      refreshToken: `data.body.refresh_token${i}`,
      accessToken: "data.body.access_token",
      accessTokenExpiration: new Date(),
    });

    // save all changes to the user
    await user.save();
  }
}

// // run scraper() every hour
// schedule.scheduleJob("0 */1 * * *", async () => {
//   await scraper();
// });

// // run playlistSync() every day
// schedule.scheduleJob("0 0 * * *", async () => {
//   await playlistSync();
// });
