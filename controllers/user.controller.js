class UserController {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    getAll() {
        return this.userRepository.find();
    }

    get(id) {
        return this.userRepository.findById(id);
    }

    create(movie) {
        return this.userRepository.create(movie);
    }
    
    update(id, movie) {
        return this.userRepository.updateOne({ _id: id }, movie);
    }

    delete(id) {
        return this.userRepository.deleteOne({ _id: id });
    }
}

const userRepository = require('../repositories/user.repository');
module.exports = {
    userController: new UserController(userRepository)
};