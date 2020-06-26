class ReviewerController {

    constructor(reviewerRepository) {
        this.reviewerRepository = reviewerRepository;
    }

    getAll() {
        return this.reviewerRepository.find();
    }

    get(id) {
        return this.reviewerRepository.findById(id);
    }

    create(reviewer) {
        return this.reviewerRepository.create(reviewer);
    }
    
    update(id, reviewer) {
        return this.reviewerRepository.updateOne({ _id: id }, reviewer);
    }

    delete(id) {
        return this.reviewerRepository.deleteOne({ _id: id });
    }
}

const reviewerRepository = require('../repositories/reviewer.repository');
module.exports = {
    reviewerController: new ReviewerController(reviewerRepository)
};