var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.getHomeUrlZone = function(area) {
     return area;
   }
  res.render('index', { title: 'College PATHS'});
});

module.exports = router;
