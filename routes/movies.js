const moviesService = require('../services/movies').moviesService;
const router = require('express').Router();

router.get('/', async (req, res) => {
    const movies = await moviesService.getAll();
    res.json(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await moviesService.get(req.params.id);
    res.json(movie);
});

router.post('/', async (req, res) => {
    await moviesService.create(req.body);
    res.send('ok');
});

router.put('/:id', async (req, res) => {
    await moviesService.update(req.params.id, req.body);
    res.send('ok');
});

router.delete('/:id', async (req, res) => {
    await moviesService.delete(req.params.id);
    res.send('ok');
});

module.exports = router;