const authController = require('../controllers/auth.controller').authController;
const jwt = require('express-jwt');
const config = require('../config/auth');
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    const token = await authController.authenticate(req.body.username, req.body.password);

    if (token === null) {
        res.status(401).send("Incorrect password or username!");
        return;
    }

    res.json({
        status: 'ok',
        token: token
    });
});

router.get('/auth-test', jwt({ secret: config.secret, algorithms: [config.algorithm] }), (req, res) => {
    res.json(req.user);
});

module.exports = router;
