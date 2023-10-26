const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");
require("dotenv").config();

// User login services
const Login = async ({ email, password }) => {
  const userLoginDetail = { email, password };

  const user = await UserModel.findOne({ email: userLoginDetail.email }); // checking db for user provided email address

  if (!user) {
    return {
      message: "User not found.", // handling error if email not found.
      code: 404,
    };
  }

  const userPassword = await user.isValidPassword(userLoginDetail.password); // unhashing password and comparing with one in the db

  if (!userPassword) {
    return {
      message: "Email or passwor not correct!", // handling error if password not found.
      code: 401,
    };
  }

  const token = await jwt.sign(
    { email: user.email, _id: user._id, username: user.username }, // signing jwt token for user login
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    message: "Login successful",
    code: 200,
    data: {
      user,
      token,
    },
  };
};

// Sign up controller
const CreateUser = async ({ email, password, username }) => {
  const newUserInput = { email, password, username };

  const existingUser = await UserModel.findOne({
    // checking if user already exist
    email: newUserInput.email,
  });

  if (existingUser) {
    return {
      message: "User already exist", // handling error if user email already exists.
      code: 404,
    };
  }

  const newUserObject = await UserModel.create({
    // creating user into mongodb database
    username: newUserInput.username,
    email: newUserInput.email,
    password: newUserInput.password,
  });

  const token = await jwt.sign(
    { email: newUserObject.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" } // signing JWTs
  );

  return {
    message: "User created successfully", // success message
    code: 201,
    newUserObject,
    token,
  };
};

module.exports = { Login, CreateUser };
