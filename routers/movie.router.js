const movieController = require('../controllers/movie.controller').movieController;
const router = require('express').Router();
const auth = require('../config/auth').auth;
const _ = require('lodash');
var reviewRouter = require('./review.router');

router.get('/', async (req, res) => {
    const pagination = {
        sortBy: _.get(req.query, 'sortBy', 'createdAt'), // createdAt, rating
        direction: _.get(req.query, 'direction', 'desc'), // desc, asc
        limit: parseInt(_.get(req.query, 'limit', '3')), // any number > 0
        page: parseInt(_.get(req.query, 'page', '1')), // any number >= 1
    };
    const filter = {
        minRating: parseFloat(_.get(req.query, 'filterMinRating', '1')),
        maxRating: parseFloat(_.get(req.query, 'filterMaxRating', '5')),
        genre: _.get(req.query, 'filterGenre', '').split(',').filter(g => g != '')
    }
    const page = await movieController.getPage(pagination, filter);
    res.json(page);
});

router.get('/:movieId', async (req, res) => {
    const movie = await movieController.get(req.params.movieId);
    res.json(movie);
});

router.post('/', auth, async (req, res) => {
    await movieController.create(req.user.id, req.body);
    res.send('ok');
});

router.put('/:movieId', auth, async (req, res) => {
    await movieController.update(req.user.id, req.params.movieId, req.body);
    res.send('ok');
});

router.delete('/:movieId', auth, async (req, res) => {
    await movieController.delete(req.user.id, req.params.movieId);
    res.send('ok');
});

router.get('/:movieId/stats', async (req, res) => {
    const stats = await movieController.getStatistics(req.params.movieId);
    res.json(stats);
});

router.use('/:movieId/reviews',reviewRouter)

module.exports = router;