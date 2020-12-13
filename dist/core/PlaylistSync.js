// import { infoLogger } from "../misc";
// import { User } from "../entities";
// import { getAccessToken, getUser, addPlaylistTracks, createPlaylist, getTopTracks, updatePlaylist, deletePlaylistTracks, getPlaylist, followPlaylist } from "../Spotify";
// export default async function PlaylistSync(): Promise<void> {
//   console.time("playlistSync");
//   const users = await User.find({});
//   console.timeLog("playlistSync");
//   await Promise.all(users.map(async (user) => {
//     if (user.settings.disabled === true) {
//       // do nothing
//     } else {
//       const accessToken = await getAccessToken(user.refreshToken, user.id);
//       const spotifyUser = await getUser(accessToken);
//       const topTracks = (await getTopTracks(accessToken)).items;
//       if (user.playlistId) {
//         const playlist = await getPlaylist(accessToken, user.playlistId);
//         await followPlaylist(accessToken, playlist.id);
//         if (topTracks.length === 0) {
//           updatePlaylist(accessToken, playlist.id, `Generated and synced by Spotistats for iPhone and Android. We tried syncing ${new Date().toLocaleString("en-us", { weekday: "long" })}, but you haven't listened enough to determine your Top Tracks. (${topTracks.length}/50 tracks available)`);
//         } else {
//           await deletePlaylistTracks(accessToken, playlist.id, playlist.tracks.items.map((doc) => { return { "uri": doc.track.uri }; }));
//           await addPlaylistTracks(accessToken, playlist.id, topTracks.map((doc) => doc.uri));
//           await updatePlaylist(accessToken, playlist.id, `Generated and synced by Spotistats for iPhone and Android. Last sync: ${new Date().toLocaleString("en-us", { weekday: "long" })} (${topTracks.length}/50 tracks available)`);
//         }
//       } else {
//         const playlist = await createPlaylist(accessToken, user.id, spotifyUser.display_name);
//         await addPlaylistTracks(accessToken, playlist.id, topTracks.map((doc) => doc.uri));
//         await User.create({
//           id: user.id,
//           playlistId: playlist.id
//         }).save();
//       }
//     }
//   }));
//   console.timeEnd("playlistSync");
//   infoLogger("Done syncing playlists!");
// }
//# sourceMappingURL=PlaylistSync.js.map