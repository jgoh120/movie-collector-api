class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    getAll() {
        return this.userModel.find();
    }

    get(id) {
        return this.userModel.findById(id);
    }

    create(user) {
        // TODO: Validate user object
        return this.userModel.insertOne(user);
    }

    createAll(users) {
        // TODO: Validate movie object
        return this.userModel.insertMany(users);
    }
    
    update(id, user) {
        // TODO: Validate movie object
        return this.userModel.updateOne({ _id: id }, user);
    }

    delete(id) {
        return this.userModel.deleteOne({ _id: id });
    }
}

const userModel = require('../models/user');

module.exports = {
    userService: new userService(userModel)
};