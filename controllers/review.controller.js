class ReviewController {
    
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // Getting all reviews for a partciular movie
    getAllByMovieId(movieId) {
        return this.reviewRepository.find({ movieId:movieId }, null, {
            sort: {
                createdAt: -1
            }
        });
    }

    get(id) {
        return this.reviewRepository.findById(id);
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
    
    update(authorId, id,review) {
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