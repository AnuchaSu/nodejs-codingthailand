const User = require("../models/userMedels");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

exports.index = (req, res, next) => {
  res.status(200).json({
    message: "Hello Users",
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

   const errors = await validationResult(req);
   if(!errors.isEmpty()){
    const error = new Error('incorrect data');
    error.statusCode = 401;
    error.validation = errors.array();
    throw error;
   }

   const existEmail = await User.findOne({email:email});
   if(existEmail){
     const error = new Error('the email already been used')
     error.statusCode = 400;
     throw error;
   } 

   const user = new User();
   user.name = name;
   user.email = email;
   user.password = await user.encryptPassword(password);
   await user.save()

    res.status(201).json({
      message: "completed",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("not found user in system");
      error.statusCode = 404;
      throw error;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      const error = new Error("Incorrect password");
      error.statusCode = 401;
      throw error;
    }

    const token = await jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      config.JWT_SECRET,
      { expiresIn: "5 days" }
    );

    const expires_in = jwt.decode(token);

    res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: "Bearer",
    });

  } catch (error) {
    next(error);
  }
};

exports.me = (req, res, next) => {
  const {_id,name,email,role} = req.user;
  return res.status(200).json({
   data:{
     id:_id,
     name:name,
     email:email,
     role:role
   }
 })
};
