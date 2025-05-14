const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();

const getCookie = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);

      res.locals.user = decodedValue;
      next();
    } catch (error) {
      console.log(error.message);
      res.redirect("login");
    }
  }
};

const signUpUserInputValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });

    await schema.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    next();
  } catch (error) {
    return res.status(400).render("signup", { error: error.message });
  }
};

module.exports = {
  getCookie,
  signUpUserInputValidation,
};
