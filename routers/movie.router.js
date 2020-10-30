const movieController = require('../controllers/movie.controller').movieController;
const router = require('express').Router();
const auth = require('../config/auth').auth;

var reviewRouter = require('./review.router');

router.get('/', async (req, res) => {
    // const movies = await movieController.getAll();
    // res.json(movies);
    const pagination = {
        sortBy: _.get(req.query, 'sortBy', 'createdAt'), // createdAt, rating
        direction: _.get(req.query, 'direction', 'desc'), // desc, asc
        limit: parseInt(_.get(req.query, 'limit', '3')), // any number > 0
        page: parseInt(_.get(req.query, 'page', '1')), // any number >= 1
    };
    const filter = {
        averageRating: parseInt(_.get(req.query, 'filterRating', '0')),
        genre: _.get(req.query, 'filterGenre', null)
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