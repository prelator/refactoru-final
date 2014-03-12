var express = require('express');
var passport = require('passport');
var passportConfig = require('./passport.js');

module.exports = function(app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');
    app.use(express.favicon(config.root + '/public/img/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());    
    app.use(express.cookieParser());
    app.use(express.session({secret: 'secret string'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(function(req, res) {
      var userName = req.user ? req.user.displayname : "Not logged in";
      res.status(404).render('404', { title: 'Not Found', user: userName });
    });
  });
};
