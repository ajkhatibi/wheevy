let express = require('express');
let passport = require('passport');
let Users = require('../models/Users.js');
let LocalStrategy = require('passport-local').Strategy;
let app = express();

passport.use(new LocalStrategy({
        // usernameField: 'email'
    },
    function(username, password, done) {
        Users.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (user.password !== password) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }));

module.exports = function(app){
  app.post('/users/register', function(req, res) {
      console.log(req.body.location)
      Users.create(new Users({ username : req.body.username, password: req.body.password, gender: req.body.gender, email: req.body.email, location: {coordinates: req.body.location}}) , function(err, account) {
          if (err) {
              console.log(err)
              return res.status(500).json({});

          }

          passport.authenticate('local')(req, res, function() {
            return res.status(200).json({});
          })

      });
  });


  app.post('/users/login',
    passport.authenticate('local'),
    function(req,res, next){
      res.status(200).json({user: req.user});

  });

  app.get('/getuser', function (req, res) {
      console.log(req.user, "get user is being called")
      res.json({username: req.user.username})
  });





}
