const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const guidebox = require('../modules/guidebox');
const API_KEY = require('../config/config.json').guidebox_api_key;
const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

guidebox.init(API_KEY);

router.get('/', function (req, res, next) {
  res.send('Guidebox Module Testing');
});

router.get('/shows/all', (req, res) => {
  const tag = 'adventure';
  guidebox.shows.all('all', '0', '250', '', 'all', tag, (err, response, results) => {
    console.log('Calls to the API so far => ' + response.caseless.dict['guidebox-quota']);
    const data = JSON.stringify(results);
    fs.writeFile('./data/shows/genres/' + tag + '.json', data, (err) => {
      console.log(err);
    });
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
  guidebox.movies.all('750', '250', 'purchase', 'all', 'false', 'false', (err, response, results) => {
    console.log('Calls to the API so far => ' + response.caseless.dict['guidebox-quota']);
    const data = JSON.stringify(results);
    fs.writeFile('./data/movies/purchase3.json', data, (err) => {
      console.log(err);
    });
    res.send(results);
  });
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
  guidebox.channels.all('online', '1000', '1000', (err, response, results) => {
    console.log('Calls to the API so far => ' + response.caseless.dict['guidebox-quota']);
    const jsonData = JSON.stringify(results);
    fs.writeFile('./data/channels/online1.json', jsonData, (err) => {
      console.log(err);
    });
    res.send(results);
  });
});

router.get('/channels/details', (req, res) => {
  guidebox.channels.details();
});

router.get('/channels/images', (req, res) => {
  guidebox.channels.images();
});

router.get('/sources', (req, res) => {
  guidebox.sources('purchase', 'movie', (err, response, results) => {
    console.log('Calls to the API so far => ' + response.caseless.dict['guidebox-quota']);
    const data = JSON.stringify(results);
    fs.writeFile('./data/movies/sources/purchase.json', data, (err) => {
      console.log(err);
    });
    res.send(results);
  });
});

router.get('/genres', (req, res) => {
  guidebox.genres((err, response, results) => {
    console.log('Calls to the API so far => ' + response.caseless.dict['guidebox-quota']);
    const data = JSON.stringify(results);
    fs.writeFile('./data/genres.json', data, (err) => {
      console.log(err);
    });
    res.send(results);
  });
});

router.get('/tags', (req, res) => {
  guidebox.tags('0', '1000', (err, response, results) => {
    console.log('Calls to the API so far => ' + response.caseless.dict['guidebox-quota']);
    const data = JSON.stringify(results);
    fs.writeFile('./data/tags.json', data, (err) => {
      console.log(err);
    });
    res.send(results);
  });
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
