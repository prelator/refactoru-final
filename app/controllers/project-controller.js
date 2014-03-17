var ProjectModel = require('../models/project-model.js');
var gm = require('googlemaps');
var util = require('util');



module.exports = {

  projectIndex: function (req, res) {
    var userName = req.user ? req.user.displayname : "Not logged in";
    ProjectModel.find({}, function (err, projects) {
      if (err) {console.log(err);}
      res.render('projects', {
      title: 'Drone Projects',
      user: userName,
      projectList: projects
      });
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
    var userDetails = req.user;
    gm.geocode(req.body.location, function (err, result) {    
      if (err) {console.log(err);}
      var newProject = new ProjectModel({
        userid: req.user.userid,
        displayName: userDetails.displayname,
        timeStamp: currentDate,
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        multiDay: req.body.multiDay ? true : false,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        locationEntered: req.body.location,
        location: result.results[0].formatted_address || "none",
        coordinates: result.results[0].geometry.location || "none",
        projectType: req.body.projectType,
        photographyType: req.body.photographyType,
        editing: req.body.editing,
        description: req.body.description
      });
      newProject.save(function (err) {
        if (err) {console.log(err);}
      });
      res.redirect("/my-projects");
    }, 'false');
  },

  myProjects: function (req, res) {
    var userName = req.user ? req.user.displayname : "Not logged in";
    var userInfo = req.user;
    ProjectModel.find({userid: userInfo.userid}, function (err, docs) {
      if (err) {console.log(err);}
      res.render('my-projects', {
      title: 'My Projects',
      user: userName,
      userInfo: userInfo,
      userProjects: docs || "none"
      });
    });
  },

  testGeocode: function (req, res) {
    gm.geocode('8707 Aspen Cir. Parker, CO', function (err, result) {
      if (err) {console.log(err);}
      res.send(result);
    }, 'false');
  },

  matchUser: function (req, res, next) {
    var ID = req.params.ID;
    var userInfo = req.user;
    ProjectModel.findOne({_id: ID}, function (err, project) {
      if (err) {res.send(err);}
      if (project.userid === userInfo.userid) {
        return next();
      } else {
        res.send(403);
      }
    });    
  },

  deleteProject: function (req, res) {
    var ID = req.params.ID;
    ProjectModel.remove({_id: ID}, function (err) {
      if (err) {
        res.send(err);
      } else {
      res.send('Project deleted');
      }
    });
  }

};