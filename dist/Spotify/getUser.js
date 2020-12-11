"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const Logger_1 = require("../misc/Logger");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getUser(accessToken) {
    const req = await node_fetch_1.default("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    });
    // if (req.status === 429) { // if rate limited
    //   errorLogger(`rate limited! (getUser) - retry: ${req.headers.get("Retry-After")}`);
    //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
    // } else
    if (req.status !== 200) { // if request not 200
        Logger_1.errorLogger(`unexpected error! (getUser)\nstatus: ${req.status}\nerror: ${JSON.stringify(await req.json(), null, " ")}`);
    }
    else {
        return await req.json();
    }
}
exports.getUser = getUser;
//# sourceMappingURL=getUser.js.map