const express = require('express');
const bodyParser = require('body-parser');
const Guidebox = require('../modules/guidebox');
const router = express.Router();

Guidebox.init('1335064ad9cf341689d2332ea3e56b21d783051d');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send('Guidebox Module Testing');
});

router.post('/', (req, res) => {
  console.log(req.body);
});

router.post('/featured', (req, res) => {
  console.log(req.body);
  const settings = req.body;
  Guidebox.shows.all(settings.channel, '0', '25', settings.sources, settings.platform, '', (err, response, body) => {
    console.log(body);
    res.status(200).send(body.results);
  });
});

router.post('/show_details', (req, res) => {
  console.log(req.body);
  const show_id = req.body.id;
  Guidebox.shows.details(show_id, (err, response, body) => {
    console.log(body);
    res.status(200).send(body);
  });
});

module.exports = router;

