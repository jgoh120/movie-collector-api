const reviewController = require('../controllers/review.controller').reviewController;
const router = require('express').Router({mergeParams:true});
const auth = require('../config/auth').auth;
const _ = require('lodash');

router.get('/', async (req,res)=>{

    // TODO need to perform validation on options to only allow supported values
    const pagination = {
        sortBy: _.get(req.query, 'sortBy', 'createdAt'), // createdAt, rating
        direction: _.get(req.query, 'direction', 'desc'), // desc, asc
        limit: parseInt(_.get(req.query, 'limit', '10')), // any number > 0
        page: parseInt(_.get(req.query, 'page', '1')) // any number >= 1
    };

    const page = await reviewController.getPageByMovieId(req.params.movieId, pagination);
    res.json(page);
});
router.get('/:reviewId', auth, async(req, res)=>{
    const review = await reviewController.get(req.params.reviewId);
    res.json(review);
})
router.post('/', auth, async (req,res)=>{
    await reviewController.create(req.user, req.params.movieId, req.body);
    res.send('ok');
});
router.put('/:reviewId', auth, async(req,res)=>{
    await reviewController.update(req.user.id, req.params.movieId, req.params.reviewId, req.body);
    res.send('ok');
});
router.delete('/:reviewId', auth, async(req,res)=>{
    await reviewController.delete(req.user.id, req.params.movieId, req.params.reviewId);
    res.send('ok');
});

module.exports=router;