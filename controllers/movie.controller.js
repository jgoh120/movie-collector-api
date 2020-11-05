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
            averageRating: movie.averageRating,
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
            if (filter.rating > 0 && filter.rating <= 5) {
                query.rating = filter.rating;
            }

            if (filter.genres != null) {
                query['genres'] = filter.genres
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
            if (filter.rating > 0 && filter.rating <= 5) {
                query.rating = filter.rating;
            }
            if (filter.genre != null) {
                query['genre'] = filter.genre;
            }
        }
        
        const movies = await this.movieRepository.find(query, null, queryOptions);
        return movies.map(r => this.formatMovie);
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