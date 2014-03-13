var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    userid: String,
    displayName: String,
    timeStamp: String,
    startDate: String,
    endDate: String,
    multiDay: Boolean,
    time: String,
    location: String,
    projectType: String,
    photographyType: String,
    editing: String,
    description: String,
});

var ProjectModel = module.exports = mongoose.model('project', projectSchema);