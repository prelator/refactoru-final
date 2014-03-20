module.exports = {

  legal: function(req, res) {
    var userName = req.user ? req.user.displayname : "Not logged in";
    res.render('legal', {
      title: 'Legal Info',
      user: userName
    });
  },

  about: function(req, res) {
    var userName = req.user ? req.user.displayname : "Not logged in";
    res.render('about', {
      title: 'About This Site',
      user: userName
    });
  }




};