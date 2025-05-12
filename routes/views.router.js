const express = require("express");

//requiring middlewares
const {
  getCookie,
  signUpUserInputValidation,
} = require("../middlewares/validation");
const cookieParser = require("cookie-parser");

// requiring controller
const controller = require("../controllers/viewsController");

// requiring environment variables
require("dotenv").config();

const router = express.Router();

// Cookie parser
router.use(cookieParser());

// =============================== GET ROUTES ===================================//

router.get("/login", controller.getRequestToLogin);

router.get("/signup", controller.getRequestToSignUp);

router.get("/todo", getCookie, controller.getRequestTodo);

router.get("/todo/create", getCookie, controller.getRequestTodoCreate);

router.get("/logout", getCookie, controller.getRequestLogout);

// =============================== POST ROUTES ===================================//

router.post("/todo/create", getCookie, controller.postRequestTodoCreate);

router.post("/todo", getCookie, controller.postRequestQueryTodoList);

router.post("/signup", signUpUserInputValidation, controller.postRequestSignup);

router.post("/login", controller.postRequestToLogin);

// =============================== UPDATE ROUTES ===================================//

router.post("/todo/:id", getCookie, controller.updateRequest);

module.exports = router;
