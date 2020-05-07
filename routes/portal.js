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
    user_id integer,
    type text,
    id integer,
    title text,
    image text)`
  return database.run(query)
}

const createWatchedTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS watched (
    user_id integer,
    type text,
    id integer,
    title text,
    image text)`
  return database.run(query)
}

const createSavedTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS saved (
    user_id integer,
    type text,
    id integer,
    title text,
    image text)`
  return database.run(query)
}

const findViewsById = (user_id, callback) => {
  return database.all(`SELECT * FROM views WHERE user_id = ?`, user_id, (error, row) => {
    callback(error, row)
  })
}

const findWatchedById = (user_id, callback) => {
  return database.all(`SELECT * FROM watched WHERE user_id = ?`, user_id, (error, row) => {
    callback(error, row)
  })
}

const findSavedById = (user_id, callback) => {
  return database.all(`SELECT * FROM saved WHERE user_id = ?`, user_id, (error, row) => {
    callback(error, row)
  })
}

const addView = (user_id, type, id, title, image, callback) => {
  const query = `INSERT INTO views (user_id, type, id, title, image) VALUES (?, ?, ?, ?, ?)`
  const values = [user_id, type, id, title, image]
  return database.get(query, values, (error) => {
    callback(error)
  })
}

const addWatched = (user_id, type, id, title, image, callback) => {
  const query = `INSERT INTO watched (user_id, type, id, title, image) VALUES (?, ?, ?, ?, ?)`
  const values = [user_id, type, id, title, image];
  return database.get(query, values, (error) => {
    callback(error)
  })
}

const addSaved = (user_id, type, id, title, image, callback) => {
  const query = `INSERT INTO saved (user_id, type, id, title, image) VALUES (?, ?, ?, ?, ?)`
  const values = [user_id, type, id, title, image]
  return database.get(query, values, (error) => {
    callback(error)
  })
}

const removeSaved = (user_id, list, type, id, callback) => {
  const query = `DELETE FROM saved WHERE user_id = ? AND list = ? AND type = ? AND id = ?`
  const values = [user_id, list, type, id]
  return database.get(query, values, (error) => {
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

router.post('/views', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']

  findViewsById(user_id, (error, views) => {
    if (error) handleError(res, error.errno)
    else if (!views) handleError (res, 'watched')
    else res.status(200).send(views)
  })
})

router.post('/views/add', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']
  const views_type = req.body['type']
  const views_id = req.body['id']
  const views_title = req.body['title']
  const views_image = req.body['image']

  addView(user_id, views_type, views_id, views_title, views_image, (error) => {
    if (error) handleError(res, error.errno)
    else res.status(200).send()
  })
})

router.post('/watched', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']

  findWatchedById(user_id, (error, watched) => {
    if (error) handleError(res, error.errno)
    else if (!watched) handleError (res, 'watched')
    else res.status(200).send(watched)
  })
})

router.post('/watched/add', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']
  const watched_type = req.body['type']
  const watched_id = req.body['id']
  const watched_title = req.body['title']
  const watched_image = req.body['image']

  addWatched(user_id, watched_type, watched_id, watched_title, watched_image, (error) => {
    if (error) handleError(res, error.errno)
    else res.status(200).send()
  })
})

router.post('/saved', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']

  findSavedById(user_id, (error, saved) => {
    if (error) handleError(res, error.errno)
    else if (!saved) handleError (res, 'saved')
    else res.status(200).send(saved)
  })
})

router.post('/saved/add', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']
  const saved_type = req.body['type']
  const saved_id = req.body['id']
  const saved_title = req.body['title']
  const saved_image = req.body['image']

  addSaved(user_id, saved_type, saved_id, saved_title, saved_image, (error) => {
    if (error) handleError(res, error.errno)
    else res.status(200).send()
  })
})

router.post('/saved/remove', (req, res) => {
  console.log(req.body)

  const user_id = req.body['userId']
  const list_type = req.body['list']
  const saved_type = req.body['type']
  const saved_id = req.body['id']

  removeSaved(user_id, list_type, saved_type, saved_id, (error) => {
    if (error) handleError(res, error.errno)
    else findSavedById(user_id, (error, saved) => {
      if (error) handleError(res, error.errno)
      else if (!saved) handleError(res, 'saved')
      else res.status(200)
    })
  })
})

module.exports = router
