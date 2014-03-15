var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    userid: String,
    displayName: String,
    timeStamp: String,
    title: String,
    startDate: String,
    endDate: String,
    multiDay: Boolean,
    startTime: String,
    endTime: String,
    locationEntered: String,
    location: String,
    coordinates: Object,
    projectType: String,
    photographyType: String,
    editing: String,
    description: String,
});

var ProjectModel = module.exports = mongoose.model('project', projectSchema);