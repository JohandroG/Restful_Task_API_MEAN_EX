var mongoose = require("mongoose");
const {TaskModel} = require('./../models/taskModel');

module.exports = {

    requestall: function(req, res){
        TaskModel
        .allTasks()
        .then(data =>{
            res.status(200).json(data);
        })
    },

    details: function(req, res){
        let title = req.params.title;
        TaskModel
        .taskByTitle(title)
        .then(task =>{
            if(task == null){
                
                res.status(404).json({err: "This user doesn't exists"})
            }
            else{
                res.status(200).json(task)
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
            response.statusMessage = "You are missing a field";
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
        let title = req.params.title;

        TaskModel
        .taskByTitle(title)
        .then(task =>{

            if(task === null){
                res.statusMessage = "You can not delete a task that doesn't exists";
                res.status( 404 ).end();
            }
            else{
                TaskModel
                        .deletetask( title )
                        .then( result => {
                            res.status( 204 ).end();
                        });
            }

        })
    }
}