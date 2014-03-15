module.exports = {

    login: function (req, res) {
        if (req.isAuthenticated()){
            res.redirect('/');
        } else {
            var userName = req.user ? req.user.displayname : "Not logged in";
            res.render('login', {title: 'Login', user: userName});
        }
    },

    loginSuccess: function (req, res) {
        res.redirect('/');
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },

    ensureAuthenticated: function (req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');   
    },

    ensureAuthAJAX: function (req, res, next) {
      if(req.isAuthenticated()) {
        return next();
      }
      res.send(401);
    }

};