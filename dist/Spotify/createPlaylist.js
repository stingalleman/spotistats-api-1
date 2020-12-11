"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlaylist = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const misc_1 = require("../misc");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createPlaylist(accessToken, userID, display_name) {
    const res = await node_fetch_1.default(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: `${display_name}'s Top Tracks (Past 4 Weeks)`,
            public: true,
            collaborative: false,
            description: `Generated and synced by Spotistats for iPhone and Android. Last sync: ${new Date().toLocaleString("en-us", { weekday: "long" })}`
        })
    });
    // if (res.status === 429) { // if rate limited
    //   errorLogger(`rate limited! (createPlaylist) - retry: ${res.headers.get("Retry-After")}`);
    //   await sleep(parseInt(res.headers.get("Retry-After")) + 3);
    // } else
    if (res.status !== (201 || 200)) { // if request not 200
        misc_1.errorLogger(`unexpected error! (createPlaylist)\nstatus: ${res.status}\nerror: ${JSON.stringify(await res.json(), null, " ")}`);
    }
    else {
        return await res.json();
    }
}
exports.createPlaylist = createPlaylist;
//# sourceMappingURL=createPlaylist.js.map