"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const misc_1 = require("../misc");
const entities_1 = require("../entities");
const Spotify_1 = require("../Spotify");
async function PlaylistSync() {
    console.time("playlistSync");
    const users = await entities_1.User.find({});
    console.timeLog("playlistSync");
    await Promise.all(users.map(async (user) => {
        if (user.settings.disabled === true) {
            // do nothing
        }
        else {
            const accessToken = await Spotify_1.getAccessToken(user.refreshToken, user.id);
            const spotifyUser = await Spotify_1.getUser(accessToken);
            const topTracks = (await Spotify_1.getTopTracks(accessToken)).items;
            if (user.playlistId) {
                const playlist = await Spotify_1.getPlaylist(accessToken, user.playlistId);
                await Spotify_1.followPlaylist(accessToken, playlist.id);
                if (topTracks.length === 0) {
                    Spotify_1.updatePlaylist(accessToken, playlist.id, `Generated and synced by Spotistats for iPhone and Android. We tried syncing ${new Date().toLocaleString("en-us", { weekday: "long" })}, but you haven't listened enough to determine your Top Tracks. (${topTracks.length}/50 tracks available)`);
                }
                else {
                    await Spotify_1.deletePlaylistTracks(accessToken, playlist.id, playlist.tracks.items.map((doc) => { return { "uri": doc.track.uri }; }));
                    await Spotify_1.addPlaylistTracks(accessToken, playlist.id, topTracks.map((doc) => doc.uri));
                    await Spotify_1.updatePlaylist(accessToken, playlist.id, `Generated and synced by Spotistats for iPhone and Android. Last sync: ${new Date().toLocaleString("en-us", { weekday: "long" })} (${topTracks.length}/50 tracks available)`);
                }
            }
            else {
                const playlist = await Spotify_1.createPlaylist(accessToken, user.id, spotifyUser.display_name);
                await Spotify_1.addPlaylistTracks(accessToken, playlist.id, topTracks.map((doc) => doc.uri));
                await entities_1.User.create({
                    id: user.id,
                    playlistId: playlist.id
                }).save();
            }
        }
    }));
    console.timeEnd("playlistSync");
    misc_1.infoLogger("Done syncing playlists!");
}
exports.default = PlaylistSync;
//# sourceMappingURL=PlaylistSync.js.map