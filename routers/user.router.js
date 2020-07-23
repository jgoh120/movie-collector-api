const auth = require('../config/auth').auth;
const userController = require('../controllers/user.controller').userController;
const router = require('express').Router();

const { body, validationResult } = require('express-validator');

router.post('/register', [
    body('username').custom(async (value) => {
        const user = await userController.getByUsername(value);
        if (user != null) {
          return Promise.reject('Username is already in use!');
        }
    }),
    body('email').custom(async (value) => {
        const user = await userController.getByEmail(value);
        if (user != null) {
          return Promise.reject('Email is already in use!');
        }
    })
], async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    await userController.create(req.body);
    res.send('ok');
});

router.put('/', auth, async(req,res)=>{
    await userController.update(req.user.id, req.body);
    res.send('ok');
});
router.delete('/', auth, async(req,res)=>{
    await userController.delete(req.user.id);
    res.send('ok');
});
router.get('/', auth, async (req, res) => {
    const user = await userController.get(req.user.id);
    res.json(user);
});

module.exports=router;