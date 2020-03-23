const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: process.env.KEY
}

// passport.use(new JwtStrategy(jwtOpts,()))

module.exports={
    getToken: (userInfo)=> jwt.sign({_id:userInfo}, jwtOpts.secretOrKey)
}