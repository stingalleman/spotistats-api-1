"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
/**
 * Resets the tokens for a given SpotifyWebApi oject
 * @param {SpotifyWebApi} spotifyApi SpotifyWebApi oject to reset
 */
function resetSpotifyApiTokens(spotifyApi) {
    spotifyApi.resetAccessToken();
    spotifyApi.resetRefreshToken();
}
/**
 * Gets the spotify api for a given user. Refreshes token if expired.
 * @param {String} userId userId of wanted user
 * @returns {Promise<SpotifyWebApi>} Promise of SpotifyWebApi object for the given user
 */
function getUserSpotifyApi(userId) {
    const redirectUri = process.env.SPOTIFY_AUTH_CALLBACK_URL;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecrect = process.env.SPOTIFY_CLIENT_SECRET;
    const spotifyApi = new spotify_web_api_node_1.default({
        redirectUri,
        clientSecret: clientSecrect,
        clientId,
    });
    return;
    //   return new Promise((resolve, reject) => {
    //     User.findById(userId).then(
    //       (foundUser) => {
    //         const user = foundUser;
    //         if (user === null) {
    //           const userNotFoundError = new Error("User not found");
    //           reject(userNotFoundError);
    //         } else {
    //           const { refreshToken } = user.spotifyAuth;
    //           spotifyApi.setRefreshToken(refreshToken);
    //           if (user.isSpotifyTokenExpired()) {
    //             spotifyApi.refreshAccessToken().then(
    //               (refreshResult) => {
    //                 // Update token in DB
    //                 const expirationDate = new Date(
    //                   Date.now() + refreshResult.body.expires_in * 1000
    //                 );
    //                 user.spotifyAuth.accessToken = refreshResult.body.access_token;
    //                 user.spotifyAuth.accessTokenExpiration = expirationDate;
    //                 user.save();
    //                 spotifyApi.setAccessToken(refreshResult.body.access_token);
    //                 resolve(spotifyApi);
    //               },
    //               (refreshError) => {
    //                 reject(refreshError);
    //               }
    //             );
    //           } else {
    //             spotifyApi.setAccessToken(user.spotifyAuth.accessToken);
    //             resolve(spotifyApi);
    //           }
    //         }
    //       },
    //       (findError) => {
    //         reject(findError);
    //       }
    //     );
    //   });
}
module.exports = { getUserSpotifyApi, resetSpotifyApiTokens };
//# sourceMappingURL=utils.js.map