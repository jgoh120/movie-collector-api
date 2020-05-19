var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies')

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

// mount routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);


module.exports = app;
