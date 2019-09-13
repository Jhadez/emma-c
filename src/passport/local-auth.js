'use strict'

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/User");


passport.serializeUser(function(user, done) {
    done(null, user.email);
  });
   
  passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
      done(null, id);
    // });
  });

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  }, async (req, email, password, done)=>{ 
    // const response = new Buffer(req.body.SAMLResponse || req.body.SAMLRequest, 'base64');
    // const parser = new Saml2js(response);
    // const user = parser.toObject();
    // const emaill = user.emailaddress;
    var user = new User();

    var user_exists = await user.find_user(email);
    if(user_exists != false){
        return done(null, {email: email, password: password});
    }
    
    return done(null, false, req.flash('message', 'User Not found.'));
   
}));