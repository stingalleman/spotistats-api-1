require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const robots = require("express-robots-txt");
const { graphqlHTTP } = require("express-graphql");

const Schema = require("./schemas/schema");

const auth = require("./middleware/auth");

const authRouter = require("./routes/authorization");
const historyRouter = require("./routes/streams");
const staticRouter = require("./routes/static");

const scraper = require("./services/scraper");
const playlistSync = require("./services/playlist-sync");

const router = async () => {
  const app = express();
  const port = process.env.PORT || 8080;
  app
    .use(cors())
    .use(robots({ UserAgent: "*", Disallow: "/" }))
    .use("/api/auth", authRouter)
    .use("/api/user", auth, historyRouter)
    .use(
      "/api/graphql",
      auth,
      graphqlHTTP({
        schema: Schema,
        graphiql: true,
      })
    )
    .use("/*", staticRouter)
    .listen(port, () =>
      console.info(
        `(${new Date().toLocaleTimeString()}) 👋 Server running (${port})`
      )
    );
};

const database = async () => {
  await mongoose.connect(process.env.DB_URI, {
    auth: { user: process.env.DB_USER, password: process.env.DB_PASS },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.info(`(${new Date().toLocaleTimeString()}) 🎉 Database connected`);
};

const cron = async () => {
  /// run scraper() every hour
  schedule.scheduleJob("0 */1 * * *", async () => {
    await scraper();
  });

  /// run playlistSync() every day
  schedule.scheduleJob("0 0 * * *", async () => {
    await playlistSync();
  });
  console.info(`(${new Date().toLocaleTimeString()}) 🙃 Crons configured`);
};

const bootstrap = async () => {
  await database();
  await router();
  await cron();
  await scraper();
  await playlistSync();
};

bootstrap();
