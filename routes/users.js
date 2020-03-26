const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const SECRET_KEY = 'key1234';

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const database = new sqlite.Database('./database/users.db');

const createUsersTable = () => {
  const query = `
      CREATE TABLE IF NOT EXISTS users (
      id integer PRIMARY KEY,
      email text UNIQUE,
      username text,
      password text)`;
  return database.run(query);
};

const findUserByEmail = (email, callback) => {
  return database.get(`SELECT * FROM users WHERE email = ?`,[email], (error, row) => {
    callback(error, row);
  });
};

const createUser = (user, callback) => {
  return database.run(`INSERT INTO users (email, username, password) VALUES (?, ?)`, user, (error) => {
    callback(error);
  });
};

createUsersTable();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('PortalStream Authentication');
});

router.post('/register', (req, res) => {
  console.log(req.body);
  const email = req.body.email.toLowerCase();
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password);

  createUser([email, username, password], (error) => {
    if (error) {
      if (error.errno === 19)
        return res.status(409).send('Email already registered!');
      return res.status(500).send('Server Error!');
    }
    res.status(201).send(['Account created!']);
  });
});

router.post('/login', (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  findUserByEmail(email, (error, user) => {
    if (error) return res.status(500).send('Server Error');
    if (!user) return res.status(404).send('User not found!');

    const result = bcrypt.compareSync(password, user.password);
    if (!result) return res.status(401).send('Password not valid!');

    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

    res.status(200).send({
      "user": user,
      "access_token": accessToken,
      "expires_in": expiresIn
    });
  });
});

router.post('/me', (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });
    res.status(200).send(decoded);
  })
});

module.exports = router;
