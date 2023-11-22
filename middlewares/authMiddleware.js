const jwt = require('jsonwebtoken');
const User = require('../models/User');

const tokenKey = "THis Is my seCreT tokEN kEy stRInG";

// middleware to check if user is logged in
const loggedIn = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, tokenKey, (err, decoded)=>{
      if (err){
        res.redirect("/users/login")
      } else {
        req.user = decoded.id; // add user to req object
        next();
      }
    })
  } else {
    res.redirect('/users/login');
  }
}

// middleware to check which user is logged in
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt; //get token from jwt cookie
  if (token) {
    jwt.verify(token, tokenKey, (err, decoded)=>{  //verify token is valid
      if (err){
        res.locals.user = null;
        next();
      } else {
        User.findById(decoded.id) // find user with decoded token id
        .then(user => {
          res.locals.user = user; // add user to res.locals
          next();
        })
      }
    })
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = {
  loggedIn,
  checkUser
};