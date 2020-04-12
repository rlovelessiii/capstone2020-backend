const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const sqlite = require('sqlite3').verbose()

router.use(bodyParser.urlencoded({ extended: false}))
router.use(bodyParser.json())

const database = new sqlite.Database('./database/portal.db')

const createViewsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS views (
    id integer PRIMARY KEY,
    user_id integer,
    title_type text,
    title_id integer)`
  return database.run(query)
}

const createWatchedTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS watched (
    id integer PRIMARY KEY,
    user_id integer,
    title_type text,
    title_id integer,
    season integer,
    episode integer,
    rating number)`
  return database.run(query)
}

const createSavedTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS saved (
    id integer PRIMARY KEY,
    user_id integer,
    save_type text,
    title_type text,
    title_id integer,`
}

const findViewsById = (user_id, callback) => {
  return database.get(`SELECT * FROM views WHERE user_id = ?`, user_id, (error, row) => {
    callback(error, row)
  })
}

const findWatchedById = (user_id, callback) => {
  return database.get(`SELECT * FROM watched WHERE user_id = ?`, user_id, (error, row) => {
    callback(error, row)
  })
}

const findSavedById = (user_id, callback) => {
  return database.get(`SELECT * FROM saved WHERE user_id = ?`, user_id, (error, row) => {
    callback(error, row)
  })
}

const addView = (user_id, title_type, title_id, callback) => {
  return database.get(`INSERT INTO views (user_id, title_type, title_id) VALUES (?, ?, ?)`, [user_id, title_type, title_id], (error) => {
    callback(error)
  })
}

const addWatched = (user_id, title_type, title_id, season, episode, rating, callback) => {
  return database.get(`INSERT INTO watched (user_id, title_type, title_id, season, episode, rating) VALUES (?, ?, ?, ?, ?, ?)`, [user_id, title_type, title_id], (error) => {
    callback(error)
  })
}

const addSaved = (user_id, save_type, title_type, title_id, callback) => {
  return database.get(`INSERT INTO saved (user_id, save_type, title_type, title_id) VALUES (?, ?, ?, ?)`, [user_id, save_type, title_type, title_id], (error) => {
    callback(error)
  })
}

const removeSaved = (user_id, save_type, title_type, title_id, callback) => {
  return database.get(`DELETE FROM saved WHERE user_id = ? AND save_type = ? AND title_type = ? AND title_id = ?`, [user_id, save_type, title_type, title_id], (error) => {
    callback (error)
  })
}

createViewsTable()
createWatchedTable()
createSavedTable()

const handleError = (res, errorNum) => {
  switch (errorNum) {
    case 19: return res.status(409).send('User information already entered')
    case 'views': return res.status(404).send('User view history not found!')
    case 'watched': return res.status(404).send('User watch history not found')
    case 'saved': return res.status(404).send('User save history not found')
    default: return res.status(500).send('Server Error')
  }
}

router.post('/', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']

  findViewsById(user_id, (error, views) => {
    if (error) handleError(res, error.errno)
    else findWatchedById(user_id, (error, watched) => {
      if (error) handleError(res, error.errno)
      else findSavedById(user_id, (error, saved) => {
        if (error) handleError(res, error.errno)
        else res.status(200).send({ views, watched, saved })
      })
    })
  })
})

router.get('/views', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']

  findViewsById(user_id, (error, views) => {
    if (error) handleError(res, error.errno)
    else if (!views) handleError (res, 'watched')
    else res.status(200).send(views)
  })
})

router.post('/views', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']
  const title_type = req.body['titleType']
  const title_id = req.body['titleId']

  addView(user_id, title_type, title_id, (error) => {
    if (error) handleError(res, error.errno)
    else findViewsById(user_id, (error, views) => {
      if (error) handleError(res, error.errno)
      else if (!views) handleError(res, 'views')
      else res.status(200).send(views)
    })
  })
})

router.get('/watched', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']

  findWatchedById(user_id, (error, watched) => {
    if (error) handleError(res, error.errno)
    else if (!watched) handleError (res, 'watched')
    else res.status(200).send(watched)
  })
})

router.post('/watched', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']
  const title_type = req.body['titleType']
  const title_id = req.body['titleId']
  const season = req.body['season']
  const episode = req.body['episode']
  const rating = req.body['rating']

  addWatched(user_id, title_type, title_id, season, episode, rating, (error) => {
    if (error) handleError(res, error.errno)
    else findWatchedById(user_id, (error, watched) => {
      if (error) handleError(res, error.errno)
      else if (!watched) handleError(res, 'watched')
      else res.status(200).send(watched)
    })
  })

})

router.get('/saved', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']

  findSavedById(user_id, (error, saved) => {
    if (error) handleError(res, error.errno)
    else if (!saved) handleError (res, 'saved')
    else res.status(200).send(saved)
  })
})

router.post('/saved', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']
  const save_type = req.body['saveType']
  const title_type = req.body['titleType']
  const title_id = req.body['titleId']

  addSaved(user_id, save_type, title_type, title_id, (error) => {
    if (error) handleError(res, error.errno)
    else findSavedById(user_id, (error, saved) => {
      if (error) handleError(res, error.errno)
      else if (!saved) handleError(res, 'saved')
      else res.status(200).send(saved)
    })
  })
})

router.delete('/saved', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']
  const save_type = req.body['saveType']
  const title_type = req.body['titleType']
  const title_id = req.body['titleId']

  removeSaved(user_id, save_type, title_type, title_id, (error) => {
    if (error) handleError(res, error.errno)
    else findSavedById(user_id, (error, saved) => {
      if (error) handleError(res, error.errno)
      else if (!saved) handleError(res, 'saved')
      else res.status(200).send(saved)
    })
  })
})
