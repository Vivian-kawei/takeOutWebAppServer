require('./database');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var seller = require('./routes/seller'); // seller路由
var goods = require('./routes/goods'); // goods路由
var ratings = require('./routes/ratings'); // ratings路由
var auth = require('./routes/auth'); // autn路由
var address = require('./routes/address'); // address路由
var order = require('./routes/order'); // order路由
var collect = require('./routes/collect'); // collect路由
var search = require('./routes/search'); // search路由

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'ljh',
    cookie: {maxAge: 1000 * 60 * 60 },  //设置maxAge是1000 * 60 * 60 ms，即1小时后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'views')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  next();
});

app.use('/seller', seller);
app.use('/goods', goods);
app.use('/ratings', ratings);
app.use('/auth', auth);
app.use('/address', address);
app.use('/order', order);
app.use('/collect', collect);
app.use('/search', search);

app.use(function(req, res, next) {
  res.json({status: 404});
});


module.exports = app;
