var express = require('express');
var path = require('path');
hike = require('./routes/hike');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('./i18n');

var index = require('./routes/index');
var users = require('./routes/users');
var background = require('./routes/background');
var team = require('./routes/team');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n);
app.use(express.static(path.join(__dirname, 'public')));

// default local variables
app.use(function (req, res, next) {
  var inEnglish = req.getLocale() == 'en';
  res.locals.langParam = inEnglish ? '' : '?lang=es';
  res.locals.changeLanguageUrl = inEnglish ? '?lang=es' : req.originalUrl.split('?')[0];
  res.locals.url = req.originalUrl.split('?')[0];
  res.locals.getHomeUrlZone = function(area) {
    return '/' + res.locals.langParam + area;
  }
  next();
});

// Routes
app.get('/hikes', hike.index);
app.post('/add_hike', hike.add_hike);

app.use('/', index);
app.use('/users', function (req, res) {
    res.send('<body>res: ' + res.__('Hello') + ' req: ' + req.__('Hello') + '</body>');
});
app.use('/background', background);
app.use('/team', team);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
