const express = require('express')
const bodyParser = require('body-parser')
const Guidebox = require('../modules/guidebox')
const API_KEY = require('../config/guidebox').guidebox_api_key
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

Guidebox.init(API_KEY)

const getMoviesBySource = (sources) => {
  let results = []
  sources.forEach(source => {
    const data = require('../data/movies/' + source).results
    data.forEach(show => {
      results.push(show)
    })
    console.log('Successfully fetched movies from => ' + source)
  })
  return results
}

const shuffle = (movies) => {
  let currentIndex = movies.length, tempValue, randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    tempValue = movies[currentIndex]
    movies[currentIndex] = movies[randomIndex]
    movies[randomIndex] = tempValue
  }
  return movies
}

router.post('/', (req, res) => {
  console.log(req.body)
  const settings = req.body.settings
  Guidebox.movies.all('0', '10', settings.sources, settings.platforms, settings.include_preorders, settings.include_in_theaters, (err, response, body) => {
    res.status(200).send(body)
  })
})

router.post('/featured', (req, res) => {
  console.log(req.body)

  const sources = req.body['sources']
  const limit = parseInt(req.body['limit'])
  const prev_movies = req.body['prevMovies']

  let results = getMoviesBySource(sources)

  results = shuffle(results)

  let movies = results.splice(0, limit)

  if (prev_movies) {
    while (!movies.every((elem) => { return prev_movies.indexOf(elem.id) === -1; })) {
      movies = results.splice(0, limit)
    }
  }

  res.status(200).send(movies)
})

router.post('/new', (req, res) => {
  console.log(req.body)

  const sources = req.body['sources']
  const limit = parseInt(req.body['limit'])
  const prev_movies = req.body['prev_movies']

  const results = getMoviesBySource(sources)

  let new_movies = []
  results.forEach(movie => {
    let release_year = movie['release_year']
    if (release_year) {
      if (release_year === 2020) {
        new_movies.push(movie)
      }
    }
  })

  new_movies = shuffle(new_movies)

  let movies = new_movies.splice(0, limit)

  if (prev_movies) {
    while (!new_movies.every((elem) => { return prev_movies.indexOf(elem.id) === -1 })) {
      movies = new_movies.splice(0, limit)
    }
  }

  res.status(200).send(movies)
})

router.post('/channel', (req, res) => {
  console.log(req.body)

  const channel = req.body['channel']
  const limit = parseInt(req.body['limit'])
  const prev_movies = req.body['prevMovies']

  if (!channel) res.status(400).send('No channel was provided')

  let results = []

  const data = require('../data/movies/channels/' + channel).results

  data.forEach(movie => {
    results.push(movie)
  })
  console.log('Successfully fetched shows for => ' + channel)

  results = shuffle(results)

  let movies = results.splice(0, limit)

  if (prev_movies) {
    while (!movies.every((elem) => { return prev_movies.indexOf(elem.id) === -1 })) {
      movies = results.splice(0, limit)
    }
  }

  res.status(200).send(movies)
})

router.post('/details', (req, res) => {
  console.log(req.body)
  const movie_id = req.body['movieId']
  Guidebox.movies.details(movie_id, (err, response, body) => {
    console.log(body)
    res.status(200).send(body)
  })
})

module.exports = router
