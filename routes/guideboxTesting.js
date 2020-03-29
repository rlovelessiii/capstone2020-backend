const express = require('express');
const bodyParser = require('body-parser');
const guidebox = require('../modules/guidebox');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send('Guidebox Module Testing');
});

router.get('/shows/all', (req, res) => {
  guidebox.shows.all();
});

router.get('/shows/id', (req, res) => {
  guidebox.shows.id();
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

module.exports = router;
