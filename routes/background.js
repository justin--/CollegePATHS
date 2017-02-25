var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('background', { title: 'College PATHS - ' + res.__('Menu.background') });
});

module.exports = router;