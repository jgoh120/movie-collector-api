const userController = require('../controllers/user.controller').userController;
const router = require('express').Router();

router.get('/', async (req,res)=>{
    const users = await userController.getAll();
    res.json(users);
});
router.get('/:userId', async (req, res) => {
    const user = await userController.get(req.params.userId);
    res.json(user);
});

router.post('/',async (req,res)=>{
    await userController.create(req.body);
    res.send('ok');
});
router.put('/:userId', async(req,res)=>{
    await userController.update(req.params.userId, req.body);
    res.send('ok');
});
router.delete('/:userId', async(req,res)=>{
    await userController.delete(req.params.userId);
    res.send('ok');
});

module.exports=router