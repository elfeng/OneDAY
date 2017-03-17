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

/* GET home page */
// TODO: move login form to separate page
router.get('/', function(req, res, next) {
    res.render('index', {user: {}, title: 'One DAY'});
});

/* POST add user and direct to recommendations page upon login */
router.post('/:id/recommendations', function(req, res, next) {
    var newUser = new Users(req.body);
    newUser.save(function (err, doc) {
        res.render('recommendations', {user: doc, partner: doc.partner, title: 'One DAY'});
    });
});

/* GET footprints page */
router.get('/:id/footprints', function(req, res, next) {
    res.render('footprints', {user: {}, title: 'One DAY'});
});

/* GET user object and insert it into preference form */
router.get('/:id', function(req,res, next) {
    Users.findById(req.params.id).exec(function(err, doc) {
        res.render('preferences', {user: doc, action: '/' + doc._id, title: 'One DAY'});
    });
});

/* POST user object to current object in database */
router.post('/:id', function(req, res, next) {
    Users.update({_id: req.params.id}, {$set: req.body}).exec(function(err, doc) {
        if (err) {

        } else {
            res.redirect(req.params.id);
        }
    });
});

module.exports = router;
