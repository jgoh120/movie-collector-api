const reviewController = require('../controllers/review.controller').reviewController;
const router = require('express').Router({mergeParams:true});
const auth = require('../config/auth').auth;

router.get('/', async (req,res)=>{
    const reviews = await reviewController.getAllByMovieId(req.params.movieId);
    res.json(reviews);
});
router.post('/', auth, async (req,res)=>{
    await reviewController.create(req.user, req.params.movieId, req.body);
    res.send('ok');
});
router.put('/:reviewId', auth, async(req,res)=>{
    await reviewController.update(req.user.id, req.params.reviewId, req.body);
    res.send('ok');
});
router.delete('/:reviewId', auth, async(req,res)=>{
    await reviewController.delete(req.user.id, req.params.reviewId);
    res.send('ok');
});

module.exports=router;