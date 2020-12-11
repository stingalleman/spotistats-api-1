"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("../core/Auth");
const entities_1 = require("../entities");
async function default_1(req, res) {
    if (!Auth_1.sjoerdAuthAlgo(req)) {
        return res.status(401).json({ error: "unauthorized" });
    }
    const song = await entities_1.Song.findOne({ where: { id: req.params.songID }, relations: ["streams", "streams.user"] });
    if (!song)
        return res.sendStatus(404);
    if (req.query.start && !req.query.end) {
        res.json({
            error: "missing end query!"
        });
    }
    else if (req.query.end && !req.query.start) {
        res.json({
            error: "missing start query"
        });
    }
    else if (req.query.start && req.query.end) {
        const streams = song.streams.map(stream => {
            if (stream.timestamp >= parseInt(req.query.start) && stream.timestamp <= parseInt(req.query.end)) {
                return {
                    timestamp: stream.timestamp,
                    contextType: stream.contextType,
                    contextID: stream.contextID
                };
            }
        });
        return res.json({
            total: streams.sort((x, i) => x.timestamp - i.timestamp).filter(x => { return x !== undefined; }).length,
            totalDB: song.streams.length,
            streams: streams.sort((x, i) => x.timestamp - i.timestamp).filter(x => { return x !== undefined; })
        });
    }
    else {
        const streams = song.streams.map(stream => {
            return {
                timestamp: stream.timestamp,
                contextType: stream.contextType,
                contextID: stream.contextID
            };
        });
        return res.json({
            songID: song.id,
            songLength: song.length,
            total: streams.sort((x, i) => x.timestamp - i.timestamp).filter(x => { return x !== undefined; }).length,
            totalDB: song.streams.length,
            streams: streams.sort((x, i) => x.timestamp - i.timestamp).filter(x => { return x !== undefined; })
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=getSongStreams.js.map