const jwt = require('jsonwebtoken');
const config = require('../config/auth');

class AuthController {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async authenticate(username, password) {
        const user = await this.userRepository.findOne({ username: username, password: password });

        if (user === null) {
            return null;
        }
        const payload = {
            id: user['_id'],
            username: user['username'],
            email: user['email'],
            firstname: user['firstname'],
            lastname: user['lastname'],
            contact: user['contact'],
        }

        const token= jwt.sign(JSON.stringify(payload), config.secret, {
            algorithm: config.algorithm
        });

        return {
            token: token,
            user: payload
        }
    }
}

const userRepository = require('../repositories/user.repository');
module.exports = {
    authController: new AuthController(userRepository)
};