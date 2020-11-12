/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const fetch = require('node-fetch');
const User = require('../models/user.model');
// const UserStream = require('../models/user-stream.model');
const { getUserSpotifyApi, resetSpotifyApiTokens } = require('../utils/spotify-api.utils');

const createPlaylist = async (spotifyApi, options) => fetch('https://api.spotify.com/v1/me/playlists', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(options),
}).then((res) => res.json());

const removeTracksFromPlaylist = async (spotifyApi, playlistId, tracks) => {
  const uris = tracks.map((track) => ({ uri: track.track.uri }));
  const max = 100;

  /// spotify api can only handle 100 items at a time
  for (let i = 0; i < uris.length; i += max) {
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tracks: uris.slice(i, i + max),
      }),
    }).then((res) => res.json());
  }
};

const playlistSync = async () => {
  const consoleString = `(${new Date().toLocaleTimeString()}) ⏱  Playlist Sync `;
  console.time(consoleString);
  const users = await User.find({ disabled: false }); // , isPlus: true

  for (const user of users) {
    try {
      const spotifyApi = await getUserSpotifyApi(user.id);
      const topTracks = (await spotifyApi.getMyTopTracks({
        time_range: 'short_term',
        limit: 50,
      })).body.items;

      // const lastSync = new Date().toUTCString();
      // const description = `Created and synced through Spotistats App for Android and iOS.
      //                      Last sync: ${lastSync} (${topTracks.length}/50 tracks available)`;
      const description = 'Created and synced through Spotistats App for Android and iOS 💚';
      let playlist = null;
      if (user.playlists.shortTerm !== null && user.playlists.shortTerm !== undefined) {
        try {
          playlist = (await spotifyApi.getPlaylist(user.playlists.shortTerm)).body;
        } catch (e) {
          playlist = null;
        }
      }

      if (playlist === null || playlist === undefined) {
        playlist = await createPlaylist(spotifyApi, {
          name: `${user.displayName || user.display_name}'s Top Tracks - Past 4 weeks`,
          description,
          public: true,
          collaborative: false,
        });

        user.playlists.shortTerm = playlist.id;

        await user.save();
      } else {
        /// explicitly no await to speed up the process
        spotifyApi.followPlaylist(playlist.id);
      }

      if (playlist.tracks && playlist.tracks.items && playlist.tracks.items.length > 0) {
        await removeTracksFromPlaylist(
          spotifyApi,
          playlist.id,
          playlist.tracks.items,
        );
      }

      if (topTracks && topTracks.length > 0) {
        await spotifyApi.addTracksToPlaylist(playlist.id, topTracks.map((track) => track.uri));
      }

      await resetSpotifyApiTokens(spotifyApi);
    } catch (err) {
      // console.error(err);
    }
  }
  console.timeEnd(consoleString);
};

module.exports = playlistSync;
