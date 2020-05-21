const mongoose = require('mongoose');

module.exports = {
    init: (config = {
        host: 'localhost',
        port: '27017',
        db: 'movie-collector'
    }) => {
    
        mongoose.connection.on('error', error => {
            console.error('MongoDB connection error: ' + error);
        });
    
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully!');
        });

        return mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}
