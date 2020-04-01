const express = require('express');
const bodyParser = require('body-parser');
const Guidebox = require('../modules/guidebox');
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
  console.log(req.body);
  const settings = req.body.settings;
  Guidebox.movies.all('0', '10', settings.sources, settings.platform, settings.include_preorders, settings.include_in_theaters, (err, response, body) => {
    res.status(200).send(body);
  })
});

router.post('/details', (req, res) => {
  console.log(req.body);
  const movie_id = req.body.movieId;
  Guidebox.movies.details(movie_id, (err, response, body) => {
    console.log(body);
    res.status(200).send(body);
  })
});

module.exports = router;
