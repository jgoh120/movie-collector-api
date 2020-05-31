const movieController = require('../controllers/movie.controller').movieController;
const router = require('express').Router();

router.get('/', async (req, res) => {
    const movies = await movieController.getAll();
    res.json(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await movieController.get(req.params.id);
    res.json(movie);
});

router.post('/', async (req, res) => {
    await movieController.create(req.body);
    res.send('ok');
});

router.put('/:id', async (req, res) => {
    await movieController.update(req.params.id, req.body);
    res.send('ok');
});

router.delete('/:id', async (req, res) => {
    await movieController.delete(req.params.id);
    res.send('ok');
});

module.exports = router;