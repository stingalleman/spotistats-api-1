const { Router } = require('express');

const router = Router();

router.get('/*', (req, res) => res.redirect('https://github.com/netlob/spotistats-api'));

module.exports = router;
