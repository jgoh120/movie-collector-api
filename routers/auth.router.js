const authController = require('../controllers/auth.controller').authController;
const auth = require('../config/auth').auth;
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    const authData = await authController.authenticate(req.body.username, req.body.password);

    if (authData === null) {
        res.status(401).send("Incorrect password or username!");
        return;
    }

    res.json({
        status: 'ok',
        ...authData
    });
});


module.exports = router;
