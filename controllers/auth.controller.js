const jwt = require('jsonwebtoken');
const config = require('../config/auth');

class AuthController {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async authenticate(username, password){
        const user = await this.userRepository.findOne({username: username, password: password});

        if (user === null) {
            return null;
        }

        return jwt.sign(user.toJSON(), config.secret, {
            algorithm: config.algorithm
        });
    }
}

const userRepository = require('../repositories/user.repository');
module.exports = {
    authController: new AuthController(userRepository)
};