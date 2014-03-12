module.exports = {

  projectIndex: function (req, res) {
    var userName = req.user ? req.user.displayname : "Not logged in";
    res.render('projects', {
      title: 'View Drone Projects',
      user: userName
    });
  },

  newProject: function (req, res) {
    var userName = req.user ? req.user.displayname : "Not logged in";
    var userInfo = req.user;
    res.render('post-project', {
      title: 'Post New Drone Project',
      user: userName,
      userInfo: userInfo
    });
  }



};