const authController = require('../controllers/auth.controller').authController;
const auth = require('../config/auth').auth;
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

router.get('/auth-test', auth, (req, res) => {
    res.json(req.user);
});

module.exports = router;
