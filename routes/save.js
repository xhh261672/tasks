var Post = require('../modules/post');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser());

exports.save = function(req, res){
  console.log("saving...\n");
  // console.log("1  " + req.taskname + " : " + req.description + "\n");
  // console.log("2  " + req.query.taskname + " : " + req.query.description + "\n");
  console.log(req.query.id + " " + req.body.taskname + " : " + req.body.description);

  var taskname = req.body.taskname;
  var description = req.body.description;

  console.log(taskname + " : " + description + "\n");
  var newTask = new Post(taskname, description);
  Post.save(newTask, function() {
    console.log("#error in saving...!");
  });
  console.log("finished...");
};