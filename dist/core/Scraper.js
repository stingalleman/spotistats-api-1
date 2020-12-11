"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
const entities_2 = require("../entities");
const entities_3 = require("../entities");
const Spotify_1 = require("../Spotify");
const Logger_1 = require("../misc/Logger");
async function scraper() {
    try {
        console.time("scraper");
        Logger_1.infoLogger("starting scrape...");
        const users = await entities_1.User.find({}); // get all users from DB
        await Promise.all(users.map(async (user) => {
            if (user.settings.disabled === true) {
                // do nothing
            }
            else {
                const accessToken = await Spotify_1.getAccessToken(user.refreshToken, user.id);
                const recentlyPlayed = await Spotify_1.getRecentlyPlayed(accessToken);
                await entities_1.User.create({
                    id: user.id,
                    settings: {
                        disabled: false,
                        error: ""
                    }
                }).save();
                await Promise.all(recentlyPlayed.items.map(async (doc) => {
                    try {
                        const songCheck = await entities_2.Song.findOne({ where: { id: doc.track.id } });
                        if (!songCheck) {
                            try {
                                await entities_2.Song.insert({
                                    id: doc.track.id,
                                    length: doc.track.duration_ms
                                });
                            }
                            catch (err) {
                                if (err.message === "duplicate key value violates unique constraint \"PK_e504ce8ad2e291d3a1d8f1ea2f4\"") {
                                    // do nothing, duplicate
                                }
                                else {
                                    console.log(err);
                                }
                            }
                        }
                        const streamCheck = await entities_3.Stream.findOne({ where: { song: { id: doc.track.id, length: doc.track.duration_ms }, user: user, timestamp: Date.parse(doc.played_at), } });
                        if (!streamCheck) {
                            if (doc.context) { // if stream context exists
                                await entities_3.Stream.create({
                                    song: {
                                        id: doc.track.id,
                                        length: doc.track.duration_ms
                                    },
                                    user: user,
                                    timestamp: Date.parse(doc.played_at),
                                    contextID: doc.context.uri.split(":")[2],
                                    contextType: doc.context.type
                                }).save();
                            }
                            else { // if stream context is null
                                await entities_3.Stream.create({
                                    song: {
                                        id: doc.track.id,
                                        length: doc.track.duration_ms
                                    },
                                    user: user,
                                    timestamp: Date.parse(doc.played_at)
                                }).save();
                            }
                        }
                    }
                    catch (err) {
                        Logger_1.errorLogger("Error while saving streams to DB", err);
                    }
                }));
            }
        }));
    }
    catch (err) {
        Logger_1.errorLogger("error!!!", err);
    }
    console.timeEnd("scraper");
    Logger_1.infoLogger("done!");
}
exports.default = scraper;
//# sourceMappingURL=Scraper.js.map