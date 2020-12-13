"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-empty */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const fs_1 = __importDefault(require("fs"));
const entities_1 = require("../entities");
const parseStream = async (user, track) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            let stream = await entities_1.Stream.findOne({
                userId: user.id,
                // user: user,
                endTime: new Date(track.endTime),
                msPlayed: track.msPlayed,
            });
            if (stream === null || stream === undefined) {
                stream = await entities_1.Stream.create({
                    userId: user.id,
                    //   user: user,
                    endTime: new Date(track.endTime),
                    contextId: null,
                    trackName: encodeURI(track.trackName),
                    artistName: encodeURI(track.artistName),
                    msPlayed: track.msPlayed,
                }).save();
                resolve(stream.msPlayed);
            }
            else {
                resolve(0);
            }
        }
        catch (e) {
            console.error(e);
            resolve(0);
        }
    });
};
exports.default = async (userId) => {
    const consoleString = `(${new Date().toLocaleTimeString()}) ⏱  Import       `;
    try {
        console.time(consoleString);
        const user = await entities_1.User.findOne({
            id: userId,
        });
        if (typeof user.totalSeconds !== "number") {
            user.totalSeconds = BigInt(0);
        }
        const importStreams = JSON.parse(fs_1.default.readFileSync("data/StreamingHistory1.json", { encoding: "utf8" }));
        console.log(importStreams.length);
        // importStreams = importStreams.splice(0, 30);
        // console.log(importStreams.length);
        const promises = importStreams.map((track) => parseStream(user, track));
        const values = await Promise.all(promises);
        user.totalSeconds += BigInt(Math.round(values.reduce((a, b) => a + b) / 1000));
        console.log(user.totalSeconds);
        await user.save();
        //   await resetSpotifyApiTokens(spotifyApi);
    }
    catch (err) {
        console.error(err);
    }
    console.timeEnd(consoleString);
};
//# sourceMappingURL=ImportData.js.map