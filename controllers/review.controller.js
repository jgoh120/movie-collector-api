class ReviewController {
    
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
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

    create(author, movieId, review) {
        return this.reviewRepository.create({
            movieId: movieId,
            author: {
                id: author.id,
                name: `${author.firstname} ${author.lastname}`
            },
            ...review
        });
    }
    
    update(authorId, id, review) {
        return this.reviewRepository.updateOne({ _id: id }, review);
    }

    delete(authorId, id) {
        return this.reviewRepository.deleteOne({ _id: id });
    }
}

const reviewRepository = require('../repositories/review.repository');
module.exports = {
    reviewController: new ReviewController(reviewRepository)
};