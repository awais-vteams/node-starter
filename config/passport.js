let  JwtStrategy = require('passport-jwt').Strategy;
let  ExtractJwt = require('passport-jwt').ExtractJwt;
let  User = require('../model/user');
let  config = require('../config/database');

module.exports = function(passport) {
     let   opts = {};
    opts.secretOrKey =  config.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.find({id: jwt_payload.id}, function(err, user){
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));
};
