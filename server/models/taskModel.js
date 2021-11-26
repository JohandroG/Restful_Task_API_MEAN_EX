var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }

});

const Task = mongoose.model("Task", TaskSchema);

const TaskModel = {

    newtask: function(task){
        return Task.create(task)
    },
    allTasks : function(){
        return Task.find();
    },
    taskByTitle : function( title ){
        return Task.findOne({ title });
    },

}

module.exports = {TaskModel};

