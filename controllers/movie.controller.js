class MovieController {

    constructor(movieRepository) {
        this.movieRepository = movieRepository;
    }

    getAll() {
        return this.movieRepository.find();
    }

    get(id) {
        return this.movieRepository.findById(id);
    }

    create(movie) {
        return this.movieRepository.create(movie);
    }

    createAll(movies) {
        return this.movieRepository.insertMany(movies);
    }
    
    update(id, movie) {
        return this.movieRepository.updateOne({ _id: id }, movie);
    }

    delete(id) {
        return this.movieRepository.deleteOne({ _id: id });
    }

}

const movieRepository = require('../repositories/movie.repository');
module.exports = {
    movieController: new MovieController(movieRepository)
};