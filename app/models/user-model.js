var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userid: String,
    provider: String,
    displayname: String,
    givenname: String,
    familyname: String,
    gender: String,
    picture: String,
});

var UserModel = module.exports = mongoose.model('user', userSchema);