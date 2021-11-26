var tasks = require("../controllers/tasksController");

module.exports = function(app){

    app.get("/tasks", tasks.requestall)

    app.get("/tasks/:title", tasks.details)

    app.post("/tasks", tasks.addTask)

    app.put("/tasks/:title", tasks.editTask)

    app.delete("/tasks/:title", tasks.deleteTask)
}