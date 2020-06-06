const mongoConfig = require('../../config/mongo');
const mongoose = require('mongoose');

const movies = require('./movies.json');
const movieController = require('../../controllers/movie.controller').movieController;

mongoConfig.init().then(async () => {

    await movieController.createAll(movies);
    console.log('imported ' + movies.length + ' movie(s)');
    mongoose.disconnect();
});



