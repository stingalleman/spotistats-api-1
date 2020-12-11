"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylist = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const misc_1 = require("../misc");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getPlaylist(accessToken, playlistID) {
    const req = await node_fetch_1.default(`https://api.spotify.com/v1/playlists/${playlistID}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    // if (req.status === 429) { // if rate limited
    //   errorLogger(`rate limited! (getPlaylist) - retry: ${req.headers.get("Retry-After")}`);
    //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
    // } else
    if (req.status !== 200) { // if request not 200
        const makeResJson = await req.json();
        misc_1.errorLogger(`unexpected error! (getPlaylist)\nstatus: ${req.status}\nerror: ${JSON.stringify(makeResJson, null, " ")}`);
    }
    else {
        return await req.json();
    }
}
exports.getPlaylist = getPlaylist;
//# sourceMappingURL=getPlaylist.js.map