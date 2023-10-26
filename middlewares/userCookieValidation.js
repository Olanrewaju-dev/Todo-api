const jwt = require("jsonwebtoken");
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
  } else {
    res.render("index");
  }
};

module.exports = {
  getCookie,
};
