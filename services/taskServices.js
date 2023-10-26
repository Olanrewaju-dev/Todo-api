const TaskModel = require("../model/task.model");

// Sign up controller
const createTask = async ({ title, description, status, owner }) => {
  const newTask = { title, description, status, owner };

  if (!newTask) {
    return {
      message: "Error",
      code: 422,
      data: [],
    };
  }

  const newTaskObject = await TaskModel.create({
    // creating task in db
    title: newTask.title,
    description: newTask.description,
    status: newTask.status,
    owner,
  });

  return {
    message: "Task created successfully", // success message
    code: 201,
    task: newTaskObject,
  };
};

// fetching all tasks
const getTask = async () => {
  const tasks = await TaskModel.find({});

  return {
    message: "Task fetched successfully",
    code: 200,
    success: true,
    data: {
      tasks,
    },
  };
};

module.exports = { createTask, getTask };
