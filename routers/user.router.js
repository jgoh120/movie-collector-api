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
    res.send('ok user added');
});
router.put('/:userId', async(req,res)=>{
    await reviewController.update(req.params.userId, req.body);
    res.send('ok user details amended');
});
router.delete('/:userId', async(req,res)=>{
    await reviewController.delete(req.params.userId);
    res.send('ok user deleted');
});

module.exports=router