class ReviewController {

    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    getAllByMovieId(movieId) {
        return this.reviewRepository.find({movieId:movieId});
    }

    get(id) {
        return this.reviewRepository.findById(id);
    }

    create(movieId,review) {
        return this.reviewRepository.create({
            movieId:movieId,
            ...review
        });
    }
    
    update(id,review) {
        return this.reviewRepository.updateOne({ _id: id }, review);
    }

    delete(id) {
        return this.reviewRepository.deleteOne({ _id: id });
    }
}

const reviewRepository = require('../repositories/review.repository');
module.exports = {
    reviewController: new ReviewController(reviewRepository)
};