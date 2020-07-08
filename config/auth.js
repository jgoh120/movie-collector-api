const jwt = require('express-jwt');
const JWT_SECRET = 'this-is-a-secret-key';
const JWT_ALGORITHM = 'HS256';

module.exports = {
    secret: JWT_SECRET,
    algorithm: JWT_ALGORITHM,
    auth: jwt({ secret: JWT_SECRET, algorithms: [ JWT_ALGORITHM ] })
};
