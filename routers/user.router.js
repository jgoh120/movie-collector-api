const auth = require('../config/auth').auth;

const userController = require('../controllers/user.controller').userController;
const router = require('express').Router();


router.post('/register',async (req,res)=>{
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