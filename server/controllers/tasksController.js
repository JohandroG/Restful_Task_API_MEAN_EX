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
                .catch(err => {
                    console.log(err);
                    res.statusMessage = "There is another task with that title";
                    res.status(400).end()
                })
        }else{
            response.statusMessage = "You are missing a field";
            res.status( 404 ).end();
        }
    },

    editTask: function(req, res){
        let title = req.params.title;

        newtitle = req.body.title;
        newdescription = req.body.description;
        newcompleted = req.body.completed;
        updated_at = new Date();

        TaskModel
        .taskByTitle(title)
        .then(task =>{
            if(task === null){
                res.statusMessage = "You can not edit a task that doesn't exists";
                res.status( 404 ).end();
            }
            else{
                if(newtitle){
                    task.title = newtitle;
                }
                if(newdescription){
                    task.description = newdescription;
                }
                if(newcompleted){
                    task.completed = newcompleted;
                }
                task.updated_at = updated_at

                TaskModel
                .updatetask(title , task)
                .then(result=>{
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.statusMessage = "There is another task with that title";
                    res.status(400).end()
                })
            }
        });
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