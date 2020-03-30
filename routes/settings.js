const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3').verbose();
const guidebox = require('../modules/guidebox');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const database = new sqlite.Database('./database/settings.db');

let settings_parameters = {
  channel: '',
  sources: '',
  platform: '',
  include_preorders: '',
  include_in_theaters: '',
  type: ''
};

const filterDefaultParameters = (user_id, callback) => {
  guidebox.getDefaultParamValues((values) => {
    callback([
      user_id,
      values.channel,
      values.sources,
      values.platform,
      values.include_preorders,
      values.include_in_theaters,
      values.type
    ]);
  });
};

const createBrowseTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS browse (
    id integer PRIMARY KEY,
    user_id integer UNIQUE,
    channel text,
    sources text,
    platform text,
    include_preorders text,
    include_in_theaters text,
    type text)`;
  return database.run(query);
};

const findSettingsById = (user_id, callback) => {
  return database.get(`SELECT * FROM browse WHERE user_id = ?`, user_id, (error, row) => {
    callback(error, row);
  })
};

const createUserSettings = (settings, callback) => {
  return database.run(`INSERT INTO browse (user_id, channel, sources, platform, include_preorders, include_in_theaters, type) VALUES (?, ?, ?, ?, ?, ?, ?)`, settings, (error) => {
    callback(error);
  });
};

createBrowseTable();

router.get('/browse', (req, res) => {
});

router.post('/browse', (req, res) => {
  const user_id = req.body.user_id;
  console.log(user_id);
  findSettingsById(user_id, (error, settings) => {
    if (error) return res.status(500).send('Server Error');
    if (!settings) {
      filterDefaultParameters(user_id, (filtered_settings) => {
        console.log(filtered_settings);
        createUserSettings(filtered_settings, (error) => {
          if (error) {
            if (error.errno === 19)
              return res.status(409).send('User settings already entered!');
            return res.status(500).send('Server Error!');
          }
          findSettingsById(user_id, (error, settings) => {
            if (error) return res.status(500).send('Server Error');
            if (!settings) return res.status(404).send('User settings not found!');
            res.status(200).send(settings);
          })
        })
      });
    } else {
      res.status(200).send(settings);
    }
  });
});

module.exports = router;
