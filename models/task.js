const mongoose = require("mongoose");

const taskSchemaa = new mongoose.Schema({
  taskTitle: { type: String },
  taskdescription: { type: String },
  taskduedate: { type: String },
  TaskStatus: { type: String, enum: ["To-do", "On-going", "Completed"] },
});

const taskmodell = mongoose.model("Task_info", taskSchemaa);
module.exports = taskmodell;
