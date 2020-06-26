const reviewersController = require('../controllers/reviewers.controller').userController;
const router = require('express').Router();

router.get('/', async (req,res)=>{
    const reviewers = await reviewersController.getAll();
    res.json(reviewers);
});
router.get('/:reviewerId', async (req, res) => {
    const reviewer = await reviewersController.get(req.params.reviewerId);
    res.json(reviewer);
});

router.post('/',async (req,res)=>{
    await reviewersController.create(req.body);
    res.send('ok');
});
router.put('/:reviewerId', async(req,res)=>{
    await reviewersController.update(req.params.reviewerId, req.body);
    res.send('ok');
});
router.delete('/:reviewerId', async(req,res)=>{
    await reviewersController.delete(req.params.reviewerId);
    res.send('ok');
});

module.exports=router;