var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('team', { title: 'College PATHS - ' + res.__('Menu.team') });
  console.log('Path = ' + req.path)
});

module.exports = router;