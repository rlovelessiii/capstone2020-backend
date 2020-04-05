const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const showsRouter = require('./routes/shows');
const episodesRouter = require('./routes/episodes');
const moviesRouter = require('./routes/movies');
const subscriptionsRouter = require('./routes/subscriptions');
const settingsRouter = require('./routes/settings');
const guideboxTestingRouter = require('./routes/guideboxTesting');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shows', showsRouter);
app.use('/subscriptions', subscriptionsRouter);
app.use('/settings', settingsRouter);
app.use('/movies', moviesRouter);
app.use('/episodes', episodesRouter);
app.use('/guideboxTesting', guideboxTestingRouter);

module.exports = app;
