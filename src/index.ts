import "reflect-metadata";

// import schedule from "node-schedule";

import * as dotenv from "dotenv";
dotenv.config();

import database from "./core/Database";
import router from "./core/Router";
// import playlistSync from "./core/PlaylistSync";
import scraper from "./core/Scraper";
import importData from "./core/ImportData";

const bootstrap = async (): Promise<void> => {
  await database();
  await router();
  await scraper();
  // await importData("sjoerdgaatwakawaka");
  // await playlistSync();
};

bootstrap();

// // run scraper() every hour
// schedule.scheduleJob("0 */1 * * *", async () => {
//   await scraper();
// });

// // run playlistSync() every day
// schedule.scheduleJob("0 0 * * *", async () => {
//   await playlistSync();
// });
