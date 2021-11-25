var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
    title: {type: String, default: ""},
    description: {type: String, default: ""},
    completed: {type: Boolean, default: false},
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

const Task = mongoose.model("Task", TaskSchema);

const TaskModel = {

    //todo al querys

}

