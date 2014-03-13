var ProjectModel = require('../models/project-model.js');

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
  },

  create: function (req, res) {
    var currentDate = new Date();
    console.dir(req.body);
    var newProject = new ProjectModel({
      userid: req.user.userid,
      displayName: req.user.displayName,
      timeStamp: currentDate,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      multiDay: req.body.multiDay ? true : false,
      time: req.body.time,
      location: req.body.location,
      projectType: req.body.projectType,
      editing: req.body.editing,
      description: req.body.description
    });
    console.log(newProject);
    newProject.save(function (err) {
      if (err) {console.log(err);}
    });
    res.redirect("/my-projects");
  },

  myProjects: function (req, res) {
    var userName = req.user ? req.user.displayname : "Not logged in";
    var userInfo = req.user;
    ProjectModel.find({userid: userInfo.userid}, function (err, docs) {
      if (err) {console.log(err);}
      console.dir(docs);
      res.render('my-projects', {
      title: 'My Projects',
      user: userName,
      userInfo: userInfo,
      userProjects: docs || "none"
      });
    });
    

  }

};