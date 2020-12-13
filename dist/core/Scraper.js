"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
const spotify_api_utils_1 = require("../utils/spotify-api.utils");
const parseStream = async (user, track) => {
    try {
        let stream = await entities_1.Stream.findOne({
            userId: user.id,
            // user: user,
            endTime: track.playedAt,
        });
        if (stream === null || stream === undefined) {
            const hasContext = track.context !== null && typeof track.context.uri === "string";
            let msPlayed = 0;
            try {
                msPlayed = track.msPlayed;
            }
            catch (e) { }
            try {
                msPlayed = track.track.duration_ms;
            }
            catch (e) { }
            stream = await entities_1.Stream.create({
                userId: user.id,
                // user: user,
                endTime: new Date(track.played_at),
                contextId: hasContext ? track.context.uri.split(":")[2] : null,
                trackName: encodeURI(track.track.name),
                artistName: encodeURI(track.track.artists[0].name),
                msPlayed: msPlayed,
            }).save();
            return stream.msPlayed;
        }
        else {
            return 0;
        }
    }
    catch (e) {
        console.error(e);
        return 0;
    }
};
exports.default = async () => {
    const consoleString = `(${new Date().toLocaleTimeString()}) ⏱  Scraper       `;
    try {
        console.time(consoleString);
        const users = await entities_1.User.find({
            relations: ["settings"],
        });
        for (const user of users) {
            const spotifyApi = await spotify_api_utils_1.getUserSpotifyApi(user);
            const recentlyPlayed = (await spotifyApi.getMyRecentlyPlayedTracks({
                limit: 50,
            })).body.items;
            if (typeof user.totalSeconds !== "number") {
                user.totalSeconds = BigInt(0);
            }
            const promises = recentlyPlayed.map((track) => parseStream(user, track));
            const values = await Promise.all(promises);
            user.totalSeconds += BigInt(Math.round(values.reduce((a, b) => a + b) / 1000));
            await user.save();
            await spotify_api_utils_1.resetSpotifyApiTokens(spotifyApi);
        }
    }
    catch (err) {
        console.error(err);
    }
    console.timeEnd(consoleString);
};
//# sourceMappingURL=Scraper.js.map