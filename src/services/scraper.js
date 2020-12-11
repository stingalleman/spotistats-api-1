/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const User = require('../models/user.model');
const Stream = require('../models/stream.model');
const Track = require('../models/track.model');
const { getUserSpotifyApi, resetSpotifyApiTokens } = require('../utils/spotify-api.utils');

const parseStream = async (user, play) => {
  try {
    const dbtrack = await Track.findOne({
      trackId: play.track.id,
    });
    let track = dbtrack;

    if (dbtrack === null) {
      track = new Track({
        trackId: play.track.id,
        name: play.track.id,
        durationMs: play.track.duration_ms,
        albumId: play.track.album.id,
        // images: play.track.images.map((image) => (image.url)),
        explicit: play.track.explicit,
        artistIds: play.track.artists.map((artist) => (artist.id)),
      });
      await track.save();
    }

    const dbstream = await Stream.findOne({
      userId: user.id,
      track,
    });
    let stream = dbstream;

    const hasContext = play.context !== null && typeof play.context.uri === 'string';

    if (dbstream == null) {
      stream = new Stream({
        userId: user.id,
        track,
        streamCount: 1,
        streams: [{
          playedAt: new Date(play.played_at),
          context: hasContext ? play.context.uri.split(':')[2] : null,
        }],
      });
    } else if (
      stream.streams.find((item) => item.playedAt.getTime()
        === new Date(play.played_at).getTime()) === undefined
    ) {
      stream.streamCount += 1;
      stream.streams.push({
        playedAt: new Date(play.played_at),
        context: hasContext ? play.context.uri.split(':')[2] : null,
      });
    }

    if (stream !== dbstream) {
      await stream.save();
      return play.track.duration_ms;
    }
    return 0;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

const scraper = async () => {
  const consoleString = `(${new Date().toLocaleTimeString()}) ⏱  Scraper       `;
  try {
    console.time(consoleString);
    const users = await User.find({ disabled: false });

    for (const user of users) {
      const spotifyApi = await getUserSpotifyApi(user.id);

      const recentlyPlayed = (await spotifyApi.getMyRecentlyPlayedTracks({
        limit: 50,
      })).body.items;

      if (typeof user.totalMs !== 'number') {
        user.totalMs = 0;
      }

      const promises = recentlyPlayed.map((track) => parseStream(user, track));
      const values = (await Promise.all(promises));

      user.totalMs += values.reduce((a, b) => a + b);

      await user.save();

      await resetSpotifyApiTokens(spotifyApi);
    }
    // }));
  } catch (err) {
    // console.error(err);
  }
  console.timeEnd(consoleString);
};

module.exports = scraper;
