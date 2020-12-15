import SpotifyWebApi from "spotify-web-api-node";
import { User } from "src/entities";

/**
 * Resets the tokens for a given SpotifyWebApi oject
 * @param {SpotifyWebApi} spotifyApi SpotifyWebApi oject to reset
 */
export function resetSpotifyApiTokens(spotifyApi: SpotifyWebApi): void {
  spotifyApi.resetAccessToken();
  spotifyApi.resetRefreshToken();
}

/**
 * Gets the spotify api for a given user. Refreshes token if expired.
 * @param {String} userId userId of wanted user
 * @returns {Promise<SpotifyWebApi>} Promise of SpotifyWebApi object for the given user
 */
export function getUserSpotifyApi(user: User): Promise<SpotifyWebApi> {
  const redirectUri = process.env.SPOTIFY_AUTH_CALLBACK_URL;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecrect = process.env.SPOTIFY_CLIENT_SECRET;

  const spotifyApi = new SpotifyWebApi({
    redirectUri,
    clientSecret: clientSecrect,
    clientId,
  });

  return new Promise((resolve, reject) => {
    spotifyApi.setRefreshToken(user.settings.refreshToken);

    if (new Date(user.settings.accessTokenExpiration).getTime() < Date.now()) {
      spotifyApi.refreshAccessToken().then(
        (refreshResult) => {
          // Update token in DB
          const expirationDate = new Date(
            Date.now() + refreshResult.body.expires_in * 1000
          );
          user.settings.accessToken = refreshResult.body.access_token;
          user.settings.accessTokenExpiration = expirationDate;

          user.save();

          spotifyApi.setAccessToken(refreshResult.body.access_token);
          resolve(spotifyApi);
        },
        (refreshError) => {
          reject(refreshError);
        }
      );
    } else {
      spotifyApi.setAccessToken(user.settings.accessToken);
      resolve(spotifyApi);
    }
  });
}
