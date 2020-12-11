"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const Logger_1 = require("../misc/Logger");
const entities_1 = require("../entities");
async function default_1(req, res) {
    if (req.query.error) { // if callback is error
        Logger_1.errorLogger(`Callback Error! (error: ${req.query.error})`);
        return res.status(401).send(`Spotify auth failed..! (error: ${req.query.error}) Please try again in a couple of minutes. If the error keeps happening, contact api@spotistats.app`);
    }
    try {
        const request = await node_fetch_1.default("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        });
        const response = await request.json(); // get json body
        if (response.error)
            return res.status(401).send(`Spotify auth failed..! (error: ${response.error_description}) Please try again in a couple of minutes. If the error keeps happening, contact api@spotistats.app`);
        const user = await node_fetch_1.default("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${response.access_token}`
            }
        });
        const userResponse = await user.json(); // body json
        entities_1.User.create({
            refreshToken: response.refresh_token,
            id: userResponse.id,
            settings: {
                disabled: false,
                error: ""
            }
        }).save();
        return res.status(200).send("Auth successful! You can now close this window.");
    }
    catch (error) {
        const random = Math.floor(Math.random() * 100);
        Logger_1.errorLogger(`Error in authentication try/catch (${random})`, error);
        return res.status(401).send(`Spotify auth failed..! (request ID: ${random}) Please try again in a couple of minutes. If the error keeps happening, contact api@spotistats.app (and make sure to include the request ID!)`);
    }
}
exports.default = default_1;
//# sourceMappingURL=Callback.js.map