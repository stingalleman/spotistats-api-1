// const { getUserSpotifyApi, resetSpotifyApiTokens } = require('../../utils/spotify-api.utils');
// const UserStreams = require('../../models/user-stream.model');

/**
 * Returns the stream history of a given user
 * @param {String} userId id of user
 * @param {Number} before id of user
 * @param {Number} after id of user
 * @returns {Promise<Streams>} promise with play history
 */
// function getTimerange(userId, before, after) {
//   return new Promise(
//     (resolve, reject) => {
//       const query = { userId };

//       if (before !== null) {
//         query['plays.playedAt'] = { $in: new Date(before) };
//       }
//       if (after !== null) {
//         query['plays.playedAt'] = { $in: new Date(before) };
//       }

//       UserStreams.find(query).then(
//         (historyFound) => {
//           resolve(historyFound);
//         },
//         (historyError) => {
//           reject(historyError);
//         },
//       );
//     },
//   );
// }
