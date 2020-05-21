const mongoConfig = require('../../config/mongo');

const movies = require('./movies.json');
const moviesService = require('../../services/movies.js').moviesService;

mongoConfig.init().then(async () => {

    await moviesService.createAll(movies);
    console.log('imported ' + movies.length + ' movie(s)');
    mongoose.disconnect();
});

