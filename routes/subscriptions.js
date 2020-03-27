const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3').verbose();

const router = express.Router();

router.get('/', function(req, res, next) {
    res.send('PortalStream Subscriptions');
});

module.exports = router;