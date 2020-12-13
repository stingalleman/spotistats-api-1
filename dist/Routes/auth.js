"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const entities_1 = require("../entities");
const spotify_api_utils_1 = require("../utils/spotify-api.utils");
// export default async function (req: Request, res: Response): Promise<unknown> {
//   if (req.query.error) {
//     // if callback is error
//     errorLogger(`Callback Error! (error: ${req.query.error})`);
//     return res
//       .status(401)
//       .send(
//         `Spotify auth failed..! (error: ${req.query.error}) Please try again in a couple of minutes. If the error keeps happening, contact api@spotistats.app`
//       );
//   }
// }
const authRouter = express_1.Router();
const scopes = [
    "user-read-recently-played",
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-follow-read",
    "user-library-read",
    "user-read-email",
    "user-read-private",
];
const redirectUri = process.env.SPOTIFY_AUTH_CALLBACK_URL;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecrect = process.env.SPOTIFY_CLIENT_SECRET;
// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
const getAuthorizeURL = () => {
    const spotifyApi = new spotify_web_api_node_1.default({
        redirectUri,
        clientSecret: clientSecrect,
        clientId,
    });
    // TODO make state depend on the request. Maybe a hash of a cookie or something?
    const state = "spotify_auth_state";
    // Return the authorization URL
    return spotifyApi.createAuthorizeURL(scopes, state);
};
authRouter.get("/v1/auth/redirect", (req, res) => {
    const authorizeURL = getAuthorizeURL();
    res.redirect(301, authorizeURL);
});
authRouter.get("/v1/auth/callback/url", (req, res) => {
    const authorizeURL = getAuthorizeURL();
    res.send({ authUrl: authorizeURL });
});
authRouter.get("/v1/auth/callback", async (req, res) => {
    const code = req.query.code || null;
    // The returnedState should be compared with the sent one.
    // const returnedState = req.query.state || null;
    const spotifyApi = new spotify_web_api_node_1.default({
        redirectUri,
        clientSecret: clientSecrect,
        clientId,
    });
    const data = await spotifyApi.authorizationCodeGrant(code);
    spotifyApi.setAccessToken(data.body.access_token);
    spotifyApi.setRefreshToken(data.body.refresh_token);
    const expiryDate = new Date(Date.now() + data.body.expires_in * 1000);
    const userData = await spotifyApi.getMe();
    const userId = userData.body.id;
    // search if user already exists
    const foundUser = await entities_1.User.findOne({
        where: { id: userId },
        relations: ["settings"],
    });
    let user = foundUser;
    // if user doenst exist create one
    if (user === null) {
        user = entities_1.User.create({
            id: userId,
            streams: [],
            disabled: false,
        });
    }
    // update auth on the (existing) user
    user.settings = entities_1.UserSettings.create({
        refreshToken: data.body.refresh_token,
        accessToken: data.body.access_token,
        accessTokenExpiration: expiryDate,
    });
    // save all changes to the user
    user.save();
    const jwtSecret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign(userId, jwtSecret);
    res.setHeader("Authorization", token);
    res.send({ token });
    spotify_api_utils_1.resetSpotifyApiTokens(spotifyApi);
});
exports.default = authRouter;
//# sourceMappingURL=auth.js.map