class AuthController {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async authenticate(username, password){
        const user = await this.userRepository.findOne({username: username, password: password});
        return user !=null; 
    }
}

const userRepository = require('../repositories/user.repository');
module.exports = {
    authController: new AuthController(userRepository)
};