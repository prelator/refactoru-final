var passport = require('passport');

module.exports = function(app){

	//home route
	var home = require('../app/controllers/home.js');
	app.get('/', home.index);

//======= Authentication =============
  var authController = require('../app/controllers/auth-controller.js');  

  //Main login page
  app.get('/login', authController.login);
  
  //Facebook login
  app.get('/login/facebook', passport.authenticate('facebook'));
  app.get('/login/facebook/return',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    authController.loginSuccess
  );
  
  //Google login
  app.get('/login/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));
  app.get('/login/google/return',
    passport.authenticate('google', {failureRedirect: '/login'}),
    authController.loginSuccess
    );

  //Logout
  app.get('/logout', authController.logout);

//======== Profile ========================
  var profileController = require('../app/controllers/profile-controller.js');
  
  //Edit profile page  
  app.get('/edit-profile', authController.ensureAuthenticated, profileController.editPage);

//======== Projects ==================
  var projectController = require('../app/controllers/project-controller.js');

  //Projects index
  app.get('/projects', projectController.projectIndex);

  //Post new project
  app.get('/new-project', authController.ensureAuthenticated, projectController.newProject);



};
