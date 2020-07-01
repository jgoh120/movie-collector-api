const reviewController = require('../controllers/review.controller').reviewController;
const router = require('express').Router({mergeParams:true});

router.get('/', async (req,res)=>{
    const reviews = await reviewController.getAllByMovieId(req.params.movieId);
    res.json(reviews);
});
router.post('/',async (req,res)=>{
    await reviewController.create(req.body);
    res.send('ok');
});
router.put('/:reviewId', async(req,res)=>{
    await reviewController.update(req.params.reviewId, req.body);
    res.send('ok');
});
router.delete('/:reviewId', async(req,res)=>{
    await reviewController.delete(req.params.reviewId);
    res.send('ok');
});

module.exports=router;