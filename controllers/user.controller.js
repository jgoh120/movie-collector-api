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

    create(user) {
        return this.userRepository.create(user);
    }
    
    update(id, user) {
        return this.userRepository.updateOne({ _id: id }, user);
    }

    delete(id) {
        return this.userRepository.deleteOne({ _id: id });
    }

    getByUsername(username) {
        return this.userRepository.findOne({ username: username });
    }

    getByEmail(email) {
        return this.userRepository.findOne({ email: email });
    }


}

const userRepository = require('../repositories/user.repository');
module.exports = {
    userController: new UserController(userRepository)
};