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

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('index', {user: {}, title: 'One DAY'});
});

/* POST add user and direct to recommendations page upon login */
router.post('/users/:id/recommendations', function(req, res, next) {
    var newUser = new Users(req.body);
    newUser.save(function (err, doc) {
        res.render('recommendations', {title: 'Recommendations', user: doc});
    });
});

module.exports = router;
