
/*
 * GET home page.
 */
var express = require('express');
var app = express();
var Post = require('../modules/post');
var bodyParser = require('body-parser');

app.use(bodyParser());

exports.index = function(req, res) {
  Post.getAll(function(err, tasks) {
    res.render('index',{
      title:'Task List',
      posts: tasks
    });
  });
};


exports.save = function(req, res) {
  var taskname = req.body.taskname;
  var description = req.body.description;
  console.log("saving: " + taskname + " : " + description);

  var newTask = new Post(taskname, description);
  Post.save(newTask, function(err) {
    if (err) {
      console.log("error");
      res.json(500);
    }
  });
  res.json(200);
};

exports.remove = function(req, res) {
  var taskname = req.body.taskname;
  console.log("removed: " + taskname);
  if (taskname == "null") {
    taskname = null;
  }
  Post.remove(taskname, function(err) {
    if (err) {
      console.log("error");
      res.json(500);
    }
  });
  res.json(200);


}

exports.achieve = function(req, res) {
  var taskname = req.body.taskname;
  console.log(taskname + " achieved");

  res.json(200);
}