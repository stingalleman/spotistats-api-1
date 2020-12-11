"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("../core/Auth");
const entities_1 = require("../entities");
async function default_1(req, res) {
    if (!Auth_1.sjoerdAuthAlgo(req)) {
        return res.status(401).json({ error: "unauthorized" });
    }
    const stream = await entities_1.Stream.find({ relations: ["userID"] });
    if (!stream)
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
        const streams = stream.map(stream => {
            if (stream.timestamp >= parseInt(req.query.start) && stream.timestamp <= parseInt(req.query.end)) {
                return {
                    songID: stream.song.id,
                    timestamp: stream.timestamp,
                    songLength: stream.song.length,
                    contextType: stream.contextType,
                    contextID: stream.contextID
                };
            }
        });
        return res.json({
            total: streams.sort((x, i) => x.timestamp - i.timestamp).filter(x => { return x !== undefined; }).length,
            totalDB: stream.length,
            streams: streams.sort((x, i) => x.timestamp - i.timestamp).filter(x => { return x !== undefined; })
        });
    }
    else {
        const streams = stream.map(stream => {
            return {
                songID: stream.song.id,
                timestamp: stream.timestamp,
                songLength: stream.song.length,
                contextType: stream.contextType,
                contextID: stream.contextID
            };
        });
        return res.json({
            total: streams.sort((x, i) => x.timestamp - i.timestamp).filter(x => { return x !== undefined; }).length,
            totalDB: stream.length,
            streams: streams.sort((x, i) => x.timestamp - i.timestamp).filter(x => { return x !== undefined; })
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=getStreams.js.map