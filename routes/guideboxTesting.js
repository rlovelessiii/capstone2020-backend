const express = require('express');
const bodyParser = require('body-parser');
const guidebox = require('../modules/guidebox');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

function callback(res, body) {
  res.send(body);
}

router.get('/', function(req, res, next) {
  res.send('Guidebox Module Testing');
});

router.get('/shows/all', (req, res) => {
   guidebox.shows.all((results) => {
     res.send(results);
   });
});

router.get('/shows/id', (req, res) => {
  guidebox.shows.details();
});

router.get('/shows/season', (req, res) => {
  guidebox.shows.season();
});

router.get('/shows/episodes', (req, res) => {
  guidebox.shows.episodes();
});

router.get('/shows/images', (req, res) => {
  guidebox.shows.images();
});

router.get('/shows/related', (req, res) => {
  guidebox.shows.related();
});

router.get('/shows/available_content', (req, res) => {
  guidebox.shows.available_content();
});

router.get('/episodes/details', (req, res) => {
  guidebox.episodes.details();
});

router.get('/episodes/images', (req, res) => {
  guidebox.episodes.images();
});

router.get('/movies/all', (req, res) => {
  guidebox.movies.all();
});

router.get('/movies/details', (req, res) => {
  guidebox.movies.details();
});

router.get('/movies/images', (req, res) => {
  guidebox.movies.images();
});

router.get('/movies/trailers', (req, res) => {
  guidebox.movies.trailers();
});

router.get('/movies/related', (req, res) => {
  guidebox.movies.related();
});

router.get('/channels/all', (req, res) => {
  guidebox.channels.all();
});

router.get('/channels/details', (req, res) => {
  guidebox.channels.details();
});

router.get('/channels/images', (req, res) => {
  guidebox.channels.images();
});

router.get('/sources', (req, res) => {
  guidebox.sources();
});

router.get('/genres', (req, res) => {
  guidebox.genres();
});

router.get('/tags', (req, res) => {
  guidebox.tags();
});

router.get('/person/details', (req, res) => {
  guidebox.person.details();
});

router.get('/person/images', (req, res) => {
  guidebox.person.images();
});

router.get('/person/credits', (req, res) => {
  guidebox.person.credits();
});

module.exports = router;
