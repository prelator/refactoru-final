exports.index = function(req, res){
    var userName = req.user ? req.user.displayname : "Not logged in";
    res.render('index', {
      title: 'Home',
      user: userName
    });
};