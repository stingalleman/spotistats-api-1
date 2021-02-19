// // import { infoLogger } from "../misc";
// // import { User } from "../entities";

// // import { getAccessToken, getUser, addPlaylistTracks, createPlaylist, getTopTracks, updatePlaylist, deletePlaylistTracks, getPlaylist, followPlaylist } from "../Spotify";

// // export default async function PlaylistSync(): Promise<void> {
// //   console.time("playlistSync");
// //   const users = await User.find({});
// //   console.timeLog("playlistSync");

// //   await Promise.all(users.map(async (user) => {
// //     if (user.settings.disabled === true) {
// //       // do nothing
// //     } else {
// //       const accessToken = await getAccessToken(user.refreshToken, user.id);
// //       const spotifyUser = await getUser(accessToken);
// //       const topTracks = (await getTopTracks(accessToken)).items;

// //       if (user.playlistId) {
// //         const playlist = await getPlaylist(accessToken, user.playlistId);
// //         await followPlaylist(accessToken, playlist.id);
// //         if (topTracks.length === 0) {
// //           updatePlaylist(accessToken, playlist.id, `Generated and synced by Spotistats for iPhone and Android. We tried syncing ${new Date().toLocaleString("en-us", { weekday: "long" })}, but you haven't listened enough to determine your Top Tracks. (${topTracks.length}/50 tracks available)`);
// //         } else {
// //           await deletePlaylistTracks(accessToken, playlist.id, playlist.tracks.items.map((doc) => { return { "uri": doc.track.uri }; }));
// //           await addPlaylistTracks(accessToken, playlist.id, topTracks.map((doc) => doc.uri));
// //           await updatePlaylist(accessToken, playlist.id, `Generated and synced by Spotistats for iPhone and Android. Last sync: ${new Date().toLocaleString("en-us", { weekday: "long" })} (${topTracks.length}/50 tracks available)`);
// //         }
// //       } else {
// //         const playlist = await createPlaylist(accessToken, user.id, spotifyUser.display_name);
// //         await addPlaylistTracks(accessToken, playlist.id, topTracks.map((doc) => doc.uri));

// //         await User.create({
// //           id: user.id,
// //           playlistId: playlist.id
// //         }).save();
// //       }
// //     }
// //   }));
// //   console.timeEnd("playlistSync");
// //   infoLogger("Done syncing playlists!");
// // }

// /* eslint-disable no-await-in-loop */
// /* eslint-disable no-restricted-syntax */
// import fetch from "node-fetch";
// import { User } from "../entities";
// // const UserStream = require('../models/user-stream.model');
// import {
//   getUserSpotifyApi,
//   resetSpotifyApiTokens,
// } from "../utils/spotify-api.utils";

// const createPlaylist = async (spotifyApi, options) =>
//   fetch("https://api.spotify.com/v1/me/playlists", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(options),
//   }).then((res) => res.json());

// const removeTracksFromPlaylist = async (spotifyApi, playlistId, tracks) => {
//   const uris = tracks.map((track) => ({ uri: track.track.uri }));
//   const max = 100;

//   /// spotify api can only handle 100 items at a time
//   for (let i = 0; i < uris.length; i += max) {
//     await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         tracks: uris.slice(i, i + max),
//       }),
//     }).then((res) => res.json());
//   }
// };

// export default async (): Promise<void> => {
//   const consoleString = `(${new Date().toLocaleTimeString()}) ⏱  Playlist Sync `;
//   console.time(consoleString);
//   const users = await User.find({
//     where: { disabled: false },
//     relations: ["settings"],
//   });

//   for (const user of users) {
//     try {
//       const spotifyApi = await getUserSpotifyApi(user);
//       const [topTracks1, topTracks2] = (
//         await Promise.all([
//           spotifyApi.getMyTopTracks({
//             time_range: "short_term",
//             limit: 50,
//           }),
//           spotifyApi.getMyTopTracks({
//             time_range: "short_term",
//             limit: 50,
//             offset: 49,
//           }),
//         ])
//       ).map((a) => a.body.items);
//       const topTracks = topTracks1
//         .concat(topTracks2)
//         .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

//       // const lastSync = new Date().toUTCString();
//       // const description = `Created and synced through Spotistats App for Android and iOS.
//       //                      Last sync: ${lastSync} (${topTracks.length}/50 tracks available)`;
//       const description =
//         "Created and synced through Spotistats App for Android and iOS 💚";
//       let playlist = null;
//       if (
//         user.settings.playlistId !== null &&
//         user.settings.playlistId !== undefined
//       ) {
//         try {
//           playlist = (await spotifyApi.getPlaylist(user.settings.playlistId))
//             .body;
//         } catch (e) {
//           playlist = null;
//         }
//       }

//       if (playlist === null || playlist === undefined) {
//         playlist = await createPlaylist(spotifyApi, {
//           name: `${user.displayName}'s Top Tracks - Past 4 weeks`,
//           description,
//           public: true,
//           collaborative: false,
//         });

//         user.settings.playlistId = playlist.id;

//         await user.save();
//       } else {
//         /// explicitly no await to speed up the process
//         spotifyApi.followPlaylist(playlist.id);
//       }

//       if (
//         playlist.tracks &&
//         playlist.tracks.items &&
//         playlist.tracks.items.length > 0
//       ) {
//         await removeTracksFromPlaylist(
//           spotifyApi,
//           playlist.id,
//           playlist.tracks.items
//         );
//       }

//       if (topTracks && topTracks.length > 0) {
//         await spotifyApi.addTracksToPlaylist(
//           playlist.id,
//           topTracks.map((track) => track.uri)
//         );
//       }

//       await resetSpotifyApiTokens(spotifyApi);
//     } catch (err) {
//       // console.error(err);
//     }
//   }
//   console.timeEnd(consoleString);
// };
