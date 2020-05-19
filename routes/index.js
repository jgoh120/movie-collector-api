var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Movie Collector API at your service');
});

module.exports = router;
