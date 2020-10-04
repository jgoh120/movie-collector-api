class MovieController {

    constructor(movieRepository, movieStatisticsRepository) {
        this.movieRepository = movieRepository;
        this.movieStatisticsRepository = movieStatisticsRepository;
    }

    formatMovie(movie) {
        return {
            id: movie._id,
            genre: movie.genre,
            posterUrl: movie.posterUrl,
            rating: movie.rating,
            title: movie.title,
            contributorId: movie.contributorId
        }
    }

    async getAll() {
        const movies = await this.movieRepository.find();
        return movies.map(m => this.formatMovie(m));
    }

    async get(id) {
        const movie = await this.movieRepository.findById(id);
        return this.formatMovie(movie);
    }

    create(contributorId, movie) {
        return this.movieRepository.create({
            contributorId: contributorId,
            ...movie
        });
    }

    createAll(movies) {
        return this.movieRepository.insertMany(movies);
    }
    
    update(contributorId, id, movie) {
        return this.movieRepository.updateOne({ _id: id }, movie);
    }

    delete(contributorId, id) {
        return this.movieRepository.deleteOne({ _id: id });
    }

    getStatistics(id) {
        return this.movieStatisticsRepository.findOne({
            movieId: id
        });
    }
}

const movieRepository = require('../repositories/movie.repository');
const movieStatisticsRepository = require('../repositories/movieStatistics.repository');
module.exports = {
    movieController: new MovieController(movieRepository, movieStatisticsRepository)
};