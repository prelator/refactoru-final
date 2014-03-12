var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
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
    clientID: '616098165125408',
    clientSecret: 'c769bedb354322f10f835989689e1ee5',
    callbackURL: 'http://localhost:3000/facebook/callback'
}, function (accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile);
    UserModel.findOne({userid: profile.id}, function (err, user) {
        if (user) {return done(err, user);
        }
        var newUser = new UserModel({
            userid: profile.id,
            username: profile.username,
            profile: profile
        });
        newUser.save(function (err, doc) {
            return done(err, doc);
        });
    });
});

passport.use(facebookStrategy);