// requiring services
const userLoginServices = require("../services/userLoginServices");
const taskServices = require("../services/taskServices");

// requiring taskmodel
const TaskModel = require("../model/task.model");

//===== GET CONTROLLERS BELOW=====//
const getRequestToLogin = (req, res) => {
  res.render("login");
};

const getRequestToSignUp = async (req, res) => {
  res.render("signup");
};

const getRequestTodo = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;

    const tasks = await TaskModel.find({ owner: res.locals.user._id })
      .limit(limit)
      .sort("1")
      .skip(page * limit);

    res.render("todo", {
      user: res.locals.user,
      tasks,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getRequestTodoCreate = async (req, res) => {
  res.render("create");
};

//===== POST CONTROLLERS BELOW =====//
const postRequestToLogin = async (req, res) => {
  const response = await userLoginServices.Login({
    email: req.body.email,
    password: req.body.password,
  });

  if (response.code === 200) {
    // set cookie
    res.cookie("jwt", response.data.token);
    res.redirect("/views/todo");
  } else {
    res.redirect("/views/login");
  }
};

const postRequestTodoCreate = async (req, res) => {
  try {
    const response = await taskServices.createTask({
      title: req.body.title,
      description: req.body.description,
      status: "pending",
      owner: res.locals.user._id,
    });

    if (response.code === 201) {
      res.redirect("/views/todo");
    } else {
      res.redirect("/views/login");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const postRequestSignup = async (req, res) => {
  const response = await userLoginServices.CreateUser({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });

  if (response.code === 201) {
    // set cookie
    res.cookie("jwt", response.token);
    res.redirect("/views/login");
  } else {
    res.render("signup");
  }
};

const getRequestLogout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

const updateRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const finish = req.body.update;
    const remove = req.body.delete;
    if (id && finish) {
      const response = await TaskModel.findByIdAndUpdate(id, {
        status: "completed",
      });

      if (response) {
        res.redirect("/views/todo");
      } else {
        const message = "Unable to update task";
        res.render("todo", { error: message });
      }
    } else if (id && remove) {
      const response = await TaskModel.findByIdAndDelete(id);

      if (response) {
        res.redirect("/views/todo");
      } else {
        const message = "Unable to update task";
        res.render("todo", { error: message });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const postRequestQueryTodoList = async (req, res) => {
  try {
    const filter = req.body.status;

    if (filter) {
      const tasks = await TaskModel.find({
        owner: res.locals.user._id,
        status: filter,
      });

      if (tasks) {
        res.render("todo", {
          user: res.locals.user,
          tasks,
        });
      }
    } else {
      const tasks = await TaskModel.find({
        owner: res.locals.user._id,
      });

      res.render("todo", {
        user: res.locals.user,
        tasks,
        error: "Error, no filter input",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.redirect("/views/todo");
  }
};

// exporting controller functions //
module.exports = {
  getRequestToLogin,
  getRequestToSignUp,
  getRequestTodo,
  getRequestTodoCreate,
  getRequestLogout,
  postRequestQueryTodoList,
  postRequestToLogin,
  postRequestTodoCreate,
  postRequestSignup,
  updateRequest,
};
