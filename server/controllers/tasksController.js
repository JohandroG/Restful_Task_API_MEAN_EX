var mongoose = require("mongoose");
const {TaskModel} = require('./../models/taskModel');

module.exports = {

    index: function(req, res){
        Task.find({}, function(err, task){
            if(err){
                res.json({message: "Error!", error: err});
            }
            else{
                res.json({message: "Success!", task: task});
            }
        })
    },

    details: function(req, res){
        let id = req.params.id;
        Task.find({_id: id},function(err, task){
            if(err){
                res.json({message: "Error!", error: err});
            }
            else{
                res.json({message: "Success!", task: task});
            }
        })
    },

    addTask: function(req, res){
        title = req.body.title;
        description = req.body.description;
        completed = req.body.completed;
        created_at = new Date();
        updated_at = new Date()
        
        if(title){
        newtask = {
            title,
            description,
            completed,
            created_at,
            updated_at
        }
            
                TaskModel
                .newtask(newtask)
                .then( task => {
                res.status( 200 ).json( task );
                })
        }else{
                    res.status( 404 ).end();
        }

    },

    editTask: function(req, res){
        let id = req.params.id;
        Task.findById(id, function(err, task){
            if(err){
                res.json({message: "Error!", error: err});
            }
            else{
                if(req.body.title){
                    task.title = req.body.title;
                }
                if(req.body.description){
                    task.description = req.body.description;
                }
                if(req.params.completed){
                    task.completed = req.body.completed;
            }
            task.save(function(err){
                if(err){
                    res.json({message: "Error!", error: err});
                }
                else{
                    res.json({message: "Success!", task: task})
                }
            })
            }
        })
    },

    deleteTask: function(req, res){
        let id = req.params.id;
        Task.remove({_id: id},function(err){
            if(err){
                res.json({message: "Error!", error: err});
            }
            else{
                res.json({message: "Success!", removed: true});
            }
        })
    }
}