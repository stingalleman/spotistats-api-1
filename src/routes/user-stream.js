const { Router } = require('express');
// const { getUserSpotifyApi, resetSpotifyApiTokens } = require('../utils/spotify-api.utils');
const { getStreams } = require('../services/user-stream');

const router = Router();

// router.get('/:userid/recent', (req, res) => {
//   getUserSpotifyApi(req.params.userid).then((spotifyApi) => {
//     spotifyApi.getMyRecentlyPlayedTracks().then(
//       (data) => {
//         res.send(data.body);
//       },
//       (err) => {
//         res.status(err).send(err.message);
//       },
//     ).finally(() => {
//       resetSpotifyApiTokens(spotifyApi);
//     });
//   });
// });

router.get('/:userid/streams', (req, res) => {
  getStreams(req.params.userid).then(
    (data) => {
      res.send(data);
    },
    (err) => {
      console.log(err);
      res.status(500).send(err);
    },
  );
});

router.get('/:userid/streams/:type/:itemid', (req, res) => {
  getStreams(req.params.userid, {
    [req.params.type]: req.params.itemid,
  }).then(
    (data) => {
      res.send(data);
    },
    (err) => {
      console.log(err);
      res.status(500).send(err);
    },
  );
});

module.exports = router;
