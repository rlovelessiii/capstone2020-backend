const express = require('express')
const bodyParser = require('body-parser')
const sqlite = require('sqlite3').verbose()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const database = new sqlite.Database('./database/settings.db')

const createBrowseTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS browse (
    id integer PRIMARY KEY,
    user_id integer UNIQUE,
    channelList text,
    include_preorders text,
    include_in_theaters text)`
  return database.run(query)
}

const createOptionTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS option (
    id integer PRIMARY KEY,
    user_id integer,
    type text,
    title text,
    value text)`
  return database.run(query)
}

const findBrowseSettingsById = (user_id, callback) => {
  return database.get(`SELECT * FROM browse WHERE user_id = ?`, user_id, (error, row) => {
    callback(error, row)
  })
}

const findOptionSettingsById = (user_id, callback) => {
  return database.all(`SELECT * FROM option WHERE user_id = ?`, user_id, (error, row) => {
    callback(error, row)
  })
}

const createBrowseSettings = (settings, callback) => {
  return database.run(`INSERT INTO browse (user_id, channelList, include_preorders, include_in_theaters) VALUES (?, ?, ?, ?)`, settings, (error) => {
    callback(error)
  })
}

const createOptionSetting = (user_id, type, option, callback) => {
  return database.run(`INSERT INTO option (user_id, type, title, value) VALUES (?, ?, ?, ?)`, [user_id, type, option.title, option.value], (error) => {
    callback(error)
  })
}

const updateBrowseSettings = (col, setting, callback) => {
  return database.run(`UPDATE browse SET ` + col + ` = ? WHERE id = ?`, setting, (error) => {
    callback(error)
  })
}

const clearOptionSettings = (user_id, type, callback) => {
  return database.run(`DELETE FROM option WHERE user_id = ? AND type = ?`, [user_id, type], (error) => {
    callback(error)
  })
}

createBrowseTable()
createOptionTable()

const defaultBrowseSettings = (user_id, callback) => {
  return callback([user_id, 'all', 'true', 'true'])
}

const defaultOptionSettings = (callback) => {
  const options = require('../config/config')
  return callback(options);
}

const findUserSettings = (user_id, res, callback) => {
  return findBrowseSettingsById(user_id, (error, settings) => {
    if (error) handleError(res, error.errno)
    if (!settings) handleError(res, 'settings')
    findOptionSettingsById(user_id, (error, options) => {
      if (error) handleError(res, error.errno)
      if (!options) handleError(res, 'options')
      settings.options = options
      return callback(settings)
    })
  })
}

const handleError = (res, errorNum) => {
  switch (errorNum) {
    case 19: return res.status(409).send('User information already entered')
    case 'settings': return res.status(404).send('User settings not found!')
    case 'options': return res.status(404).send('User options not found')
    default: return res.status(500).send('Server Error')
  }
}


router.post('/', (req, res) => {
  console.log(req.body)
  const user_id = req.body['userId']

  findBrowseSettingsById(user_id, (error, settings) => {
    if (error) handleError(res, error.errno)
    if (!settings) {
      defaultBrowseSettings(user_id, default_settings => {

        createBrowseSettings(default_settings, error => {
          if (error) handleError(res, error.errno)

          const option_types = ['channel', 'source', 'platform']

          defaultOptionSettings(default_options => {
            option_types.forEach(type => {
              default_options['available_' + type + 's'].forEach(option => {
                createOptionSetting(user_id, type, option, error => {
                  if (error) handleError(res, error.errno)
                })
              })
            })
            findUserSettings(user_id, res, settings => {
              res.status(200).send(settings)
            })
          })
        })
      })
    } else {
      findOptionSettingsById(user_id, (error, options) => {
        if (error) handleError(res, error.errno)
        if (!options) handleError(res, 'options')
        settings.options = options
        res.status(200).send(settings)
      })
    }
  })
})

router.post('/available', (req, res) => {
  console.log(req.body)
  const available_options = require('../config/config')
  res.status(200).send(available_options)
})

router.post('/browse', (req, res) => {
  const user_id = req.body['userId']
  const col = req.body.key
  const value = req.body.value
  console.log(req.body)
  updateBrowseSettings(col, [value, user_id], (error) => {
    if (error) handleError(res, error.errno)
    findUserSettings(user_id, res, settings => {
      res.status(200).send(settings)
    })
  })
})

router.post('/options', (req, res) => {
  const user_id = req.body['userId']
  const type = req.body['type']
  const options = req.body['options']
  clearOptionSettings(user_id, type, error => {
    if (error) handleError(res, error.errno)
    options.forEach(option => {
      createOptionSetting(user_id, type, option, error => {
        if (error) handleError(res, error.errno)
      })
    })
    findUserSettings(user_id, res, settings => {
      res.status(200).send(settings)
    })
  })
})

module.exports = router;
