const express = require('express');
const bodyParser = require('body-parser');
const Guidebox = require('../modules/guidebox');
const API_KEY = require('../config/config').guidebox_api_key;
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

Guidebox.init(API_KEY);

const shuffle = (shows) => {
  let currentIndex = shows.length, tempValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    tempValue = shows[currentIndex];
    shows[currentIndex] = shows[randomIndex];
    shows[randomIndex] = tempValue;
  }
  return shows;
};

router.post('/', (req, res) => {
  console.log(req.body);

  // Parse list of sources (required), show-limit (optional), and previous-shows (optional)
  const sources = req.body.sources.split(',');
  const limit = parseInt(req.body.limit) | 25;
  const prev_shows = req.body.prevShows;

  // Initialize empty array to prepare to get show results
  let results = [];
  sources.forEach(source => {
    // Fetch data file for each source provided
    const data = require('../data/shows/' + source).results;

    // Insert every show from the fetched data into the results array
    data.forEach(show => {
      results.push(show);
    });
    console.log('Successfully fetched shows from => ' + source);
  });

  // Shuffle the results using the Fisher-Yates shuffle algorithm
  results = shuffle(results);

  // Create a new array with a subset of the shuffled array, starting from the first element (0) to the limit provided (25 default)
  let shows = results.splice(0, limit);

  // If a prev_shows array is present, we compare to ensure returned results are not duplicated from previous requests
  if (prev_shows) {
    while (!shows.every((elem, index, arr) => { return prev_shows.indexOf(elem.id) === -1; })) {
      // If any of the shows repeat, we try for the next subset of shows and compare again
      shows = results.splice(0, limit);
    }
  }

  // Once final show results are determined they are returned as the response.
  res.status(200).send(shows);
});

router.post('/channel', (req, res) => {
  console.log(req.body);

  // Parse the channel (required), the show-limit (optional), and the previous-shows (optional)
  const channel = req.body.channel;
  const limit = parseInt(req.body.limit) | 25;
  const prev_shows = req.body.prevShows;

  // Initialize empty array to prepare for results
  let results = [];

  // Fetch shows list from the channel provided
  const data = require('../data/shows/channels/' + channel).results;

  // Add each show to the results array
  data.forEach(show => {
    results.push(show);
  });
  console.log('Successfully fetched shows for => ' + channel);

  // Shuffle the results using the Fisher-Yates shuffle algorithm
  results = shuffle(results);

  // Create new array from subset of the shuffled array, starting from the first element (0), to the limit provided (25 default)
  let shows = results.splice(0, limit);

  // If a prev_shows array is present, we compare to ensure returned results are not duplicated from previous requests
  if (prev_shows) {
    while (!shows.every((elem, index, arr) => { return prev_shows.indexOf(elem.id) === -1 })) {
      // If any of the shows repeat, we try for the next subset of shows and compare again
      shows = results.splice(0, limit);
    }
  }

  // Once final show results are determined they are returned as the response.
  res.status(200).send(shows);
});

router.post('/details', (req, res) => {
  console.log(req.body);
  const show_id = req.body.showId;
  Guidebox.shows.details(show_id, (err, response, body) => {
    res.status(200).send(body);
  });
});

router.get('/testing', (req, res) => {
  let sources = 'free,purchase,subscription,tv_everywhere';
  sources = sources.split(',');
  const offset = 0;
  const limit = 10;
  let results = [];
  sources.forEach(source => {
    const data = require('../data/shows/' + source).results;
    data.forEach(show => {
      results.push(show);
    });
    console.log('Successfully fetch shows from => ' + source);
  });
  results = shuffle(results);
  res.send(results.splice(offset, limit));
});

module.exports = router;
