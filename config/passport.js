var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserModel = require('../app/models/user-model');

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (userid, done) {
    UserModel.findOne({_id: userid}, function (err, user) {
        done(err, user);
    });
});

var facebookStrategy = new FacebookStrategy({
    clientID: '753637631326780',
    clientSecret: '9063c4b3d8359fa6adfef49cbbbc48aa',
    callbackURL: 'http://localdrones.herokuapp.com/login/facebook/return'
  }, 
  function (accessToken, refreshToken, profile, done) {
    UserModel.findOne({userid: profile.id}, function (err, user) {
      if (user) {return done(err, user);
      }
      var newUser = new UserModel({
          userid: profile.id,
          provider: profile.provider || "none",
          displayname: profile.displayName || "none",
          givenname: profile.name.givenName || "none",
          familyname: profile.name.familyName || "none",
          gender: profile.gender || "none",
          picture: profile.picture || "none",
      });
      newUser.save(function (err, doc) {
        return done(err, doc);
      });
    });
});


var googleStrategy = new GoogleStrategy({
    clientID: "274717101968-tl18dqet2ekfg74bccbah2pf6a9bos70.apps.googleusercontent.com",
    clientSecret: "5CqlqpM5-12tXvsDKPRy-LZn",
    callbackURL: "http://localdrones.herokuapp.com/login/google/return"
  },
  function(accessToken, refreshToken, profile, done) {
    UserModel.findOne({userid: profile.id }, function (err, user) {
      if (user) {return done(err, user);
      }
      var newUser = new UserModel({
          userid: profile.id,
          provider: profile.provider || "none",
          displayname: profile.displayName || "none",
          givenname: profile.name.givenName || "none",
          familyname: profile.name.familyName || "none",
          gender: profile._json.gender || "none",
          picture: profile._json.picture || "none",
      });
        newUser.save(function (err, doc) {
          return done(err, doc);
        });
    });
  }
);

passport.use(googleStrategy);
passport.use(facebookStrategy);