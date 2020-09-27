class ReviewController {
    
    constructor(reviewRepository, movieStatisticsRepository) {
        this.reviewRepository = reviewRepository;
        this.movieStatisticsRepository = movieStatisticsRepository;
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

    // Getting all reviews for a partciular movie
    async getAllByMovieId(movieId) {
        const reviews = await this.reviewRepository.find({ movieId:movieId }, null, {
            sort: {
                createdAt: -1
            }
        });
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
        this.updateMovieRating(movieId);
    }
    
    async update(authorId, movieId, id, review) {
        await this.reviewRepository.updateOne({ _id: id }, review);
        this.updateMovieRating(movieId);
    }

    async delete(authorId, movieId, id) {
        await this.reviewRepository.deleteOne({ _id: id });
        this.updateMovieRating(movieId);
    }
}

const reviewRepository = require('../repositories/review.repository');
const movieStatisticsRepository = require('../repositories/movieStatistics.repository');
module.exports = {
    reviewController: new ReviewController(reviewRepository, movieStatisticsRepository)
};