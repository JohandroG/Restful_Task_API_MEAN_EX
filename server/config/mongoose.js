var fs = require("fs");
var path = require("path");
var mongoose = require("mongoose");
var models_path = path.join(__dirname, "./../models");

mongoose.connect("mongodb://127.0.0.1/restful_task_API");

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf(".js") >= 0)
		require(models_path+"/"+file);
});