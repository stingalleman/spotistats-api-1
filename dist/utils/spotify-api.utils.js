"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSpotifyApi = exports.resetSpotifyApiTokens = void 0;
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
/**
 * Resets the tokens for a given SpotifyWebApi oject
 * @param {SpotifyWebApi} spotifyApi SpotifyWebApi oject to reset
 */
function resetSpotifyApiTokens(spotifyApi) {
    spotifyApi.resetAccessToken();
    spotifyApi.resetRefreshToken();
}
exports.resetSpotifyApiTokens = resetSpotifyApiTokens;
/**
 * Gets the spotify api for a given user. Refreshes token if expired.
 * @param {String} userId userId of wanted user
 * @returns {Promise<SpotifyWebApi>} Promise of SpotifyWebApi object for the given user
 */
function getUserSpotifyApi(user) {
    const redirectUri = process.env.SPOTIFY_AUTH_CALLBACK_URL;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecrect = process.env.SPOTIFY_CLIENT_SECRET;
    const spotifyApi = new spotify_web_api_node_1.default({
        redirectUri,
        clientSecret: clientSecrect,
        clientId,
    });
    return new Promise((resolve, reject) => {
        spotifyApi.setRefreshToken(user.settings.refreshToken);
        if (user.settings.accessTokenExpiration.getTime() > new Date().getTime()) {
            spotifyApi.refreshAccessToken().then((refreshResult) => {
                // Update token in DB
                const expirationDate = new Date(Date.now() + refreshResult.body.expires_in * 1000);
                user.settings.accessToken = refreshResult.body.access_token;
                user.settings.accessTokenExpiration = expirationDate;
                user.save();
                spotifyApi.setAccessToken(refreshResult.body.access_token);
                resolve(spotifyApi);
            }, (refreshError) => {
                reject(refreshError);
            });
        }
        else {
            spotifyApi.setAccessToken(user.settings.accessToken);
            resolve(spotifyApi);
        }
    });
}
exports.getUserSpotifyApi = getUserSpotifyApi;
//# sourceMappingURL=spotify-api.utils.js.map