var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/one-day');

var userSchema = {
    username: String,
    password: String,
    email: String,
    partner: String,
    preferences: Array,
    activitiesAddedToCalendar: Array
}

var Users = mongoose.model('Users', userSchema, 'users');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req);
    res.render('index', { title: 'One DAY', author: 'Elaine' });
});

module.exports = router;
