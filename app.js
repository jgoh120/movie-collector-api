var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter = require('./routers/index.router');
var movieRouter = require('./routers/movie.router');


var mongoConfig = require('./config/mongo');
mongoConfig.init();

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

// mount routers
app.use('/', indexRouter);
app.use('/movies', movieRouter);

module.exports = app;
