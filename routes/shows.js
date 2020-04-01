const express = require('express');
const bodyParser = require('body-parser');
const Guidebox = require('../modules/guidebox');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
  console.log(req.body);
  const settings = req.body.settings;
  const tags = req.body.tags;
  Guidebox.shows.all(settings.channel, '0', '10', settings.sources, settings.platform, tags, (err, response, body) => {
    res.status(200).send(body.results);
  });
});


router.post('/details', (req, res) => {
  console.log(req.body);
  const show_id = req.body.showId;
  Guidebox.shows.details(show_id, (err, response, body) => {
    res.status(200).send(body);
  });
});

module.exports = router;
