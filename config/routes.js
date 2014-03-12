var passport = require('passport');

module.exports = function(app){

	//home route
	var home = require('../app/controllers/home.js');
	app.get('/', home.index);

  //Authentication
  var authController = require('../app/controllers/auth-controller.js');
  app.get('/login', authController.login);
  app.get('/login/facebook', passport.authenticate('facebook'));
  app.get(
    '/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    authController.loginSuccess
  );
  app.get('/logout', authController.logout);

};
