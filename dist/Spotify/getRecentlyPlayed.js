"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentlyPlayed = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const misc_1 = require("../misc");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getRecentlyPlayed(accessToken) {
    const req = await node_fetch_1.default("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    });
    // if (req.status === 429) { // if rate limited
    //   errorLogger(`rate limited! (getRecentlyPlayed) - retry: ${req.headers.get("Retry-After")}`);
    //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
    // } else
    if (req.status !== 200) { // if request not 200
        misc_1.errorLogger(`unexpected error! (getRecentlyPlayed)\nstatus: ${req.status}\nerror: ${JSON.stringify(await req.json(), null, " ")}`);
    }
    else {
        return await req.json();
    }
}
exports.getRecentlyPlayed = getRecentlyPlayed;
//# sourceMappingURL=getRecentlyPlayed.js.map