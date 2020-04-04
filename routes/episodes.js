const express = require('express');
const bodyParser = require('body-parser');
const Guidebox = require('../modules/guidebox');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
  console.log(req.body);
  const show_id = req.body.showId;
  const season = req.body.season;
  const settings = req.body.settings;
  Guidebox.shows.episodes(show_id, season, '0', '25', settings.sources, settings.platforms, 'true', 'true', (err, response, body) => {
    res.status(200).send(body);
  })
});

router.post('/details', (req, res) => {
  console.log(req.body);
  const episode_id = req.body.episodeId;
  Guidebox.episodes.details(episode_id, (err, response, body) => {
    res.status(200).send(body);
  });
});

module.exports = router;
