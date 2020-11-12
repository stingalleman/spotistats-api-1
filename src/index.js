require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const { graphqlHTTP } = require('express-graphql');

const Schema = require('./schemas/schema');

const authRouter = require('./routes/authorization');
const historyRouter = require('./routes/user-stream');
const staticRouter = require('./routes/static');

const scraper = require('./services/scraper');
const playlistSync = require('./services/playlist-sync');

const router = async () => {
  const app = express();
  const port = process.env.PORT || 8080;
  app.use(cors())
    .use('/api/auth', authRouter)
    .use('/api/user', historyRouter)
    .use('/api/graphql', graphqlHTTP({
      schema: Schema,
      graphiql: true,
    }))
    .use('/*', staticRouter)
    .listen(port, () => console.info(`👋 Server running (${port})`));
};

const database = async () => {
  await mongoose.connect(process.env.DB_URI, {
    auth: { user: process.env.DB_USER, password: process.env.DB_PASS },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.info('🎉 Database connected');
};

/// run scraper() every hour
schedule.scheduleJob('0 */1 * * *', async () => {
  await scraper();
});

/// run playlistSync() every day
schedule.scheduleJob('0 0 * * *', async () => {
  await playlistSync();
});

const bootstrap = async () => {
  await database();
  await router();
  await scraper();
  await playlistSync();
};

bootstrap();
