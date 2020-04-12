const express = require('express')
const bodyParser = require('body-parser')
const Guidebox = require('../modules/guidebox')
const API_KEY = require('../config/guidebox').guidebox_api_key
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

Guidebox.init(API_KEY)

const getShowsBySource = (sources) => {
  // Initialize empty array for results
  let results = []
  sources.forEach(source => {
    // Fetch data file for each source provided
    const data = require('../data/shows/' + source).results
    // Insert every show from the data into the array
    data.forEach(show => {
      results.push(show)
    })
    console.log('Successfully fetched shows from => ' + source)
  })
  return results
}

const shuffle = (shows) => {
  let currentIndex = shows.length, tempValue, randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    tempValue = shows[currentIndex]
    shows[currentIndex] = shows[randomIndex]
    shows[randomIndex] = tempValue
  }
  return shows
};

router.post('/featured', (req, res) => {
  console.log(req.body)
  // Parse list of sources (required), show-limit (optional), and previous-shows (optional)
  const sources = req.body.sources
  const limit = parseInt(req.body.limit)
  const prev_shows = req.body['prevShows']

  // Get results from the sources provided by the request
  let results = getShowsBySource(sources)

  // Shuffle the results using the Fisher-Yates shuffle algorithm
  results = shuffle(results)

  // Create a new array with a subset of the shuffled array, starting from the first element (0) to the limit provided (25 default)
  let shows = results.splice(0, limit)

  // If a prev_shows array is present, we compare to ensure returned results are not duplicated from previous requests
  if (prev_shows) {
    while (!shows.every((elem) => { return prev_shows.indexOf(elem.id) === -1; })) {
      // If any of the shows repeat, we try for the next subset of shows and compare again
      shows = results.splice(0, limit)
    }
  }

  // Once final show results are determined they are returned as the response.
  res.status(200).send(shows)
})

router.post('/new', (req, res) => {
  console.log(req.body)
  // Parse list of sources (required), show-limit (optional), and previous-shows (optional)
  const sources = req.body.sources
  const limit = parseInt(req.body.limit)
  const prev_shows = req.body['prevShows']

  // Get results from the sources provided by the request
  const results = getShowsBySource(sources)

  // Search through the results array and check for any new released and add them to the newShows array
  let new_shows = []
  results.forEach(show => {
    let first_aired = show['first_aired']
    if (first_aired) {
      first_aired = first_aired.split('-')
      if (first_aired[0] === '2020') {
        new_shows.push(show)
      }
    }
  })

  // Shuffle the results with the Fisher-Yates shuffle algorithm
  new_shows = shuffle(new_shows)

  // Create new array with a subset of the shuffled array
  let shows = new_shows.splice(0, limit)

  // If a prev_show array is present, we compare to ensure returned results are not duplicated
  if (prev_shows) {
    while (!new_shows.every((elem) => { return prev_shows.indexOf(elem.id) === -1 })) {
      // If any shows are duplicates, we try for the next subset
      shows = new_shows.splice(0, limit)
    }
  }

  // Return results when list is determined
  res.status(200).send(shows)
})

router.post('/channel', (req, res) => {
  console.log(req.body)

  // Parse the channel (required), the show-limit (optional), and the previous-shows (optional)
  const channel = req.body.channel
  const limit = parseInt(req.body.limit)
  const prev_shows = req.body['prevShows']

  if (!channel) res.status(400).send('No channel was provided')

  // Initialize empty array to prepare for results
  let results = []

  // Fetch shows list from the channel provided
  const data = require('../data/shows/channels/' + channel).results

  // Add each show to the results array
  data.forEach(show => {
    results.push(show)
  })
  console.log('Successfully fetched shows for => ' + channel)

  // Shuffle the results using the Fisher-Yates shuffle algorithm
  results = shuffle(results)

  // Create new array from subset of the shuffled array, starting from the first element (0), to the limit provided (25 default)
  let shows = results.splice(0, limit)

  // If a prev_shows array is present, we compare to ensure returned results are not duplicated from previous requests
  if (prev_shows) {
    while (!shows.every((elem) => { return prev_shows.indexOf(elem.id) === -1 })) {
      // If any of the shows repeat, we try for the next subset of shows and compare again
      shows = results.splice(0, limit)
    }
  }

  // Once final show results are determined they are returned as the response.
  res.status(200).send(shows)
})

router.post('/details', (req, res) => {
  console.log(req.body)
  const show_id = req.body['showId']
  Guidebox.shows.details(show_id, (err, response, body) => {
    res.status(200).send(body)
  })
})

router.get('/testing', (req, res) => {
  let sources = 'free,purchase,subscription,tv_everywhere'
  sources = sources.split(',')
  const offset = 0
  const limit = 10
  let results = []
  sources.forEach(source => {
    const data = require('../data/shows/' + source).results
    data.forEach(show => {
      results.push(show)
    });
    console.log('Successfully fetch shows from => ' + source)
  })
  results = shuffle(results)
  res.send(results.splice(offset, limit))
})

module.exports = router
