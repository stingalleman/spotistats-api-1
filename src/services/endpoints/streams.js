const { getUserSpotifyApi, resetSpotifyApiTokens } = require('../../utils/spotify-api.utils');
const Stream = require('../../models/stream.model');

/**
 * Gets the recently played tracks from the spotify api
 * @param {String} userId id of user whose tracks is wanted
 */
function getRecentlyPlayedTracks(userId) {
  return new Promise(
    (resolve, reject) => {
      getUserSpotifyApi(userId).then((spotifyApi) => {
        // TODO add after, before params
        spotifyApi.getMyRecentlyPlayedTracks().then(
          (data) => {
            resolve(data.body);
          },
          (err) => {
            reject(err);
          },
        ).finally(() => {
          resetSpotifyApiTokens(spotifyApi);
        });
      });
    },
  );
}

/**
 * Returns the stream history of a given user
 * @param {String} userId id of user
 * @param {Object<String, String>} item type (key) and id (value) for the query
 * @returns {Promise<Streams>} promise with play history
 */
function getStreams(userId, item) {
  return new Promise(
    // eslint-disable-next-line no-unused-vars
    (resolve, reject) => {
      const query = { userId };
      if (item !== undefined) {
        const type = Object.keys(item)[0];
        switch (type) {
          case 'track':
            query['track.id'] = item[type];
            break;
          case 'artist':
            query['track.artists'] = { $in: [item[type]] };
            break;
          case 'album':
            query['track.album'] = item[type];
            break;
          case 'context':
            query['plays.context'] = { $in: [item[type]] };
            break;
          default:
            break;
        }
      }

      Stream.find(query).then(
        (historyFound) => {
          resolve(historyFound);
        },
        (historyError) => {
          reject(historyError);
        },
      );
    },
  );
}

/**
 * Gets the currently playing track for a given user
 * @param {String} userId id of user
 * @returns {Promise<SpotifyApi.CurrentlyPlayingResponse>} promise of the currently playing track
 */
function getCurrentlyPlayingTrack(userId) {
  return new Promise(
    (resolve, reject) => {
      getUserSpotifyApi(userId).then((spotifyApi) => {
        spotifyApi.getMyCurrentPlayingTrack().then(
          (data) => {
            resolve(data.body);
          },
          (err) => {
            reject(err);
          },
        ).finally(() => {
          resetSpotifyApiTokens(spotifyApi);
        });
      });
    },
  );
}

module.exports = { getRecentlyPlayedTracks, getCurrentlyPlayingTrack, getStreams };
