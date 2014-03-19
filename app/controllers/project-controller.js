var ProjectModel = require('../models/project-model.js');
var gm = require('googlemaps');
var util = require('util');



module.exports = {

  //Main project list page
  projectIndex: function (req, res) {
    var userName = req.user ? req.user.displayname : "Not logged in";
    ProjectModel.find({}, function (err, projects) {
      if (err) {res.send(err);}
      res.render('projects', {
      title: 'Drone Projects',
      user: userName,
      projectList: projects
      });
    });    
  },

  //Post new project page
  newProject: function (req, res) {
    var userName = req.user ? req.user.displayname : "Not logged in";
    var userInfo = req.user;
    res.render('post-project', {
      title: 'Post New Drone Project',
      user: userName,
      userInfo: userInfo
    });
  },

  //Create project controller
  create: function (req, res) {
    var currentDate = new Date();
    gm.geocode(req.body.location, function (err, result) {    
      if (err) {
        console.log(err);
      }
      if (result) {
        var newProject = new ProjectModel({
          userid: req.user.userid,
          displayName: req.user.displayname,
          timeStamp: currentDate,
          title: req.body.title,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          multiDay: req.body.multiDay,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          locationEntered: req.body.location,
          location: result.results[0].formatted_address,
          coordinates: result.results[0].geometry.location,
          projectType: req.body.projectType,
          photographyType: req.body.photographyType,
          editing: req.body.editing,
          description: req.body.description,
          bids: []
        });
        newProject.save(function (err) {
          if (err) {console.log(err);}
        }); 
    }
      res.redirect("/my-projects");
    }, 'false');
  },

  //My projects page controller
  myProjects: function (req, res) {
    ProjectModel.find({}, function (err, projects) {
      if (err) {
        res.send(err);
      }
      var userName = req.user ? req.user.displayname : "Not logged in";
      var userInfo = req.user;
      var userProjects = [];
      var bidProjects = [];
      for (var i = 0; i < projects.length; i++) {
        if (projects[i].userid === userInfo.userid) {
          userProjects.push(projects[i]);
        }
        for (var t = 0; t < projects[i].bids.length; t++) {
          if (projects[i].bids[t].user === userInfo.userid) {
            bidProjects.push({
              project: projects[i],
              bid: projects[i].bids[t]
            });
          }
        } 
      }
      console.log("Bid projects: " + bidProjects);
      res.render('my-projects', {
        title: 'My Projects',
        user: userName,
        userInfo: userInfo,
        userProjects: userProjects,
        bidProjects: bidProjects
      });
    });  
  },

  //Geocoding test controller
  testGeocode: function (req, res) {
    gm.geocode('8707 Aspen Cir. Parker, CO', function (err, result) {
      if (err) {console.log(err);}
      res.send(result);
    }, 'false');
  },

  //Authenticate same user
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

  //Delete project controller
  deleteProject: function (req, res) {
    var ID = req.params.ID;
    ProjectModel.remove({_id: ID}, function (err) {
      if (err) {
        res.send(err);
      } else {
      res.send('Project deleted');
      }
    });
  },

  //Display individual project controller
  displayProject: function (req, res) {
    var ID = req.params.ID;
    var userName = req.user ? req.user.displayname : "Not logged in";
    var userInfo = req.user;
    var sameUser = false;
    ProjectModel.findOne({_id: ID}, function (err, project) {
      if (err) {
        res.send(err);
      } else {
        if (userInfo !== undefined) {
          if (project.userid === userInfo.userid) {
            sameUser = true;
          }
        }
        res.render('display-project', {
          title: project.title,
          user: userName,
          sameUser: sameUser,
          project: project
        });
      }
    });
  },

  //Create new bid
  createBid: function (req, res) {
    var projectID = req.params.ID;
    var currentDate = new Date();
    var userDetails = req.user;
    newBid = {
      timestamp: currentDate,
      user: userDetails.userid,
      companyName: req.body.company,
      contactName: req.body.contact,
      phone: req.body.phone,
      email: req.body.email,
      rate: req.body.rate,
      estimate: req.body.estimate,
      fixedWing: req.body.fixedWing === "on" ? true : false,
      multicopter: req.body.multicopter === "on" ? true : false,
      helicopter: req.body.helicopter === "on" ? true : false,
      cameras: req.body.cameras,
      editing: req.body.editing,
      comment: req.body.comment
    };
    ProjectModel.findOne({_id: projectID}, function (err, project) {
      if (err) {console.log(err);}
      var bids = project.bids ? project.bids : [];
      bids.push(newBid);
      ProjectModel.findOneAndUpdate({_id: projectID}, {bids: bids}, function(error, doc) {
        if (error) {res.send(error);}
        res.redirect('/my-projects');
      });
    });

    
  }

};