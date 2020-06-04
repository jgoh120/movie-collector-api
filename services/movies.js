class MoviesService {
    constructor(moviesModel) {
        this.moviesModel = moviesModel;
    }

    getAll() {
        return this.moviesModel.find();
    }

    get(id) {
        return this.moviesModel.findById(id);
    }

    create(movie) {
        // TODO: Validate movie object
        return this.moviesModel.insertOne(movie);
    }

    createAll(movies) {
        // TODO: Validate movie object
        return this.moviesModel.insertMany(movies);
    }
    
    update(id, movie) {
        // TODO: Validate movie object
        return this.moviesModel.updateOne({ _id: id }, movie);
    }

    delete(id) {
        return this.moviesModel.deleteOne({ _id: id });
    }
}

const moviesModel = require('../models/movies');

module.exports = {
    moviesService: new MoviesService(moviesModel)
};