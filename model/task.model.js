const mongoose = require("mongoose");
const shortId = require("short-uuid");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  status: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: { type: Date, defaultValue: Date.now().toString() },

  // one-to-many association with task model
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;
