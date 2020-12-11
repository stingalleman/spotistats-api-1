"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const misc_1 = require("../misc");
const entities_1 = require("../entities");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getAccessToken(refreshToken, userID) {
    const req = await node_fetch_1.default("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    });
    // if (req.status === 429) { // if rate limited
    //   errorLogger(`rate limited! (getAccessToken) - retry: ${req.headers.get("Retry-After")}`);
    //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
    // } else
    if (req.status === 400) {
        const json = await req.json();
        if (json.error_description === "Refresh token revoked") {
            await entities_1.User.create({
                id: userID,
                settings: {
                    disabled: true,
                    error: "Refresh Token Revoked"
                }
            }).save();
            misc_1.errorLogger(`user ${userID} revoked his refresh token!`);
        }
    }
    else if (req.status !== 200) { // if request not 200
        misc_1.errorLogger(`unexpected error! (getAccessToken)\nstatus: ${req.status}\nerror: ${JSON.stringify(await req.json(), null, " ")}`);
    }
    else {
        const json = await req.json();
        return json.access_token;
    }
}
exports.getAccessToken = getAccessToken;
//# sourceMappingURL=getAccessToken.js.map