"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("../core/Auth");
const entities_1 = require("../entities");
async function default_1(req, res) {
    if (!Auth_1.sjoerdAuthAlgo(req)) {
        return res.status(401).json({ error: "unauthorized" });
    }
    const streams = await entities_1.Stream.find({ user: { id: req.params.userID }, artistID: req.params.artistID });
    const songStreams = streams.map((doc) => {
        return {
            timestamp: doc.timestamp,
            contextType: doc.contextType,
            contextID: doc.contextID
        };
    });
    return res.json({
        userID: req.params.userID,
        songID: req.params.songID,
        length: songStreams.length,
        streams: songStreams
    });
}
exports.default = default_1;
//# sourceMappingURL=getUserArtist.js.map