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

/* GET user object and insert it into preference form */
router.get('/users/:id', function(req,res, next) {
    Users.findById(req.params.id).exec(function(err, doc) {
        res.render('preferences', {user: doc, action: '/users/' + doc._id + '/update'});
    });
});

/* POST user object to current object in database */
router.post('/users/:id/update', function(req, res, next) {
   Users.update({_id: req.params.id}, {$set: req.body}).exec(function(err, doc) {
        if (err) {

        } else {
            res.redirect('/users/' + req.params.id);
        }
    });
});

/* POST add user and direct to recommendations page upon login */
router.post('/users/:id/recommendations', function(req, res, next) {
    var newUser = new Users(req.body);
    newUser.save(function (err, doc) {
        res.render('recommendations', {user: doc});
    });
});

module.exports = router;
