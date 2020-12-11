"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlaylist = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const misc_1 = require("../misc");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updatePlaylist(accessToken, playlistID, description) {
    const req = await node_fetch_1.default(`https://api.spotify.com/v1/playlists/${playlistID}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: description
        })
    });
    // if (req.status === 429) { // if rate limited
    //   errorLogger(`rate limited! (updatePlaylist) - retry: ${req.headers.get("Retry-After")}`);
    //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
    // } else
    if (req.status !== 200) { // if request not 200
        const makeResJson = await req.json();
        misc_1.errorLogger(`unexpected error! (playlistsync updatereq)\nstatus: ${req.status}\nerror: ${JSON.stringify(makeResJson, null, " ")}`);
    }
    else {
        return "success!";
    }
}
exports.updatePlaylist = updatePlaylist;
//# sourceMappingURL=updatePlaylist.js.map