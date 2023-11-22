const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenKey = "THis Is my seCreT tokEN kEy stRInG";
const maxAge = 60 * 60 * 24

// function to generate json web token
function generateToken(id){
  const token = jwt.sign({id}, tokenKey, {expiresIn: maxAge});
  return token;
}

// get signup page
module.exports.signup_page = (req, res) => {
  res.render('user/signup');
};

// post signup page
module.exports.signup_post = async (req, res) => {
  let {firstname, lastname, email, password} = req.body;
  // generate salt
  const salt = await bcrypt.genSalt()
  // hash the password using that salt
  password = await bcrypt.hash(password, salt)

  // create new user object
  const user = new User({
    firstname,
    lastname,
    email,
    password
  });
  
  // save user object
  user.save()
  .then(data => {
    res.json({
      "message": "User registered successfully",
      "user": data
    });
  })
  .catch(err => {
    console.log(err.message);
  })
};

// get login page
module.exports.login_page = (req, res) => {
  res.render('user/login');
}

// post login page
module.exports.login_post = async (req, res) => {
  let {email, password} = req.body;

  // find user with given email
  const user = await User.findOne({email});

  if (user){
    // check password
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      // generate user json web token
      const token = generateToken(user.id);
      // add token as cookie to response object
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000
      })

      res.json({
        "message": "User logged in successfully",
        "user": {
          "firstname": user.firstname,
          "lastname": user.lastname,
          "email": user.email
        }
      })
    } else {
      res.send("The password is incorrect")
    }
  } else {
    res.send(`User with email ${email} not found`)
  }

}

module.exports.my_profile = (req, res)=>{
  res.render('user/my-profile');
}

module.exports.user_profile = (req, res)=>{
  res.render('user/user-profile');
}