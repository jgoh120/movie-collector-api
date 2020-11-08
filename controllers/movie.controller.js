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
            contributorId: movie.contributorId,
        }
    }

    async getPage(pagination, filter){
        const movies = await this.getAll(pagination, filter);
        const count = await this.getTotalCount(filter);

        return {
            movies: movies,
            page: pagination.page,
            totalCount: count
        }
    }

    async getTotalCount(filter){
        const query = {};
        if (filter != undefined) {
            if (filter.minRating >= 1 && filter.maxRating <= 5 && filter.minRating <= filter.maxRating) {
                query.rating = { $gte: filter.minRating, $lte: filter.maxRating };
            }
            if (filter.genre.length > 0) {
                query.genre = { $all: filter.genre };
            }
        }
        return await this.movieRepository.countDocuments(query);
    }

    async getAll(pagination, filter){
        const queryOptions = {};
        if (pagination != undefined) {
            queryOptions.sort = {};
            queryOptions.sort[pagination.sortBy] = pagination.direction == 'desc' ? -1 : 1;
            queryOptions.limit = pagination.limit;
            queryOptions.skip = pagination.limit * (pagination.page - 1);
        }

        const query = { };
        if (filter != undefined) {
            if (filter.minRating >= 1 && filter.maxRating <= 5 && filter.minRating <= filter.maxRating) {
                query.rating = { $gte: filter.minRating, $lte: filter.maxRating };
            }
            if (filter.genre.length > 0) {
                query.genre = { $all: filter.genre };
            }
        }
        const movies = await this.movieRepository.find(query, null, queryOptions);
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