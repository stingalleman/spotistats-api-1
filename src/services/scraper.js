/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const User = require('../models/user.model');
const UserStream = require('../models/user-stream.model');
const { getUserSpotifyApi, resetSpotifyApiTokens } = require('../utils/spotify-api.utils');

const parseStream = async (user, track) => {
  const dbtrack = await UserStream.findOne({
    userId: user.id,
    'track.id': track.track.id,
  });

  let userStream = dbtrack;
  const hasContext = track.context !== null && typeof track.context.uri === 'string';

  if (dbtrack == null) {
    userStream = new UserStream({
      userId: user.id,
      track: {
        id: track.track.id,
        name: track.track.name,
        duration_ms: track.track.duration_ms,
        album: track.track.album.id,
        artists: track.track.artists.map((artist) => (artist.id)),
      },
      plays: [{
        played_at: new Date(track.played_at),
        context: hasContext ? track.context.uri : null,
      }],
    });
  } else if (
    userStream.plays.find((play) => play.played_at === track.played_at) === undefined
  ) {
    userStream.plays.push({
      played_at: track.played_at,
      context: hasContext ? track.context.uri : null,
    });
  }

  if (userStream !== dbtrack) {
    await userStream.save();
    return track.track.duration_ms;
  }
  return 0;
};

const scraper = async () => {
  try {
    console.time('⏱  Scraper');
    const users = await User.find({ disabled: false });

    for (const user of users) {
      const spotifyApi = await getUserSpotifyApi(user.id);

      const recentlyPlayed = (await spotifyApi.getMyRecentlyPlayedTracks({
        limit: 50,
      })).body.items;

      if (typeof user.total_ms !== 'number') {
        user.total_ms = 0;
      }

      const promises = recentlyPlayed.map((track) => parseStream(user, track));
      const values = (await Promise.all(promises));

      user.total_ms += values.reduce((a, b) => a + b);

      await user.save();

      await resetSpotifyApiTokens(spotifyApi);
    }
    // }));
  } catch (err) {
    console.error(err);
  }
  console.timeEnd('⏱  Scraper');
};

module.exports = scraper;
