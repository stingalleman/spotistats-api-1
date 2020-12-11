"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopTracks = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const misc_1 = require("../misc");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getTopTracks(accessToken) {
    try {
        const req = await node_fetch_1.default("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        });
        // if (req.status === 429) { // if rate limited
        //   errorLogger(`rate limited! (getTopTracks) - retry: ${req.headers.get("Retry-After")}`);
        //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
        // } else
        if (req.status !== 200) { // if request not 200
            misc_1.errorLogger(`unexpected error! (getTopTracks)\nstatus: ${req.status}\nerror: ${JSON.stringify(await req.json(), null, " ")}`);
        }
        else {
            return await req.json();
        }
    }
    catch (err) {
        misc_1.errorLogger('reeee', err);
    }
}
exports.getTopTracks = getTopTracks;
//# sourceMappingURL=getTopTracks.js.map