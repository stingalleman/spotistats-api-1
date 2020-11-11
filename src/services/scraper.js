/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const User = require('../models/user.model');
const UserStream = require('../models/user-stream.model');
const { getUserSpotifyApi, resetSpotifyApiTokens } = require('../utils/spotify-api.utils');

const scraper = async () => {
  try {
    console.time('⏱  Scraper');
    const users = await User.find({ disabled: false });

    for (const user of users) {
      const spotifyApi = await getUserSpotifyApi(user.id);

      const recentlyPlayed = (await spotifyApi.getMyRecentlyPlayedTracks({
        limit: 50,
      })).body.items;

      for (const track of recentlyPlayed) {
        UserStream.findOne({
          userId: user.id,
          'track.id': track.track.id,
        }, async (err, dbtrack) => {
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
                played_at: track.played_at,
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
          }
        });
      }

      await resetSpotifyApiTokens(spotifyApi);
    }
    // }));
  } catch (err) {
    console.error(err);
  }
  console.timeEnd('⏱  Scraper');
};

module.exports = scraper;