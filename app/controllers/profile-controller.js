module.exports = {

  editPage: function (req, res) {
    var userName = req.user ? req.user.displayname : "Not logged in";
    var userInfo = req.user;
    res.render('edit-profile', {
      title: 'Edit Profile',
      user: userName,
      userInfo: userInfo
    });
  }



};