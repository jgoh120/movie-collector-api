class ReviewController {
    
    constructor(reviewRepository, movieStatisticsRepository, movieRepository) {
        this.reviewRepository = reviewRepository;
        this.movieStatisticsRepository = movieStatisticsRepository;
        this.movieRepository = movieRepository;
    }

    formatReview(review) {
        return {
            id: review._id,
            description: review.description,
            rating: review.rating,
            header: review.header,
            author: review.author
        }
    }

    async getPageByMovieId(movieId, pagination, filter) {
        const reviews = await this.getAllByMovieId(movieId, pagination, filter);
        const count = await this.getTotalCountByMovieId(movieId, filter);

        return {
            reviews: reviews,
            page: pagination.page,
            totalCount: count
        }
    }

    async getTotalCountByMovieId(movieId, filter) {

        const query = { movieId };
        if (filter != undefined) {
            if (filter.rating > 0 && filter.rating <= 5) {
                query.rating = filter.rating;
            }

            if (filter.authorId != null) {
                query['author.id'] = filter.authorId;
            }
        }

        return await this.reviewRepository.countDocuments(query);
    }

    // Getting all reviews for a partciular movie
    async getAllByMovieId(movieId, pagination, filter) {

        const queryOptions = {};
        if (pagination != undefined) {
            queryOptions.sort = {};
            queryOptions.sort[pagination.sortBy] = pagination.direction == 'desc' ? -1 : 1;
            queryOptions.limit = pagination.limit;
            queryOptions.skip = pagination.limit * (pagination.page - 1);
        }

        const query = { movieId };
        if (filter != undefined) {
            if (filter.rating > 0 && filter.rating <= 5) {
                query.rating = filter.rating;
            }

            if (filter.authorId != null) {
                query['author.id'] = filter.authorId;
            }
        }


        const reviews = await this.reviewRepository.find(query, null, queryOptions);
        return reviews.map(r => this.formatReview(r))
    }

    async get(id) {
        const review = await this.reviewRepository.findById(id);
        return this.formatReview(review);
    }

    async updateMovieRating(movieId) {
        const reviews = await this.getAllByMovieId(movieId);
        const weight = 1 / reviews.length;
        const stats = reviews.reduce((statistics, r) => {
            statistics.count += 1;
            statistics.average += r.rating * weight;
            statistics.distribution[r.rating - 1] += 1;
            return statistics;
        }, {
            distribution: [0, 0, 0, 0, 0],
            count: 0,
            average: 0
        });

        await this.movieRepository.updateOne({ _id: movieId }, {
            rating: stats.average
        });

        await this.movieStatisticsRepository.findOneAndUpdate({ movieId }, {
            movieId: movieId,
            rating: stats
        }, {
            new: true,
            upsert: true
        });
    }

    async create(author, movieId, review) {
        await this.reviewRepository.create({
            movieId: movieId,
            author: {
                id: author.id,
                name: `${author.firstname} ${author.lastname}`
            },
            ...review
        });
        await this.updateMovieRating(movieId);
    }
    
    async update(authorId, movieId, id, review) {
        await this.reviewRepository.updateOne({ _id: id }, review);
        await this.updateMovieRating(movieId);
    }

    async delete(authorId, movieId, id) {
        await this.reviewRepository.deleteOne({ _id: id });
        await this.updateMovieRating(movieId);
    }
}

const reviewRepository = require('../repositories/review.repository');
const movieStatisticsRepository = require('../repositories/movieStatistics.repository');
const movieRepository = require('../repositories/movie.repository');
module.exports = {
    reviewController: new ReviewController(reviewRepository, movieStatisticsRepository, movieRepository)
};