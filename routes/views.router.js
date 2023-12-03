const express = require("express");

//requiring middlewares
const middleware = require("../middlewares/userCookieValidation");
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

router.get("/todo", middleware.getCookie, controller.getRequestTodo);

router.get(
  "/todo/create",
  middleware.getCookie,
  controller.getRequestTodoCreate
);

router.get("/logout", middleware.getCookie, controller.getRequestLogout);

// =============================== POST ROUTES ===================================//

router.post(
  "/todo/create",
  middleware.getCookie,
  controller.postRequestTodoCreate
);

router.post("/todo", middleware.getCookie, controller.postRequestQueryTodoList);

router.post("/signup", controller.postRequestSignup);

router.post("/login", controller.postRequestToLogin);

// =============================== UPDATE ROUTES ===================================//

router.post("/todo/:id", middleware.getCookie, controller.updateRequest);

module.exports = router;
