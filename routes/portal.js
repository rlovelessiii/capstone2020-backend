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
