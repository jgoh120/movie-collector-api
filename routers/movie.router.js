const movieController = require('../controllers/movie.controller').movieController;
const router = require('express').Router();
const auth = require('../config/auth').auth;

var reviewRouter = require('./review.router');

router.get('/', async (req, res) => {
    const movies = await movieController.getAll();
    res.json(movies);
});

router.get('/:movieId', async (req, res) => {
    const movie = await movieController.get(req.params.movieId);
    res.json(movie);
});

router.post('/', auth, async (req, res) => {
    await movieController.create(req.body, req.user.id);
    res.send('ok');
});

router.put('/:movieId', auth, async (req, res) => {
    await movieController.update(req.params.movieId, req.body);
    res.send('ok');
});

router.delete('/:movieId', auth, async (req, res) => {
    await movieController.delete(req.params.movieId);
    res.send('ok');
});

router.use('/:movieId/reviews',reviewRouter)

module.exports = router;