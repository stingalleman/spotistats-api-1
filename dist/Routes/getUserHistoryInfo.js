"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("../core/Auth");
const entities_1 = require("../entities");
async function default_1(req, res) {
    if (!Auth_1.sjoerdAuthAlgo(req)) {
        return res.status(401).json({ error: "unauthorized" });
    }
    const user = await entities_1.User.findOne({ where: { id: req.params.userID } });
    if (!user)
        return res.sendStatus(404);
    const timestamps = user.streams.map(stream => {
        return stream.timestamp;
    });
    const response = {};
    timestamps.forEach(timestamp => {
        const date = new Date(Number(timestamp));
        if (response[date.getFullYear()] === undefined)
            response[date.getFullYear()] = {};
        if (response[date.getFullYear()][date.getMonth()] === undefined)
            response[date.getFullYear()][date.getMonth()] = {};
        if (response[date.getFullYear()][date.getMonth()][date.getDate()] === undefined)
            response[date.getFullYear()][date.getMonth()][date.getDate()] = 0;
        response[date.getFullYear()][date.getMonth()][date.getDate()]++;
    });
    return res.json(response);
}
exports.default = default_1;
//# sourceMappingURL=getUserHistoryInfo.js.map