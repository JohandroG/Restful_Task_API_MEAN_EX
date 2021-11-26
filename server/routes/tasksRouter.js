var tasks = require("../controllers/tasksController");

module.exports = function(app){

    app.get("/tasks", tasks.requestall)

    app.get("/tasks/:id", tasks.details)

    app.post("/tasks", tasks.addTask)

    app.put("/tasks/:id", tasks.editTask)

    app.delete("/tasks/:id", tasks.deleteTask)
}