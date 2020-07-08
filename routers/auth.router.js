const authController = require('../controllers/auth.controller').authController;

var express = require('express');
var router = express.Router();

router.post('/login', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const success = await authController.authenticate (username, password);
    if (success){
        res.send('ok')
    }
    else{
        res.status(401).send("incorrect password or username")
    }
});

module.exports = router;
