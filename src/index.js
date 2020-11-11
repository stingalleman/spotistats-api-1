require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const schedule = require('node-schedule');

const authRouter = require('./routes/authorization');
const historyRouter = require('./routes/user-stream');

const scraper = require('./services/scraper');

const router = async () => {
  const app = express();
  const port = process.env.PORT || 8888;
  app.use(cors())
    .use('/api/auth', authRouter)
    .use('/api/user', historyRouter)
    .listen(port, () => console.log(`Spotistats API server running on port ${port}`));
};

const database = async () => {
  mongoose.connect(process.env.DB_URI, {
    auth: { user: process.env.DB_USER, password: process.env.DB_PASS },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

// run scraper() every hour
schedule.scheduleJob('0 */1 * * *', async () => {
  await scraper();
});

// run playlistSync() every day
// schedule.scheduleJob("0 0 * * *", async _ => {
//   await playlistSync();
// });

const bootstrap = async () => {
  await database();
  await router();
  await scraper();
  // await playlistSync();
};

bootstrap();
