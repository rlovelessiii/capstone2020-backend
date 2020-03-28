const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3').verbose();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const database = new sqlite.Database('./database/subscriptions.db');

const createSubscriptionsTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS subscriptions (
        id integer,
        provider,
        PRIMARY KEY(id, provider))`;
    return database.run(query);
};

createSubscriptionsTable();

router.get('/', function(req, res, next) {
    res.send('PortalStream Subscriptions');
});

/**
 * A post request to /subscriptions will return a list of subscriptions for the user
 * Requires Post param of id, representing the userID
 */
router.post('/', function(req, res, next) {
    let sql = `SELECT provider FROM subscriptions WHERE ID = ?`;
    let id = req.body.id;
    let subscriptions = [];

    database.all(sql, [id], (err, rows) => {
        if(err) {
            res.send('Error');
        }
        rows.forEach((row) => {
            subscriptions.push(row.provider);
        });
    });
    database.close();
    res.send({subscriptions: subscriptions})
});
module.exports = router;