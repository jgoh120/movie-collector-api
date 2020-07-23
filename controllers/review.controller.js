class ReviewController {
    
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // Getting all reviews for a partciular movie
    getAllByMovieId(movieId) {
        return this.reviewRepository.find({movieId:movieId});
    }

    get(id) {
        return this.reviewRepository.findById(id);
    }

    create(authorId, movieId,review) {
        return this.reviewRepository.create({
            movieId: movieId,
            authorId: authorId,
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