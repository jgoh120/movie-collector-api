const router = require('express').Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
const userService = require('../services/user').userService;
const router = require('express').Router();

router.get('/', async (req, res) => {
    const users = await userService.getAll();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await userService.get(req.params.id);
    res.json(user);
});

router.post('/', async (req, res) => {
    await userService.create(req.body);
    res.send('ok user added');
});

router.put('/:id', async (req, res) => {
    await userService.update(req.params.id, req.body);
    res.send('ok user amended');
});

router.delete('/:id', async (req, res) => {
    await userService.delete(req.params.id);
    res.send('ok');
});

module.exports = router;